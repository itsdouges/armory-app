// Deliberately a commonjs export so it can be used in webpack config.
// Until we're running webpack through babel this has to be done ;-).
module.exports = {
  description: 'Guild Wars 2 Armory is an easy way to find, view, and share users, characters, and guilds with your friends on your mobile and pc! Join today and start sharing!',
  title: 'Guild Wars 2 Armory',
  titleSuffix: ' | Guild Wars 2 Armory',
  imagesEndpoint: '//images.gw2armory.com/',
  refreshDelay: 1000 * 60 * 5,

  gw2: {
    endpoint: 'https://api.guildwars2.com/',
  },

  meta: {
    title: 'Armor Up',
  },

  features: {
    christmas: false,
    ads: false,
  },

  embedEndpoints: {
    character: 'embeds/character',
    custom: 'embeds/custom',
  },

  descriptions: {
    pvpLeaderboard: 'Guild Wars 2 season five now underway! Keep track of Guild Wars 2 Armory users as they climb the pvp ranks! See the top 250 right here.',
  },

  i18n: {
    languages: [
      { short: 'en', long: 'English' },
      { short: 'fr', long: 'Le Français' },
      { short: 'de', long: 'Deutsch' },
      { short: 'es', long: 'Español' },
      { short: 'zh', long: '汉语/漢語' },
      { short: 'ru', long: 'Pу́сский язы́к' },
    ],
  },
};
