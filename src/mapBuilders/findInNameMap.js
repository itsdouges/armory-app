// @flow

import { argv } from 'yargs';
import path from 'path';
import pickBy from 'lodash/pickBy';

type ResourceMap = {
  [string]: number,
};

function getResourceMap (): ResourceMap {
  return require(path.resolve(__dirname, argv.path));
}

export function fuzzy (nameToFind: string, resourceMap: ResourceMap = getResourceMap()) {
  const nameToFindLower = nameToFind.toLowerCase();
  return pickBy(resourceMap, (value, key) => key.toLowerCase().includes(nameToFindLower));
}

export function exact (itemName: string, resourceMap: ResourceMap = getResourceMap()) {
  return resourceMap[itemName] || null;
}
