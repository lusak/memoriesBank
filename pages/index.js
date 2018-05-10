import React, { Component } from 'react';
import { Grid, GridColumn, Card, CardContent, CardHeader, Button, GridRow, Header, Input, Message } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class MemoriesBankIndex extends Component {
  state = {
    errorMessage: '',
    errorMessageVisible: 'hidden',
    createMessageVisible: 'hidden',
    accountAddress: '',
    accountAddressVisible: 'hidden',
    visible: false,
    loading: false
  }

  createAccount = async (event) => {
    event.preventDefault();

    this.setState({ errorMessage: '', errorMessageVisible: 'hidden', accountAddressVisible: 'hidden',  createMessageVisible: 'hidden' });

    try {
      const accounts = await web3.eth.getAccounts();      
      const accountAddress = await factory.methods.getSenderMemoriesBank().call({
        from: accounts[0]
      });
      
      if (accountAddress!=='0x0000000000000000000000000000000000000000') {
        this.setState({errorMessage: 'You already have an account. We displayed its address for you below. Click \"Go\" to see your account', 
        accountAddress: accountAddress, accountAddressVisible: 'visible', 
        errorMessageVisible: 'visible'});
        return
      }

      this.setState({loading: true});

      const transaction = await factory.methods.createMemoriesBank().send({
        from: accounts[0]
      });

      const memoriesBankAddress = transaction.events.MemoriesBankCreated.returnValues.newMemoriesBankAddress;
      
      this.setState({ accountAddress: memoriesBankAddress, accountAddressVisible: 'visible', createMessageVisible: 'visible'});

    } catch (err) {
      this.setState({errorMessage: err.message, errorMessageVisible: 'visible'});
    }

    this.setState({ loading: false });
  }

  showUserBank = () => {
    Router.pushRoute('/memories/show');
  }

  render() {
    
    return (
      <Layout title="Welcome to Memories Bank">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} textAlign="center">
              <Card fluid={true}>
                <Card.Header>
                  <Header size="large" style={{ marginTop: '10px', marginBottom: '10px'}}>
                    New user?
                  </Header>
                </Card.Header>
                <Card.Content style={{ marginTop: '10px' }}>
                  <Button loading={this.state.loading} primary onClick={this.createAccount}>
                    Create MemoriesBank
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={8} textAlign="center">
              <Card fluid={true}>
                <Card.Header>
                  <Header size="large" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    Already Have An Account?
                  </Header>
                </Card.Header>
                {/* <Card.Content>
                  <Input size="large" placeholder='Your Account address'/>
                </Card.Content> */}
                <Card.Content style={{ marginTop: '10px' }}>
                  <Button color="blue" onClick={this.showUserBank}>
                      Go
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Message error header="Ooops!" content={this.state.errorMessage} style={{visibility: this.state.errorMessageVisible}} />
        <Message header="Great! Your Memories Bank has been created. Save the address below"
                 content="You may use this address to access your memories bank in case you lose access to your ethereum account"
                 style={{visibility: this.state.createMessageVisible}}/>
        <Message header={this.state.accountAddress} size='huge' style={{visibility: this.state.accountAddressVisible}}/>
      </Layout>
    )
  }
}

export default MemoriesBankIndex;