module.exports = {
  appName: 'gw2Armory',

  // eslint-disable-next-line
  description: 'Guild Wars 2 Armory is an easy way to find, view, and share users, characters, and guilds with your friends on your mobile and pc! Join today and start sharing!',

  title: 'Guild Wars 2 Armory',

  imagesEndpoint: '//images.gw2armory.com/',

  gw2: {
    endpoint: 'https://api.guildwars2.com/',
  },

  meta: {
    title: 'Armor Up',
  },

  features: {
    christmas: false,
  },

  titleSuffix: ' | Guild Wars 2 Armory',

  embedEndpoints: {
    character: 'embeds/character',
    custom: 'embeds/custom',
  },

  refreshDelay: 1000 * 60 * 5,
};
