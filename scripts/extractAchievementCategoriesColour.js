const promisify = require('promisify-node');
const pixelAverage = promisify(require('pixel-average'));
const axios = require('axios');

const f = num => Math.floor(num);
const categoryMap = {};

axios
  .get('https://api.guildwars2.com/v2/achievements/categories?ids=all')
  .then(({ data: categories }) => {
    return Promise.all(
      categories.map(category =>
        pixelAverage(category.icon).then(averages => {
          categoryMap[category.id] = {
            r: f(averages.red),
            g: f(averages.green),
            b: f(averages.blue),
          };
        })
      )
    );
  })
  // eslint-disable-next-line no-console
  .then(() => console.log(JSON.stringify(categoryMap)));
