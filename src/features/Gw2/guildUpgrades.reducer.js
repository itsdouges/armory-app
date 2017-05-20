import { readGuildUpgrades } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('guildUpgrades', readGuildUpgrades);

export { defaultState };
export default reducer;
