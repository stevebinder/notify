import { selector } from 'reactdux';

export const selectToken = selector(state => state.token);
export const selectNotifications = selector(state => state.notifications);