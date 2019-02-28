import React from 'react';
import Feed from './Feed';
import Filters from './Filters';

const styles = {
  layout: {
    display: 'flex',
    overflow: 'hidden',
    width: '100%',
  },
};

export default () => (
  <div style={styles.layout}>
    <Filters />
    <Feed />
  </div>
);