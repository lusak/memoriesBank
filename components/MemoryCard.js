import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Router } from '../routes';
import MemoriesBank from '../ethereum/memoriesBank';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';


function resolveColor(typeOfMemory){
  if(typeOfMemory === '0') {
    return "green";
  }
  if(typeOfMemory === '1') {
    return "grey";
  }
  return "red"
}

const onDelete = async (event, {memory}) => {
  if(confirm("Are you sure you want to delete memory? It will take aproximately 30 seconds to complete")){
    try {
      const accounts = await web3.eth.getAccounts();
      const memoriesBankAddress = await factory.methods.getSenderMemoriesBank().call({
        from: accounts[0]
      });
  
      const memoriesBank = MemoriesBank(memoriesBankAddress);
  
      await memoriesBank.methods.deleteMemory(memory.index).send({
        from: accounts[0]
      });

      alert('Your memory has been deleted');
    } catch (err) {
      alert(err);
    }
  }
}

const modifyMemory = (event, {memory}) => {
  Router.pushRoute(`/memories/${memory.index}/modify`);
}

export default props => {
  const color = resolveColor(props.memory.typeOfMemory);
  return (
    <Card color={color} fluid>
      <Card.Content >
        <Card.Meta>{props.memory.date}</Card.Meta>
        <Card.Description>{props.memory.description}</Card.Description>
        <Button primary floated="right" index={props.key} memory={props.memory} onClick={modifyMemory}>Modify</Button>
        <Button primary floated="right" index={props.key} memory={props.memory} onClick={onDelete}>Delete</Button>
      </Card.Content>
    </Card>
  );
};