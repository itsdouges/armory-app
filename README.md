# Guild Wars 2 Armory

[![Build Status](https://travis-ci.org/madou/armory-react.svg?branch=master)](https://travis-ci.org/madou/armory-react) [![Dependencies](https://david-dm.org/madou/armory-react.svg)](https://david-dm.org/madou/armory-react) [![Dev Dependencies](https://david-dm.org/madou/armory-react/dev-status.svg)](https://david-dm.org/madou/armory-react?type=dev) [![Join the chat at https://gitter.im/gw2armory/Lobby](https://badges.gitter.im/gw2armory/Lobby.svg)](https://gitter.im/gw2armory/Lobby) [![codecov](https://codecov.io/gh/madou/armory-react/branch/master/graph/badge.svg)](https://codecov.io/gh/madou/armory-react)

> Guild Wars 2 Armory is an easy way to find, view, and share users, characters, and guilds with your friends on your mobile and PC! Join today and start sharing!

## Quick Start

```bash
git clone https://github.com/madou/armory-react.git
cd armory-react
yarn install # See https://yarnpkg.com/lang/en/docs/install/
cp src/config/local.sample.js src/config/local.js # local.js isn't checked in so you'll have to make one yourself.
```

### Testing

Run `tdd` for unit tests.

```bash
npm run tdd
```

Run `dev` for development and `start` for production.

### Website

```bash
npm run dev
npm start
```

### Embeds

Run `dev:embeds` for development and `start:embeds` for production.

```bash
npm run dev:embeds
npm run start:embeds
```

## Notes for Local Development

- When locally make sure you add a `local.js` to the `src/env/` folder. Look at `local.sample.js` for help. This isn't checked in deliberately so we can play with local settings without affecting git history.
- If needed you can get the api over at [armory-back](https://github.com/madou/armory-back). You will have to update your `config/local.js` to point to `localhost` if running the api locally.
- We use `pre-commit` to run commands before checking in. This will run `npm test` which covers linting, flow errors, and tests.

## Deployments

### To gw2armory.com

When a tagged commit is found a release to production is triggered in Travis.

To get a tagged commit run the following command in `master`:

```bash
npm version major|minor|patch
```

This will increment the version, update CHANGELOG.md (anything under Unreleased will be moved to a version), and push commits/tags to git.

### To preview.gw2armory.com

Standard npm version is used for deployments.

### Redux Dev Tools

Enabled in dev mode only, [go install the extension](http://extension.remotedev.io/) and then open it while running the armory locally.

## Pull Requests

Feel like contributing? Look at the [issues](https://github.com/madou/armory-react/issues) tab (or below in quick issues), or contact me on [twitter](https://twitter.com/itsmadou) for help to find something you'd like to work on. Make a pull request against `master` when you're ready to share your code!

### Quick Issues

- [Good first contribution](https://github.com/madou/armory-react/labels/good%20first%20contribution)
- [New features](https://github.com/madou/armory-react/issues?q=is%3Aopen+is%3Aissue+label%3Afeature)
- [Feature enhancements](https://github.com/madou/armory-react/issues?q=is%3Aopen+is%3Aissue+label%3Aenhancement)
- [Bugs](https://github.com/madou/armory-react/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

© 2015-present gw2armory.com
