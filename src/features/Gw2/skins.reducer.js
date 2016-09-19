import { readSkins } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('skins', readSkins);

export { defaultState };
export default reducer;
