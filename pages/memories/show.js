import React, { Component } from 'react';
import { Card, Header, Container, Button } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import MemoryCard from '../../components/MemoryCard';
import { Link, Router } from '../../routes';
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
      if(!(singleMemory.date === '0')){
        memoryList.push(singleMemory);
      }
    }

    return{ 
      memoryList: memoryList
    };
  }

  formatDate(date){
    return date.substring(6) + '-' +  date.substring(4,6) + '-' + date.substring(0,4);
  }

  mapMemoryToMemoryCard(memory) {
    const formattedDate = this.formatDate(memory.date);
    const mappedMemory =
      {
        index: memory.index,
        date: formattedDate,
        description: memory.description,
        typeOfMemory: memory.typeOfMemory
      }
      return <MemoryCard key={memory.index} memory={mappedMemory}/>;
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

  reloadPage() {
    Router.pushRoute('/memories/show');
  }

  render() {
    const memoryList = this.props.memoryList;
    const renderMemories = () => {
      if(memoryList[0]===undefined){
        return <Container textAlign='center'>
                <Header>Your Memories Bank is empty</Header>
                <Link route='/memories/new'>
                  <a className="item">Add new memory</a>
                </Link>
              </Container>
      }
      return this.renderListOfMemories(memoryList);
    }
    return (
      <Layout title="Your Memories" link="/memories/new" linkname="Add New Memory">
        {renderMemories()}
        <Button primary onClick={this.reloadPage}>Refresh page</Button>
      </Layout>
    )
  }
}

export default MemoriesList;