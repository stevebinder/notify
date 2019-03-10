import React from 'react';
import { render } from 'react-dom';
import App from './components';
import { Provider } from './Store';

// Reset the browser action badge so that it looks like
// our notifications have been reset
chrome.browserAction.setBadgeText({ text: '' });

const Root = () => (
  <Provider>
    <App />
  </Provider>
);

render(<Root />, document.getElementById('root'));