import React, { Component } from 'react';
import { Context } from 'src/popup/Store';
import Base from './Base';
import Welcome from './Welcome';

const style = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
};

export default class extends Component {

  static contextType = Context;

  componentDidMount() {
    this.context.syncStorage();
  }

  render() {
    return (
      <div style={style}>
        {this.context.token ? <Base /> : <Welcome />}
      </div>
    );
  }
}