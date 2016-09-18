import { get } from 'axios';
import config from 'env';
import {
  mapItemsToObject,
  mapSkinsToObject,

} from './parse';

export const readPvpSeasons = (ids) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons?ids=${ids.join(',')}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

export const readPvpSeason = (id) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons/${id}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

export const readSkills = (ids) =>
  get(`${config.gw2.endpoint}v2/skills?ids=${ids.join(',')}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

export const readAllItemIds = () =>
  get(`${config.gw2.endpoint}v2/items`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);

export const readItems = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/items?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const items = mapItemsToObject(data);
    return Promise.resolve(items);
  });
};

export const readSkins = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/skins?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const skins = mapSkinsToObject(data);
    return skins;
  });
};

export const readSpecializations = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/specializations?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const specs = mapSkinsToObject(data);
    return specs;
  });
};

export const readTraits = (ids) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/traits?ids=${delimitedIds}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => {
    const mappedTraits = mapSkinsToObject(data);
    return mappedTraits;
  });
};

export const readGuild = (guid) =>
  get(`${config.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, {
    ignoreAuth: true,
    cache: true,
  })
  .then(({ data }) => data);
