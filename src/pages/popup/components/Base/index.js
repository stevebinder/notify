import React, { Component } from 'react';
import { Context } from '../../Store';
import Feed from './Feed';
import Filters from './Filters';

const styles = {
  layout: {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
  },
};

export default class extends Component {

  static contextType = Context;

  componentDidMount() {
    this.context.markAllRead();
  }

  render() {
    return (
      <div style={styles.layout}>
        <Filters />
        <Feed />
      </div>
    );
  }
}