import { readTraits } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('traits', readTraits);

export { defaultState };
export default reducer;
