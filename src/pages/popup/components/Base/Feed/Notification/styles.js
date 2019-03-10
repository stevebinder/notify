export default {
  body: {
    color: '#696969',
    fontSize: '11px',
    marginTop: '7px',
    userSelect: 'none',
  },
  container: (isNew, spaced, hovered) => ({
    background: isNew ? '#fff7c0' : '#f1f1f1',
    border: `1px solid ${hovered ? '#dadada' : 'transparent'}`,
    borderRadius: '3px',
    cursor: 'pointer',
    marginTop: spaced ? '10px' : '',
    overflow: 'hidden',
    padding: '15px',
  }),
  action: background => ({
    alignItems: 'center',
    background,
    borderRadius: '9999px',
    boxShadow: 'rgb(181, 181, 181) 0px 0px 5px',
    display: 'flex',
    height: '20px',
    justifyContent: 'center',
    left: '-10px',
    position: 'absolute',
    top: '-10px',
    width: '20px',
  }),
  header: {
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    display: 'block',
    fill: '#fff',
    width: '50%',
  },
  graphic: {
    position: 'relative',
  },
  owner: {
    background: '#fff',
    borderRadius: '9999px',
    height: '25px',
    objectFit: 'cover',
    width: '25px',
  },
  time: {
    color: '#969696',
    flex: '0 0 auto',
    fontSize: '11px',
    fontStyle: 'italic',
    overflow: 'hidden',
    textAlign: 'right',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
  title: {
    color: '#464646',
    flex: '1',
    fontWeight: 'bold',
    fontSize: '13px',
    margin: '0 15px 0 12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
};