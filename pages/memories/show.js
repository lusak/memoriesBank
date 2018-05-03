import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';
import Layout from '../../components/Layout';


class MemoriesList extends Component {
  render() {
    return (
      <Layout title="Your Memories" link="/memories/new" linkname="Add New Memory">
        <Header>
          Hello World
        </Header>
      </Layout>
    )
  }
}

export default MemoriesList;