import React, { useContext } from 'react';
import { Context } from 'src/popup/Store';

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
  const { filters } = useContext(Context);
  return (
    <div style={styles.container}>
      {filters.map(name => (
        <div key={name}>{name}</div>
      ))}
    </div>
  );
};