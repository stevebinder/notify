import React, { useContext } from 'react';
import Store from 'src/popup/Store';
import Welcome from './Welcome';

export default () => {
  const { launchAuth } = useContext(Store.Context);
  return <button onClick={launchAuth}>Please Auth!</button>;
};