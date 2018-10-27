import { get } from 'axios';
import config from 'config';

export const FETCH_STATISTICS = 'FETCH_STATISTICS';

function fetchStatisticsSuccess(stats) {
  return {
    type: FETCH_STATISTICS,
    payload: stats,
  };
}

export function fetchStatistics() {
  return dispatch =>
    get(`${config.api.endpoint}statistics`).then(({ data }) => {
      dispatch(fetchStatisticsSuccess(data));
    });
}
