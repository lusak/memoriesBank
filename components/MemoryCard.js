import React from 'react';
import { Card, Button } from 'semantic-ui-react';

function resolveColor(typeOfMemory){
  if(typeOfMemory === '0') {
    return "green";
  }
  if(typeOfMemory === '1') {
    return "";
  }
  return "red"
  }

export default props => {
  const color = resolveColor(props.memory.typeOfMemory);
  return (
    <Card color={color} fluid>
      <Card.Content >
        <Card.Meta>{props.memory.date}</Card.Meta>
        <Card.Description>{props.memory.description}</Card.Description>
        <Button primary floated="right">Modify</Button>
      </Card.Content>
    </Card>
  );
};