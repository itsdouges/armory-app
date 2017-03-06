import { readItemStats } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('itemstats', readItemStats);

export { defaultState };
export default reducer;
