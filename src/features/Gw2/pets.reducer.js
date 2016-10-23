import { readPets } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('pets', readPets);

export { defaultState };
export default reducer;
