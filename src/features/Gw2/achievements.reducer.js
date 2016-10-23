import { readAchievements } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('achievements', readAchievements);

export { defaultState };
export default reducer;
