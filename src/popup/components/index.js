import React, { useContext } from 'react';
import { useIsMounted } from '../effects';
import { Context } from 'src/popup/Store';
import Base from './Base';
import Welcome from './Welcome';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default () => {
  const { launchAuth, notifications, syncStorage, token } = useContext(Context);
  useIsMounted(syncStorage);
  return (
    <div style={style}>
      {token ? <Base /> : <Welcome />}
    </div>
  );
};