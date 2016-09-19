import { readPvpSeasons } from 'lib/gw2';
import createReducer from './reducerFactory';

const { reducer, defaultState } = createReducer('pvpSeasons', readPvpSeasons, {
  reduceResultsById: true,
});

export { defaultState };
export default reducer;
