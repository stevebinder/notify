import React, { useContext } from 'react';
import Store from 'src/popup/Store';

const styles = {
  container: {
    background: '#999',
    boxSizing: 'border-box',
    flex: '0 0 auto',
    height: '100%',
    overflow: 'auto',
    padding: '30px',
  },
};

export default () => {
  const { notifications } = useContext(Store.Context);
  const repoFilters = ['drive-web', 'iris', 'gaia'];
  return (
    <div style={styles.container}>
      {repoFilters.map(name => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
};