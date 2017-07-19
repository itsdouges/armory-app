import { readCurrencies } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('currencies', readCurrencies);

export { defaultState };
export default reducer;
