// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Katcontract is IERC721, Ownable {

    /*
     * @dev List of Token constants.
     */
    string public constant tokenName = "CryptoKats";
    string public constant tokenSymbol = "CK";
    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

    /*
     * @dev Counter to limit to minting of Gen0 NFTs.
     */
    uint256 public gen0Counter;

    /*
     * @dev Event where new CryptoKat is created.
     */
    event Birth(
        address owner, 
        uint256 katId, 
        uint256 motherId, 
        uint256 fatherId, 
        uint256 genes
        );

    /*
     * @dev Struct of CryptoKat NFT
     */
    struct Kat {
        uint256 genes;
        uint64 birthTime;
        uint32 motherId;
        uint32 fatherId;
        uint16 generation;
    }

    /*
     * @dev Array of all CryptoKat NFTs.
     */
    Kat[] internal kats;

    /*
     * @dev Mapping from owner address to count of their tokens.
     */
    mapping(address => uint256) private ownedTokenCount;

    /*
     * @dev Mapping from tokenId to the address that owns it.
     */
    mapping(uint256 => address) internal idToOwner;

    /*
     * @dev Mapping of approved addresses to transfer tokens.
     */
    mapping (uint256 => address) public idToApproved;

    /*
     * @dev Mapping from owner address to mapping of operator addresses.
     */
    mapping (address => mapping (address => bool)) private _operatorApprovals;

    /*************************************************************/

    /* 
     * @dev Gen0 creation of a CryptoKat NFT.
     */
    function createKatGen0(uint256 _genes) public onlyOwner returns (uint256) {
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

        return _createKat(0, 0, 0, _genes, msg.sender);
    }

    /*
     * @dev Creation of new Kat.
     */
    function _createKat(
        uint256 _motherId,
        uint256 _fatherId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        Kat memory _kat = Kat({
            genes: _genes,
            birthTime: uint64(block.timestamp),
            motherId: uint32(_motherId),
            fatherId: uint32(_fatherId),
            generation: uint16(_generation)
        });

        kats.push(_kat);
        uint256 newKatId = kats.length - 1;

        emit Birth(_owner, newKatId, _motherId, _fatherId, _genes);

        _transfer(address(0), _owner, newKatId);

        return newKatId;
    }

    /*
     * @dev Returns properties of CryptoKat NFT by tokenId.
     */
    function getKat(uint256 _id) external view returns(
        uint256 genes,
        uint256 birthTime,
        uint256 motherId,
        uint256 fatherId,
        uint256 generation
        ) {

            Kat storage kat = kats[_id];

            genes = uint256(kat.genes);
            birthTime = uint256(kat.birthTime);
            motherId = uint256(kat.motherId);
            fatherId = uint256(kat.fatherId);
            generation = uint256(kat.generation);
        }

    /*
     * @dev Returns the total number of tokens in circulation.
     */    
    function balanceOf(address owner) external view returns (uint256 balance){
        return ownedTokenCount[owner];
    }

    /**
     * @dev Returns the count of all existing NFTs.
     * @return total supply of NFTs.
     */
    function totalSupply() external view returns (uint256 total){
        return kats.length;
    }

    /*
     * @dev Returns the name of the token.
     */
    function name() external pure returns (string memory _tokenName){
       _tokenName = tokenName;
    }

    /*
     * @dev Returns the symbol of the token.
     */
    function symbol() external pure returns (string memory _tokenSymbol){
        _tokenSymbol = tokenSymbol;
    }

    /*
     * @dev Returns the owner of the `tokenId` token.
     */
    function ownerOf(uint256 _tokenId) external view returns (address owner){
        return idToOwner[_tokenId];
    }

    /* 
     * @dev Transfers `tokenId` token from `msg.sender` to `to`.
     * Emits a transfer event
     */
    function transfer(address _to, uint256 _tokenId) external {
        require(_to != address(0));
        require(_to != address(this));
        require(_owns(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    /*
     * @dev Internal handling of ownedTokenCount from `msg.sender` to `to`.
     */
    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        // Increase token count of recipient 
        ownedTokenCount[_to]++;
        // set tokenId to recipient
        idToOwner[_tokenId] = _to;

        if (_from != address(0)) {
            // decrease token count from sender
            ownedTokenCount[_from]--;
            delete idToApproved[_tokenId];
        }

        // Emit transfer event
        emit Transfer(_from, _to, _tokenId);
    }

    /**
     * @notice Change or reaffirm the approved address for an NFT
     * @dev The zero address indicates there is no approved address.
     * Throws unless `msg.sender` is the current NFT owner, or an authorized
     * operator of the current owner.
     * @param _approved The new approved NFT controller
     * @param _tokenId The NFT to approve
     */
    function approve(address _approved, uint256 _tokenId) external {
        address owner = idToOwner[_tokenId];
        require(_approved != owner, "Owner is already approved");

        idToApproved[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId);
    }

    /**
     * @notice Enable or disable approval for a third party ("operator") to manage
     * all of `msg.sender`'s assets
     * @dev Emits the ApprovalForAll event. The contract MUST allow
     * multiple operators per owner.
     * @param _operator Address to add to the set of authorized operators
     * @param _approved True if the operator is approved, false to revoke approval
     */
    function setApprovalForAll(address _operator, bool _approved) external {
        _operatorApprovals[msg.sender][_operator] = _approved;

        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    /**
     * @notice Get the approved address for a single NFT
     * @dev Throws if `_tokenId` is not a valid NFT.
     * @param _tokenId The NFT to find the approved address for
     * @return The approved address for this NFT, or the zero address if there is none
     */
    function getApproved(uint256 _tokenId) external view returns (address) {
        require(_tokenId < kats.length); // Token must exist

        return idToApproved[_tokenId];
    }

    /**
     * @notice Query if an address is an authorized operator for another address
     * @param _owner The address that owns the NFTs
     * @param _operator The address that acts on behalf of the owner
     * @return True if `_operator` is an approved operator for `_owner`, false otherwise
     */
    function isApprovedForAll(address _owner, address _operator) public view returns (bool) {
        return _operatorApprovals[_owner][_operator];
    }

    /**
     * @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
     *  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
     *  THEY MAY BE PERMANENTLY LOST
     * @dev Throws unless `msg.sender` is the current owner, an authorized
     *  operator, or the approved address for this NFT. Throws if `_from` is
     *  not the current owner. Throws if `_to` is the zero address. Throws if
     *  `_tokenId` is not a valid NFT.
     * @param _from The current owner of the NFT
     * @param _to The new owner
     * @param _tokenId The NFT to transfer
     */
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_to != address(0));
        require(msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));
        require(_owns(_from, _tokenId));
        require(_tokenId < kats.length);

        _transfer(_from, _to, _tokenId);
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data) );
    }

    /**
     * @notice Transfers the ownership of an NFT from one address to another address
     * @dev Throws unless `msg.sender` is the current owner, an authorized
     *  operator, or the approved address for this NFT. Throws if `_from` is
     *  not the current owner. Throws if `_to` is the zero address. Throws if
     *  `_tokenId` is not a valid NFT. When transfer is complete, this function
     *  checks if `_to` is a smart contract (code size > 0). If so, it calls
     *  `onERC721Received` on `_to` and throws if the return value is not
     *  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
     * @param _from The current owner of the NFT
     * @param _to The new owner
     * @param _tokenId The NFT to transfer
     * @param _data Additional data with no specified format, sent in call to `_to`
     */
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes calldata _data) external {
        require(_to != address(0));
        require(msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));
        require(_owns(_from, _tokenId));
        require(_tokenId < kats.length);

        _safeTransfer(_from, _to, _tokenId, _data);
    }

    /**
     * @notice Transfers the ownership of an NFT from one address to another address
     * @dev This works identically to the other function with an extra data parameter,
     *  except this function just sets data to "".
     * @param _from The current owner of the NFT
     * @param _to The new owner
     * @param _tokenId The NFT to transfer
     */
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_to != address(0));
        require(msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));
        require(_owns(_from, _tokenId));
        require(_tokenId < kats.length);

        _safeTransfer(_from, _to, _tokenId, "");
    }

    /*
     * @dev Verifies `msg.sender` owns the NFT.
     */
    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return idToOwner[_tokenId] == _claimant;
    }

    /*
     * @dev Set or reaffirm the approved address for an NFT.
     */
    function _approve(uint256 _tokenId, address _approved) internal {
        idToApproved[_tokenId] = _approved;
    }

    /*
     * @dev Verifies approved address is approved for NFT.
     */
    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return idToApproved[_tokenId] == _claimant;
    }

    /*
     * @dev Checks _to address is an approved ERC721 token and can handle payload.
     */
    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal view returns (bool) {
        if (!_isContract(_to)) {
            return true;
        }

        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        return returnData == MAGIC_ERC721_RECEIVED;
    }

    /*
     * @dev Returns size of data in _to address.
     */
    function _isContract(address _to) view internal returns (bool) {
        uint32 size;
        assembly{
            // get the size of the code that is in the address.
            size := extcodesize(_to)
        }
        return size > 0;

    }

}
