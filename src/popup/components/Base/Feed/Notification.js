import React from 'react';

const styles = {
  actor: {
    background: '#fff',
    borderRadius: '9999px',
    boxShadow: '0 0 5px #929292',
    height: '30px',
    marginLeft: '-8px',
    objectFit: 'cover',
    width: '30px',
  },
  body: {
    color: '#696969',
    fontSize: '11px',
    marginTop: '7px',
    userSelect: 'none',
  },
  container: (isNew, spaced) => ({
    background: isNew ? '#f1f8ff' : 'rgba(0, 0, 0, 0.03)',
    border: `1px solid ${isNew ? 'rgba(0, 0, 0, 0.05)' : 'transparent'}`,
    borderRadius: '3px',
    cursor: 'pointer',
    marginTop: spaced ? '10px' : '',
    overflow: 'hidden',
    padding: '15px',
  }),
  graphic: background => ({
    alignItems: 'center',
    background,
    borderRadius: '9999px',
    boxShadow: '0 0 5px #929292',
    display: 'flex',
    height: '20px',
    justifyContent: 'center',
    left: '-10px',
    position: 'absolute',
    top: '-10px',
    width: '20px',
  }),
  header: {
    alignItems: 'flex-start',
    display: 'flex',
    position: 'relative',
  },
  icon: {
    display: 'block',
    fill: '#fff',
    width: '50%',
  },
  owner: {
    background: '#fff',
    borderRadius: '9999px',
    boxShadow: '0 0 5px #929292',
    height: '30px',
    objectFit: 'cover',
    width: '30px',
  },
  time: {
    color: '#969696',
    flex: '1',
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
    fontWeight: 'bold',
    fontSize: '13px',
    marginTop: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  },
};

const getTime = ({ updated_at }) => {
  const date = new Date(updated_at);
  const elapsed = Date.now() - date;
  if (elapsed < 60000) {
    return `${Math.ceil(elapsed / 1000)} sec ago`;
  }
  if (elapsed < 3600000) {
    return `${Math.floor(elapsed / 60000)} min ago`;
  }
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const time = `${hours}:${date.getMinutes()}${date.getHours() >= 12 ? 'pm' : 'am'}`;
  const today = new Date();
  if (
    `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  ) {
    return time;
  }
  const yesterday = new Date(Date.now() - 86400000);
  if (
    `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`
    === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  ) {
    return `yesterday ${time}`;
  }
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const suffix = (() => {
    const last = `${day}`[`${day}`.length - 1];
    if (last === '1') {
      return 'st';
    }
    if (last === '2') {
      return 'nd';
    }
    if (last == '3') {
      return 'rd';
    }
    return 'th';
  })();
  return `${month} ${day}${suffix}`;
};

const getIsNew = ({ last_read_at: read, updated_at: updated }) => {
  const now = Date.now();
  const getAge = time => !time ? 0 : now - (new Date(time).valueOf() || 0);
  if (getAge(updated) >= 86400000) {
    return false;
  }
  if (getAge(read) >= 5000) {
    return false;
  }
  return true;
};

const getColor = ({ subject: { type } }) => {
  if (type === 'PullRequest') {
    return '#2cbe4e';
  }
  return '#b7b7b7';
};

const getIcon = ({ subject: { type } }) => {

  if (type === 'Issue') {
    return (
      <svg style={styles.icon} viewBox="0 0 14 16">
        <path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71
          5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14
          0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
      </svg>
    );
  }
  if (type === 'PullRequest') {
    return (
      <svg style={styles.icon} viewBox="0 0 12 16">
        <path d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46
          2.35 8.78 2.03 8 2H7V0L4 3l3
          3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10
          15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2
          0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2
          1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993
          1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98
          1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2
          0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8
          3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55
          1.2-1.2 1.2z" />
      </svg>
    );
  }
  if (type === 'Release') {
    return (
      <svg style={styles.icon} viewBox="0 0 14 16">
        <path d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1
          3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41
          0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38
          7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42
          0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01
          3h2v2H3V3h.01z" />
      </svg>
    );
  }
  return null;
}

export default ({ notification, space }) => (
  <div
    onClick={() => window.open(notification.subject.url)}
    style={styles.container(getIsNew(notification), space)}
  >
    <div style={styles.header}>
      <img style={styles.owner} src="https://avatars1.githubusercontent.com/u/218394?v=4" />
      <img style={styles.actor} src="https://avatars3.githubusercontent.com/u/11276847?s=460&v=4" />
      <div style={styles.time}>{getTime(notification)}</div>
      <div style={styles.graphic(getColor(notification))}>
        {getIcon(notification)}
      </div>
    </div>
    <div style={styles.title}>{notification.repository.name}</div>
    <div style={styles.body}>{notification.subject.title}</div>
  </div>
);