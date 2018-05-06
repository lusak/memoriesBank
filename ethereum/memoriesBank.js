import web3 from './web3';
import MemoriesBank from './build/MemoriesBank.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(MemoriesBank.interface), address
  );
};