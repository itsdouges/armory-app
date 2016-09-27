import { readAmulets } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('amulets', readAmulets);

export { defaultState };
export default reducer;
