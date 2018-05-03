import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Head from 'next/head';
import Menu from './Menu';

export default props => {
  return (
    <Container>
      <Head>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
      </Head>
      <Menu link={props.link} linkname={props.linkname}/>
      <Header textAlign="center" size="huge" style={{ marginTop: '20px', marginBottom: '50px' }}>{props.title}</Header>
      {props.children}
    </Container>
  );
};