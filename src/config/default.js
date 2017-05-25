// Deliberately a commonjs export so it can be used in webpack config.
// Until we're running webpack through babel this has to be done ;-).
module.exports = {
  description: 'Guild Wars 2 Armory is an easy way to find, view, and share users, characters, and guilds with your friends on your mobile and pc! Join today and start sharing!',
  title: 'Guild Wars 2 Armory',
  titleSuffix: ' | Guild Wars 2 Armory',
  imagesEndpoint: '//images.gw2armory.com/',
  refreshDelay: 1000 * 60 * 5,
  webUrl: 'https://gw2armory.com',

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

  embeds: {
    character: 'embeds/character',
    custom: 'embeds/custom',
  },

  descriptions: {
    pvpLeaderboard: 'Season six is finally here! Track users through the ranks while they climb their way to the top 250!',
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

  health: {
    token: 'EE920D9D-F7CF-A146-A5F5-95455980577B0DC68745-969C-4ED9-8462-1299FE6FB078',
  },

  cache: {
    saveToLs: true,

    short: [
      'index.html',
      'robots.txt',
      'sitemap.xml',
      'gw2aEmbeds.js',
      'asset-manifest.json',
      'service-worker.js',
    ],
  },
};
