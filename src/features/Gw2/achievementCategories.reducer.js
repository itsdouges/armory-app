import { readAchievementCategories } from 'lib/gw2';
import createReducer from './reducerFactory';

const { defaultState, reducer } = createReducer('achievementCategories', readAchievementCategories);

export { defaultState };
export default reducer;
