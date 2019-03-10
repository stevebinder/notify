export default {
  container: {
    background: '#24292e',
    boxSizing: 'border-box',
    flex: '0 0 192px',
    height: '100%',
    overflow: 'auto',
    padding: '20px 0',
  },
  option: (hovered, selected) => ({
    backgroundColor: `rgba(255, 255, 255, ${selected ? 0.1 : hovered ? 0.03 : 0})`,
    color: `rgba(255, 255, 255, ${selected ? 0.88 : 0.38}`,
    cursor: 'pointer',
    overflow: 'hidden',
    padding: '3px 20px 3px 35px',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    hovered: hovered
  }),
  header: {
    color: '#fff',
    cursor: 'default',
    fontWeight: 'bold',
    margin: '0 20px 10px 20px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  section: spaced => ({
    marginTop: spaced ? '20px' : '',
  }),
};