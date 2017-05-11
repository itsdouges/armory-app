const promisify = require('promisify-node');
const pixelAverage = promisify(require('pixel-average'));
const axios = require('axios');

const f = (num) => Math.floor(num);
const categoryMap = {};

axios.get('https://api.guildwars2.com/v2/achievements/categories?ids=all')
  .then(({ data: categories }) => {
    return Promise.all(
      categories.map((category) => pixelAverage(category.icon)
        .then((averages) => {
          const average = `rgba(${f(averages.red)}, ${f(averages.green)}, ${f(averages.blue)}, 1)`;
          categoryMap[category.id] = average;
        })
    ));
  })
  .then(() => {
    console.log(JSON.stringify(categoryMap));
  });
