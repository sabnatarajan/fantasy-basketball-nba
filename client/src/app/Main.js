/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { Component } from 'react';
import Layout from './Layout';

class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Layout />
    );
  }
}

export default Main;
