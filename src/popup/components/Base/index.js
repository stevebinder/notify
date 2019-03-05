import React, { useContext } from 'react';
import { useOnMount } from 'src/popup/effects';
import { Context } from 'src/popup/Store';
import Feed from './Feed';
import Filters from './Filters';

const styles = {
  layout: {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
  },
};

export default () => {
  const { markNotificationsRead } = useContext(Context);
  useOnMount(markNotificationsRead);
  return (
    <div style={styles.layout}>
      <Filters />
      <Feed />
    </div>
  );
};