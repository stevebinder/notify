import React, { Component } from 'react';
import { Context } from 'src/popup/Store';
import Base from './Base';
import Welcome from './Welcome';

const style = {
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