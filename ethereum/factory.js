import web3 from './web3';
import MemoriesBankFactory from './build/MemoriesBankFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(MemoriesBankFactory.interface),
  // Rinkeby
  // '0xaa556bd8b2bd62da8a3c5e3b411cf54436c3bdf1'
  // GanacheLocal
  '0x8cdaf0cd259887258bc13a92c0a6da92698644c0'
);

export default instance;