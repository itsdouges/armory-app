import { readPvpSeasons } from 'lib/gw2';
import createReducer from './reducerFactory';

const { reducer, defaultState } = createReducer('pvpSeasons', readPvpSeasons, (payload) =>
  payload.reduce((acc, item) => ({
    ...acc,
    [item.id]: item,
  }), {})
);

export { defaultState };
export default reducer;
