import { app } from 'reactdux';
import * as actions from './actions';
import Component from './components';

const state = {
  notifications: [],
  token: '6db01d3fe08229a5e0c6b1a534a09ac7b4e233d2',
};

export default app(Component, state, actions);