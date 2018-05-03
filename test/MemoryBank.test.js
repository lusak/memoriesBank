const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/MemoriesBankFactory.json');
const compiledMemoriesBank = require('../ethereum/build/MemoriesBank.json');

let accounts;
let factory;
//Use instance
let memoriesBankAddress;
let memoriesBank;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createMemoriesBank().send({ from: accounts[0], gas:'1000000' });

  memoriesBankAddress = await factory.methods.getSenderMemoriesBank().call();
  memoriesBank = await new web3.eth.Contract(JSON.parse(compiledMemoriesBank.interface), memoriesBankAddress);
});

describe('MemoriesBank', () => {
  it('deploys a factory and a memoriesBank', () => {
    assert.ok(factory.options.address);
    assert.ok(memoriesBank.options.address);
  });

  it('marks caller as memoriesBank owner', async () => {
    const owner = await memoriesBank.methods.owner().call();
    assert.equal(accounts[0], owner);
  });

  it('creates new memory', async () => {
    await memoriesBank.methods.addMemory(13021970, 'first Black Sabbath album', 0)
      .send({from: accounts[0], gas: '1000000'});
    const memory = await memoriesBank.methods.memories(0).call();
    const memoryCount = await memoriesBank.methods.getMemoriesCount().call();
    assert.equal(13021970, memory.date);
    assert.equal('first Black Sabbath album', memory.description);
    assert.equal(0, memory.typeOfMemory);
    assert.equal(1, memoryCount);
  });

  it('modifies memory', async () => {
    await memoriesBank.methods.addMemory(13021970, 'first Black Sabbath album', 0)
      .send({from: accounts[0], gas: '1000000'});
    await memoriesBank.methods.modifyMemory(0, 666, 'Best album ever', 1)
      .send({from: accounts[0], gas: '1000000'});
    const memory = await memoriesBank.methods.memories(0).call();
    assert.equal(666, memory.date);
    assert.equal('Best album ever', memory.description);
    assert.equal(1, memory.typeOfMemory);
  });

  it('deletes memory', async () => {
    await memoriesBank.methods.addMemory(13021970, 'first Black Sabbath album', 0)
      .send({from: accounts[0], gas: '1000000'});
    await memoriesBank.methods.deleteMemory(0)
      .send({from: accounts[0], gas: '1000000'});
    const memory = await memoriesBank.methods.memories(0).call();
    assert.equal(0, memory.date);
    assert.equal('', memory.description);
    assert.equal(0, memory.typeOfMemory);
  });
});

