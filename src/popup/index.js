import React from 'react';
import { app } from 'reactdux';
import App from './components';
import Store from './Store';

chrome.browserAction.setBadgeText({ text: '' });

const Root = () => (
  <Store.Provider>
    <App />
  </Store.Provider>
);

app(Root);