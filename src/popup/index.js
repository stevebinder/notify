import { app } from 'reactdux';
import Component from './components';

try {
  chrome.browserAction.setBadgeText({ text: '' });
} catch (e) {}

const state = {
  notifications: [],
  token: '',
};

export default app(Component, state);