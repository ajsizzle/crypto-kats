// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "./IERC721.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Katcontract is IERC721, Ownable {

    /*
     * @dev List of Token name and symbol
     */
    string public constant tokenName = "CryptoKats";
    string public constant tokenSymbol = "CK";

    /*
     * @dev Event where new CryptoKat is created
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

    /*************************************************************/

    /* 
     * @dev Gen0 creation of a CryptoKat NFT.
     */
    function createKatGen0(uint256 _genes) public onlyOwner returns (uint256) {
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
        }

        // Emit transfer event
        emit Transfer(_from, _to, _tokenId);
    }

    /*
     * @dev Verifies `msg.sender` owns the NFT.
     */
    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return idToOwner[_tokenId] == _claimant;
    }

}
