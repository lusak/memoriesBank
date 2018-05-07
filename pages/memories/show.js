import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import MemoryCard from '../../components/MemoryCard';
import MemoriesBank from '../../ethereum/memoriesBank';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';


class MemoriesList extends Component {
  static async getInitialProps(props) {
    const accounts = await web3.eth.getAccounts();
    const memoriesBankAddress = await factory.methods.getSenderMemoriesBank().call({
      from: accounts[0]
    });
    
    const memoriesBank = MemoriesBank(memoriesBankAddress);

    const memoriesCount = await memoriesBank.methods.getMemoriesCount().call({
      from: accounts[0]
    });

    const memoryList = [];

    let singleMemory;

    for(let i=0; i < memoriesCount; i++){
    singleMemory = await memoriesBank.methods.memories(i).call({
      from: accounts[0]
    });
    memoryList.push(singleMemory);
    }

    return{ 
      memoriesCount: memoriesCount,
      memoryList: memoryList
    };
  }

  formatDate(date){
    return date.substring(6) + '-' +  date.substring(4,6) + '-' + date.substring(0,4);
  }

  mapMemoryToMemoryCard(memory) {
    const formattedDate = this.formatDate(memory.date);
    console.log(formattedDate);

    const mappedMemory =
      {
        index: memory.index,
        date: formattedDate,
        description: memory.description,
        typeOfMemory: memory.typeOfMemory
      }
      return <MemoryCard memory={mappedMemory} />;
    }

  renderListOfMemories(memoryList) {
    memoryList.sort(this.compareMemoriesByDate);
    const memoryCardsList = [];
    for(let i = 0; i < memoryList.length; i++) {
      memoryCardsList.push(this.mapMemoryToMemoryCard(memoryList[i]));
    }
    return memoryCardsList;
  }

  compareMemoriesByDate(memoryOne,memoryTwo){
    if (memoryOne.date < memoryTwo.date)
      return -1;
    if (memoryOne.date > memoryTwo.date)
      return 1;
    return 0;
  }

  render() {
    const memoryList = this.props.memoryList;
    console.log(memoryList);
    return (
      <Layout title="Your Memories" link="/memories/new" linkname="Add New Memory">
        {this.renderListOfMemories(memoryList)}
      </Layout>
    )
  }
}

export default MemoriesList;