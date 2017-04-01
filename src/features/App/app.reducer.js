import {
  DISMISS_NOTIFICATION,
  SUBMIT_NOTIFICATION,
} from './actions';

const setNotification = (state, id, notification) => ({
  ...state,
  notifications: {
    ...state.notifications,
    [id]: notification,
  },
});

export const defaultState = {
  notifications: {},
};

export default (state, action) => {
  switch (action.type) {
    case DISMISS_NOTIFICATION: {
      const notifications = {
        ...state.notifications,
      };

      delete notifications[action.payload];

      return {
        ...state,
        notifications,
      };
    }

    case SUBMIT_NOTIFICATION:
      return setNotification(state, action.payload.id, action.payload);

    default:
      return undefined;
  }
};
