import { readItems } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('items', readItems);

export { defaultState };
export default reducer;
