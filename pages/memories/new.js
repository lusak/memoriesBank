import React, { Component } from 'react'
import { Header, Button, Checkbox, Form, Input, Radio, Select, TextArea, Message } from 'semantic-ui-react'
import Layout from '../../components/Layout';
import _ from 'lodash';
import factory from '../../ethereum/factory';
import MemoriesBank from '../../ethereum/memoriesBank';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';

class NewMemory extends Component {
  state = {
    dateErrorMessageVisible: 'hidden',
    descriptionErrorMessageVisible: 'hidden',
    transactionErrorMessageVisible: 'hidden',
    dateErrorMessage: '',
    descriptionErrorMessage: '',
    description: '',
    typeOfMemory: '',
    loading: false,
    date: '',
    action: 'Create'
  }

  static async getInitialProps(props) {
    if(props.query.index === undefined) {
      return {}
    }
    const accounts = await web3.eth.getAccounts();
    const memoriesBankAddress = await factory.methods.getSenderMemoriesBank().call({
      from: accounts[0]
    });
    
    const memoriesBank = MemoriesBank(memoriesBankAddress);

    const memoryToModify = await memoriesBank.methods.memories(props.query.index).call({
      from: accounts[0]
    });

    return {index: memoryToModify.index, description: memoryToModify.description, typeOfMemory: memoryToModify.typeOfMemory, date:  memoryToModify.date};
    }

  checkDateInput = () => {
    const dateString = this.state.date;
    const regEx = /^\d{2}-\d{2}-\d{4}$/;
    if(dateString==='') {
      this.setState({dateErrorMessage: 'No date Specified', dateErrorMessageVisible: 'visible'});
      return false;
    } 
    if(!dateString.match(regEx)) {
      this.setState({dateErrorMessage: 'Wrong Date Format', dateErrorMessageVisible: 'visible'});
      return false;
    }  
    const dateArray = dateString.split("-");
    const crazyDateFormat = dateArray[1].concat('-').concat(dateArray[0]).concat('-').concat(dateArray[2]);
    const crazyDate = new Date(crazyDateFormat);
    if(!crazyDate.getTime() && crazyDate.getTime() !== 0) {
      this.setState({ dateErrorMessage: 'Invalid Date', dateErrorMessageVisible: 'visible'});
      return false;
    } 
    const orderedDateFormat = this.orderDate(dateArray);
    this.setState({dateErrorMessageVisible: 'hidden'}); 
    return orderedDateFormat;
  }

  orderDate(dateArray) {
    return dateArray[2].concat(dateArray[1]).concat(dateArray[0]);
  }

  reverseOrderDate(date) {
    return date.substring(6).concat('-').concat(date.substring(4,6)).concat('-').concat(date.substring(0,4));
  }

  createNewMemory = async (orderedDate) => {
    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      const memoriesBankAddress = await factory.methods.getSenderMemoriesBank().call({
        from: accounts[0]
      });

      const memoriesBank = MemoriesBank(memoriesBankAddress);

      const tx = await memoriesBank.methods.addMemory(orderedDate, this.state.description, this.state.typeOfMemory).send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({transactionErrorMessageVisible: 'visible'});
    }
    this.setState({ loading: false });
    Router.pushRoute('/memories/show');
  } 

  onSubmit = () => {
    this.setState({transactionErrorMessageVisible: 'hidden'});
    const orderedDate = this.checkDateInput();
    if(orderedDate===false) return;
    if(this.state.description === ''){
      this.setState({descriptionErrorMessage: 'No Description Provided!', descriptionErrorMessageVisible: 'visible'});
      return
    }
    if(this.state.typeOfMemory===''){
      if(!confirm('Memory Type Not Selected. Defaulting to neutral. Proceed?')) return;
      else this.setState({ typeOfMemory: '1'});
    }
    this.createNewMemory(orderedDate);
  }

  onTypeChange = (e, { value }) => this.setState({ typeOfMemory: value });

  render() {
    if(this.state.action==='Create'){
      if(this.props.index!==undefined){
        const unorderedDate = this.reverseOrderDate(this.props.date);
        this.setState({action: 'Modify', description: this.props.description, typeOfMemory: this.props.typeOfMemory, date: unorderedDate})
      }
    }

    const descriptionChange = (input) => {
      if(input.length >= 251){
        this.setState({descriptionErrorMessage: 'Description Too Long. Maximum length is 250 characters.', descriptionErrorMessageVisible: 'visible'});
        return
      }
      this.setState({descriptionErrorMessage: '', description: input, descriptionErrorMessageVisible: 'hidden'});
    }

    const dateChange = (input) => {
      this.setState({date: input, dateErrorMessageVisible: 'hidden'});
    }

    return (
      <Layout title="Add New Memory" link="/memories/show" linkname="Back">
      <Form onSubmit={this.onSubmit}>
        <Header>Add memory description:</Header>
        <Form.TextArea placeholder="Your memory description" value={this.state.description} onChange={event => descriptionChange(event.target.value)}/>
        <Header>Type of Memory:</Header>
        <Form.Group inline>
          <Form.Radio label='Positive' value='0' checked={this.state.typeOfMemory === '0'} onChange={this.onTypeChange} />
          <Form.Radio label='Neutral' value='1' checked={this.state.typeOfMemory === '1'} onChange={this.onTypeChange} />
          <Form.Radio label='Negative' value='2' checked={this.state.typeOfMemory === '2'} onChange={this.onTypeChange} />
        </Form.Group>
        <Header>Provide date of memory in format DD-MM-YYYY</Header>
        <Form.Input placeholder="DD-MM-YYYY" value={this.state.date} onChange={event => dateChange(event.target.value)}></Form.Input>
        <Button loading={this.state.loading}>{this.state.action}</Button>
      </Form>
        <Message error header="Ooops! Wrong date!" content={this.state.dateErrorMessage} style={{visibility: this.state.dateErrorMessageVisible}} />
        <Message error header="Ooops! Description Too Long!" content={this.state.descriptionErrorMessage} style={{visibility: this.state.descriptionErrorMessageVisible}} />
        <Message error header="Ooops! Transaction failed!" content="Out of Gas Maybe?" style={{visibility: this.state.transactionErrorMessageVisible}} />
      </Layout>
    )
  }
}

export default NewMemory
