export const getColor = ({ subject: { type } }) => {
  if (type === 'Issue') {
    return '#ff4a4a';
  }
  if (type === 'PullRequest') {
    return '#2cbe4e';
  }
  if (type === 'Release') {
    return '#0366d6';
  }
  return '#b7b7b7';
};

export const getIsNew = ({ last_read_at: read, updated_at: updated }) => {
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

export const getTime = ({ updated_at }) => {
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
  const month = date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${month}/${day}`;
};

export const getUrl = ({ subject: { type, url } }) => {
  const base = 'https://github.com/';
  if (type === 'PullRequest') {
    return `${base}${url.split('/repos/')[1].replace('/pulls/', '/pull/')}`;
  }
  if (type === 'Release') {
    return `${base}${url.split('/repos/')[1].split('/releases/')[0]}/releases`;
  }
  if (type === 'Issue') {
    return `${base}${url.split('/repos/')[1]}`;
  }
  return `${base}notifications?all=1`;
};