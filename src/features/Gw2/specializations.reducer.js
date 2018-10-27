import { readSpecializations } from 'lib/gw2';
import createReducer from './reducerFactory';
import actions from './actions';

const { defaultState, reducer } = createReducer('specializations', readSpecializations, {
  afterGet: (dispatch, specializations) => {
    let traitsToAdd = [];

    Object.keys(specializations).forEach(key => {
      const speciailization = specializations[key];

      traitsToAdd = traitsToAdd.concat(speciailization.major_traits, speciailization.minor_traits);
    });

    dispatch(actions.fetchTraits(traitsToAdd));
  },
});

export { defaultState };
export default reducer;
