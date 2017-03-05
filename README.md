# Guild Wars 2 Armory [![Build Status](https://travis-ci.org/madou/armory-react.svg?branch=master)](https://travis-ci.org/madou/armory-react) [![Dependencies](https://david-dm.org/madou/armory-react.svg)](https://david-dm.org/madou/armory-react) [![Dev Dependencies](https://david-dm.org/madou/armory-react/dev-status.svg)](https://david-dm.org/madou/armory-react?type=dev) [![Join the chat at https://gitter.im/gw2armory/Lobby](https://badges.gitter.im/gw2armory/Lobby.svg)](https://gitter.im/gw2armory/Lobby) [![Code Triagers Badge](https://www.codetriage.com/madou/armory-react/badges/users.svg)](https://www.codetriage.com/madou/armory-react)

> Guild Wars 2 Armory is an easy way to find, view, and share users, characters, and guilds with your friends on your mobile and PC! Join today and start sharing!

## Quick Start

```
git clone https://github.com/madou/armory-react.git
cd armory-react
npm i
cp src/config/local.sample.js src/config/local.js
npm run dev
```

## Notes for Local Development

- If running locally make sure you add a `local.js` to the `src/env/` folder. Look at `local.sample.js` for help. This isn't checked in deliberately so we can play with local settings without affecting git history.
- If needed you can get the api over at [armory-back](https://github.com/madou/armory-back). You will have to update your `config/local.js` to point to `localhost` if running the api locally.

### Redux Dev Tools

Enabled in dev mode only, [go install the extension](http://extension.remotedev.io/) and then open it while running the armory locally.

## Pull Requests

Feel like contributing? Look at the [issues](https://github.com/madou/armory-react/issues) tab, or contact me on [reddit](https://www.reddit.com/r/gw2armory) or [twitter](https://twitter.com/itsmadou) to find something you'd like to work on, then make a pull request against the `master` branch.

### Issues Quick Find

- [Good first contribution](https://github.com/madou/armory-react/labels/good%20first%20contribution)
- [New features](https://github.com/madou/armory-react/issues?q=is%3Aopen+is%3Aissue+label%3Afeature)
- [Feature enhancements](https://github.com/madou/armory-react/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)
- [Bugs](https://github.com/madou/armory-react/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

© 2015-2017 gw2armory.com
