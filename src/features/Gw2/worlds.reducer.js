import { readWorlds } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('worlds', readWorlds);

export { defaultState };
export default reducer;
