import { readAchievementGroups } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('achievementGroups', readAchievementGroups);

export { defaultState };
export default reducer;
