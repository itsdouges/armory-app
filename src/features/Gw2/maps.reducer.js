import { readMaps } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('maps', readMaps);

export { defaultState };
export default reducer;
