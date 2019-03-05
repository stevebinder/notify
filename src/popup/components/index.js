import React, { useContext } from 'react';
import { useOnMount } from '../effects';
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

export default () => {
  const { launchAuth, notifications, syncStorage, token } = useContext(Context);
  useOnMount(syncStorage);
  return (
    <div style={style}>
      {token ? <Base /> : <Welcome />}
    </div>
  );
};