import React, { Component } from 'react';
import { Context } from '../Store';
import Base from './Base';
import Welcome from './Welcome';

const style = {
  boxSizing: 'border-box',
  borderLeft: '2px solid #fff',
  borderRight: '2px solid #fff',
  height: '100%',
  width: '100%',
};

export default class extends Component {

  static contextType = Context;

  componentDidMount() {
    this.context.syncStorage();
  }

  render() {
    return (
      <div style={style}>
        {this.context.syncing ? null
          : this.context.token ? <Base />
          : <Welcome />}
      </div>
    );
  }
}