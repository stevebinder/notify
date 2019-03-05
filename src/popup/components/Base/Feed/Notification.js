import React from 'react';

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

export default ({ notification }) => (
  <div
    onClick={() => window.open(notification.subject.url)}
    style={{ border: '1px solid #000', background: getIsNew(notification) ? 'yellow' : 'transparent' }}
  >
    <div>Reason: {notification.reason}</div>
    <div>Repo: {notification.repository.name}</div>
    <div>Type: {notification.subject.type}</div>
    <div>Title: {notification.subject.title}</div>
  </div>
);