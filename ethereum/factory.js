import web3 from './web3';
import MemoriesBankFactory from './build/MemoriesBankFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(MemoriesBankFactory.interface),
  // Rinkeby
  '0xce4e98effeba3f7c601d342502671c52e2348898'
);

export default instance;