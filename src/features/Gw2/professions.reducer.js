import { readProfessions } from 'lib/gw2';
import createReducer from './reducerFactory';
import actions from './actions';
import forEach from 'lodash/forEach';

const { defaultState, reducer } = createReducer('professions', readProfessions, {
  afterGet: (dispatch, professions) => {
    const skillIds = [];

    forEach(professions, ({ weapons }) => {
      forEach(weapons, ({ skills }) => skills.forEach((skill) => skillIds.push(skill.id)));
    });

    dispatch(actions.fetchSkills(skillIds));
  },
});

export { defaultState };
export default reducer;
