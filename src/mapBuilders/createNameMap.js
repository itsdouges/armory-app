// @flow

import axios from 'axios';

const RESOURCES_PER_CALL = 200;
const ENDPOINT = '/v2/items';

const makeUrl = (path, ids) => `https://api.guildwars2.com${path}${ids ? ids.join(',') : ''}`;

async function create () {
  const { data: ids } = await axios.get(makeUrl(ENDPOINT));
  const promises = [];

  while (ids.length) {
    const idsToFetch = ids.splice(0, RESOURCES_PER_CALL);
    promises.push(axios.get(makeUrl(ENDPOINT, idsToFetch)));
  }

  const promiseResults = await Promise.all(promises);

  const resourceMap = promiseResults.reduce((arr, resourceArr) => arr.concat(resourceArr), [])
    .reduce((obj, resource) => ({
      ...obj,
      [resource.name]: {
        id: resource.id,
        icon: resource.icon,
      },
    }), {});

  // eslint-disable-next-line no-console
  console.log(JSON.stringify(resourceMap));
}

create();
