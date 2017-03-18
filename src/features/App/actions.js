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

export const submitNotification = (id: string, type: MessageType, message: string) => ({
  type: SUBMIT_NOTIFICATION,
  payload: {
    id,
    type,
    message,
  },
});

export const determineApiHealth = () => (dispatch: Dispatch) => {
  axios.get(`${config.gw2.endpoint}v2/characters?access_token=${config.health.token}`, { ignoreAuth: true })
    .then(null, () => {
      dispatch(submitNotification(API_HEALTH_ID, 'error', T.translate('messages.gw2ApiDown')));
    });
};
