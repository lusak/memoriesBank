import React, { Component } from 'react';
import { Card, Header, Form } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class NewMemory extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state
    return (
      <Layout title="Add New Memory" link="/memories/show" linkname="Back">

        <Form>
          <Header>Add a description:</Header>
          <Form.TextArea placeholder="Your memory description" />
          <Header>Type of Memory:</Header>
          <Form.Group inline>
            <Form.Radio label='Positive' value='sm' checked={value === 'sm'} onChange={this.handleChange} />
            <Form.Radio label='Neutral' value='md' checked={value === 'md'} onChange={this.handleChange} />
            <Form.Radio label='Negative' value='lg' checked={value === 'lg'} onChange={this.handleChange} />
        </Form.Group>


        </Form>
      </Layout>
    )
  }
}

export default NewMemory;