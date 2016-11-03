import { readTitles } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('titles', readTitles);

export { defaultState };
export default reducer;
