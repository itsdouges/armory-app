import { createFetch } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('materials', createFetch('materials'));

export { defaultState };
export default reducer;
