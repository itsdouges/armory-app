// @flow

import axios from 'axios';
import config from 'config';
import { mapItemsToObject } from './parse';
import { reduceById } from 'lib/reduce';

const get = axios.get;

export const readProfessions = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/professions?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readTitles = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/titles?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readWorlds = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/worlds?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readLegends = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/legends?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readAchievements = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/achievements?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readAchievementGroups = () =>
  get(`${config.gw2.endpoint}v2/achievements/groups?ids=all`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readAchievementCategories = () =>
  get(`${config.gw2.endpoint}v2/achievements/categories?ids=all`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readPets = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/pets?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readPvpSeasons = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readMaps = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/maps?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readAmulets = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/pvp/amulets?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readPvpSeasonIds = () =>
  get(`${config.gw2.endpoint}v2/pvp/seasons`, {
    ignoreAuth: true,
  })
  .then(({ data }) => data);

export const readPvpSeason = (id: number) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons/${id}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => data);

export const readSkills = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/skills?ids=${ids.join(',')}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));

export const readAllItemIds = () =>
  get(`${config.gw2.endpoint}v2/items`, {
    ignoreAuth: true,
  })
  .then(({ data }) => data);

export const readItems = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/items?ids=${delimitedIds}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => mapItemsToObject(data));
};

export const readItemStats = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/itemstats?ids=${delimitedIds}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => mapItemsToObject(data));
};

export const readSkins = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/skins?ids=${delimitedIds}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));
};

export const readSpecializations = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/specializations?ids=${delimitedIds}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));
};

export const readTraits = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/traits?ids=${delimitedIds}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => reduceById(data));
};

export const readGuild = (guid: string) =>
  get(`${config.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`, {
    ignoreAuth: true,
  })
  .then(({ data }) => data);
