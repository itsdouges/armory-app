import { SHOW_TOOLTIP } from './actions';
import { createSelector } from 'reselect';

export const selector = createSelector(
  state => state.tooltip,
  (tooltip) => ({
    tooltip,
  })
);

export const defaultState = {
  show: false,
};

export default function reducer (state, action) {
  switch (action.type) {
    case SHOW_TOOLTIP:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
}
