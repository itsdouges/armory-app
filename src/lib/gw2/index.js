// @flow

import axios from 'axios';
import config from 'config';
import uniq from 'lodash/uniq';
import { reduceById } from 'lib/reduce';
import { mapItemsToObject } from './parse';

const get = axios.get;

export const readProfessions = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/professions?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readTitles = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/titles?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readWorlds = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/worlds?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readGuildUpgrades = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/guild/upgrades?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readLegends = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/legends?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readAchievements = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/achievements?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readAchievementGroups = (ids: Array<number> | 'all') =>
  get(`${config.gw2.endpoint}v2/achievements/groups?ids=${ids === 'all' ? ids : ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readAchievementCategories = (ids: Array<number> | 'all') =>
  get(`${config.gw2.endpoint}v2/achievements/categories?ids=${ids === 'all' ? ids : ids.join(',')}`)
  .then(({ data }) => reduceById(data.map((category) => ({
    ...category,
    // Remove duplicate achievement ids, current bug.
    // See: https://github.com/arenanet/api-cdi/issues/517
    achievements: uniq(category.achievements),
  }))));

export const readPets = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/pets?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readPvpSeasons = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readMaps = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/maps?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readAmulets = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/pvp/amulets?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readPvpSeasonIds = () =>
  get(`${config.gw2.endpoint}v2/pvp/seasons`)
  .then(({ data }) => data);

export const readPvpSeason = (id: number) =>
  get(`${config.gw2.endpoint}v2/pvp/seasons/${id}`)
  .then(({ data }) => data);

export const readSkills = (ids: Array<number>) =>
  get(`${config.gw2.endpoint}v2/skills?ids=${ids.join(',')}`)
  .then(({ data }) => reduceById(data));

export const readAllItemIds = () =>
  get(`${config.gw2.endpoint}v2/items`)
  .then(({ data }) => data);

export const readItems = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/items?ids=${delimitedIds}`)
  .then(({ data }) => mapItemsToObject(data));
};

export const readItemStats = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/itemstats?ids=${delimitedIds}`)
  .then(({ data }) => mapItemsToObject(data));
};

export const readSkins = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/skins?ids=${delimitedIds}`)
  .then(({ data }) => reduceById(data));
};

export const readSpecializations = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/specializations?ids=${delimitedIds}`)
  .then(({ data }) => reduceById(data));
};

export const readCurrencies = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/currencies?ids=${delimitedIds}`)
  .then(({ data }) => reduceById(data));
};

export const createFetch = (resource: string) => (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/${resource}?ids=${delimitedIds}`)
  .then(({ data }) => reduceById(data));
};

export const readTraits = (ids: Array<number>) => {
  const delimitedIds = ids.join(',');

  return get(`${config.gw2.endpoint}v2/traits?ids=${delimitedIds}`)
  .then(({ data }) => reduceById(data));
};

export const readGuild = (guid: string) =>
  get(`${config.gw2.endpoint}v1/guild_details.json?guild_id=${guid}`)
  .then(({ data }) => data);

type StatDef = {
  id: number,
  itemId: number,
  type: string,
  rarity: string,
  level: number,
};

export const readCalculatedItemStats = (statDefs: Array<StatDef>) =>
  axios.post('https://api.gw2armory.com/itemstats', statDefs)
  .then(({ data }) => data.reduce((obj, itemStat, index) => {
    const itemId = statDefs[index].itemId;
    // eslint-disable-next-line no-param-reassign
    obj[`${itemId}${itemStat.id}`] = {
      ...itemStat,
      itemId: statDefs[index].itemId,
    };
    return obj;
  }, {}));
