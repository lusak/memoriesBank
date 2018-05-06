import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  //We are in browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  //We are on the server or user has not metamask running
  // const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/TzJtIPNOd81fG16HT5It ');
  const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
  web3 = new Web3(provider);
}

export default web3;