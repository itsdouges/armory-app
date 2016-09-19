import { readPvpSeasons } from 'lib/gw2';
import createReducer from './reducerFactory';

const { reducer, defaultState } = createReducer('pvpSeasons', readPvpSeasons);

export { defaultState };
export default reducer;
