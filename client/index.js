var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
// Get contractAddress from console after migration command
var contractAddress = '0xEEf3248b4501d1b161C8d5e6337CbB3198c2206D';

$(document).ready(function () {
  window.ethereum.enable().then(function (accounts) {
    instance = new web3.eth.Contract(abi, contractAddress, {
      from: accounts[0],
    });
    user = accounts[0];

    console.log(instance);
    listenerBirth(instance);
  });
});

function createKat() {
  //how to call smart contract function with the front-end
  //unless smart contract has "view" keyword, then its a setter function which modifies the state, and we use send()
  //this a call-back function where we're waiting on the ETH node to respond

  var dnaStr = getDna();
  console.log('dnaStr to create function check: ' + dnaStr);

  instance.methods
    .createKatGen0(dnaStr)
    .send({ from: user }, function (error, txHash) {
      if (error) {
        console.log('Create Kat Error: ' + error);
      } else {
        console.log('Create Kat Tx: ' + txHash);
      }
    });
}

function listenerBirth(instance) {
  instance.events
    .Birth({})
    .on('Connected', function (subscribeId) {
      console.log(subscribeId);
    })
    .on('data', function (event) {
      var _genes = event.returnValues.genes;
      var _tokenId = event.returnValues.tokenId;
      var _owner = event.returnValues.owner;
      openModalBirth(_genes, _tokenId, _owner);
    })
    .on('error', function (error, receipt) {
      console.log('Birth event error: ' + error + ' recipt: ' + receipt);
    });
}

// Get Modal Event
var modal = document.getElementById('modalBirth');
// Get Close Button
var closeBtn = document.getElementsByClassName('closeBtn')[0];
// Close ClickListener
closeBtn.addEventListener('click', closeModalBirth);
// Outside window ClickListener
window.addEventListener('click', clickOutside);

function openModalBirth(genes, tokenId, owner) {
  modal.style.display = 'block';
  $('#birthGenes').html(genes);
  $('#birthTokenId').html(tokenId);
  $('#birthOwner').html(owner);
}

function closeModalBirth() {
  modal.style.display = 'none';
}

//close modal with outside click
function clickOutside(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
