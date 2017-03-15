import { readItemStats } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('itemStats', readItemStats);

export { defaultState };
export default reducer;
