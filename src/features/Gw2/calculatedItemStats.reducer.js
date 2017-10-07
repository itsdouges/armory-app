import { readCalculatedItemStats } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('calculatedItemStats', readCalculatedItemStats);

export { defaultState };
export default reducer;
