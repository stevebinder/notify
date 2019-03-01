import React from 'react';
import { render } from 'react-dom';
import App from './components';
import { Provider } from './Store';

chrome.browserAction.setBadgeText({ text: '' });

const Root = () => (
  <Provider>
    <App />
  </Provider>
);

render(<Root />, document.getElementById('root'));