import React, { useContext } from 'react';
import { Context } from 'src/popup/Store';

export default () => {
  const { launchAuth } = useContext(Context);
  return <button onClick={launchAuth}>Please Auth!</button>;
};