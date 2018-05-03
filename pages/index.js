import React, { Component } from 'react';
import { Grid, GridColumn, Card, CardContent, CardHeader, Button, GridRow, Header, Input } from 'semantic-ui-react';
import Layout from '../components/Layout';


class MemoriesBankIndex extends Component {
  render() {
    return (
      <Layout title="Welcome to Memories Bank">
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} textAlign="center">
              <Card fluid={true}>
                <Card.Header>
                  <Header size="large" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    New user?
                  </Header>
                </Card.Header>
                <Card.Content style={{ marginTop: '10px' }}>
                  <Button color="blue">
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
                <Card.Content>
                  <Input size="large" placeholder='Your Account address'/>
                </Card.Content>
                <Card.Content>
                  <Button color="blue">
                    Go
                  </Button>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    )
  }
}

export default MemoriesBankIndex;