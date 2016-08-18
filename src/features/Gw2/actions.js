import {
  readSkins,
  readItems,
  readTraits,
  readPvpSeason,
  readSpecializations,
} from 'lib/gw2';

export const FETCHING_ITEMS = 'FETCHING_ITEMS';
export const FETCHING_SKINS = 'FETCHING_SKINS';
export const FETCH_ITEMS_RESULT = 'FETCH_ITEMS_RESULT';
export const FETCH_SKINS_RESULT = 'FETCH_SKINS_RESULT';
export const SHOW_TOOLTIP = 'SHOW_TOOLTIP';
export const FETCHING_TRAITS = 'FETCHING_TRAITS';
export const FETCHING_SPECIALIZATIONS = 'FETCHING_SPECIALIZATIONS';
export const FETCH_TRAITS_RESULT = 'FETCH_TRAITS_RESULT';
export const FETCH_SPECIALIZATIONS_RESULT = 'FETCH_SPECIALIZATIONS_RESULT';
export const FETCH_PVP_SEASON_RESULT = 'FETCH_PVP_SEASON_RESULT';

export const fetchSkinsSuccessResult = (items) => ({
  type: FETCH_SKINS_RESULT,
  payload: items,
});

export const fetchItemsSuccessResult = (items) => ({
  type: FETCH_ITEMS_RESULT,
  payload: items,
});

export const fetchTraitsResultSuccess = (traits) => ({
  type: FETCH_TRAITS_RESULT,
  payload: traits,
});

export const fetchSpecializationsResultSuccess = (specializations) => ({
  type: FETCH_SPECIALIZATIONS_RESULT,
  payload: specializations,
});

export const fetchingTraits = (fetching) => ({
  type: FETCHING_TRAITS,
  payload: fetching,
});

export const fetchingSpecializations = (fetching) => ({
  type: FETCHING_SPECIALIZATIONS,
  payload: fetching,
});

export const fetchingSkins = (fetching) => ({
  type: FETCHING_SKINS,
  payload: fetching,
});

export const fetchingItems = (fetching) => ({
  type: FETCHING_ITEMS,
  payload: fetching,
});

export const fetchPvpSeasonSuccess = (season) => ({
  type: FETCH_PVP_SEASON_RESULT,
  payload: season,
});

export const fetchSkins = (skins) => (dispatch) => {
  dispatch(fetchingSkins(true));

  return readSkins(skins)
    .then((response) => {
      dispatch(fetchSkinsSuccessResult(response));
      dispatch(fetchingSkins(false));
    });
};

export function fetchItems (items) {
  return (dispatch) => {
    dispatch(fetchingItems(true));

    return readItems(items)
      .then((response) => {
        dispatch(fetchItemsSuccessResult(response));
        dispatch(fetchingItems(false));
      });
  };
}

export function fetchTraits (traits) {
  return (dispatch) => {
    dispatch(fetchingTraits(true));

    return readTraits(traits)
      .then((response) => {
        dispatch(fetchTraitsResultSuccess(response));
        dispatch(fetchingTraits(false));
      });
  };
}

export function fetchPvpSeason (id) {
  return (dispatch) => readPvpSeason(id)
    .then((response) => {
      dispatch(fetchPvpSeasonSuccess(response));
    });
}

export function fetchSpecializations (ids) {
  return (dispatch) => {
    dispatch(fetchingSpecializations(true));

    return readSpecializations(ids)
      .then((specializations) => {
        dispatch(fetchSpecializationsResultSuccess(specializations));
        dispatch(fetchingSpecializations(false));

        let traitsToAdd = [];

        Object.keys(specializations).forEach((key) => {
          const speciailization = specializations[key];

          traitsToAdd = traitsToAdd
            .concat(speciailization.major_traits, speciailization.minor_traits);
        });

        dispatch(fetchTraits(traitsToAdd));
      });
  };
}

export function showTooltip (show, { type, data } = {}) {
  return {
    type: SHOW_TOOLTIP,
    payload: {
      show,
      type,
      data,
    },
  };
}
