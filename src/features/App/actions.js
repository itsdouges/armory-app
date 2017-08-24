// @flow

import axios from 'axios';
import config from 'config';
import T from 'i18n-react';

export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';
export const SUBMIT_NOTIFICATION = 'SUBMIT_NOTIFICATION';

const API_HEALTH_ID = 'api-health-id';

export const dismissNotification = (id: string) => ({
  type: DISMISS_NOTIFICATION,
  payload: id,
});

type MessageType = 'info' | 'error';

type MessageOptions = {
  type: MessageType,
  showOnce?: boolean,
  iconName?: string,
};

export type SubmitNotification = (id: string, message: string, options?: MessageOptions) => void;

export const submitNotification = (id: string, message: string, options: MessageOptions = { type: 'info', showOnce: false }) => ({
  type: SUBMIT_NOTIFICATION,
  payload: {
    ...options,
    id,
    message,
  },
});

export const determineApiHealth = () => (dispatch: Dispatch) => {
  axios.get(`${config.gw2.endpoint}v2/characters?access_token=${config.health.token}`)
    .catch(() => {
      dispatch(submitNotification(API_HEALTH_ID, T.translate('messages.gw2ApiDown'), {
        type: 'error',
      }));
    });
};
