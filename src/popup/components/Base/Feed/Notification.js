import React from 'react';

export default ({ notification }) => (
  <div
    onClick={() => window.open(notification.subject.url)}
    style={{ border: '1px solid #000' }}
  >
    <div>Reason: {notification.reason}</div>
    <div>Repo: {notification.repository.name}</div>
    <div>Type: {notification.subject.type}</div>
    <div>Title: {notification.subject.title}</div>
  </div>
);