import { readSkills } from 'lib/gw2';
import createReducer from './reducerFactory';

const { reducer, defaultState } = createReducer('skills', readSkills, {
  reduceResultsById: true,
});

export { defaultState };
export default reducer;
