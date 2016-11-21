# Change Log

## Log structure

```
## [Unreleased|major.minor.patch] - yyyy/mm/dd
### Added|Changed|Fixed|Removed
- Changes
```

## [unreleased]
### Added
- Customisable armory embed
- Page title to character embed
- Embed details page

### Changed
- Character embed route from `/character` to `/embeds/character`
- Character specializations to have `small` mode
- Eslint major version

### Removed
- News from front page

## [2.17.0] - 2016/11/10
### Added
- Flow static type checking

## [2.16.2] - 2016/11/08
### Added
- Base css file to simply style depedency imports

### Changed
- Css to be more maintainable. This includes moving all colour, zindex, font declartions into the base area, as well as general cleanup.

## [2.16.1] - 2016/11/07
### Changed
- Pie chart to use on brand gw2 assets
- Statistics to have placeholder pie charts while waiting for stats to load
- Basic prefix support helper for inline styles

## [2.16.0] - 2016/11/07
### Added
- Missing translation blocks throughout the app

### Changed
- Incorrect german translations

## [2.15.0] - 2016/11/03
### Added
- Character title to character pages when appropriate

## [2.14.0] - 2016/11/03
### Changed
- Pvp stats summary
- Progress bar to allow custom label
- Pvp match component, adds progress bar, modifies styles

### Added
- Favourite profession to user page

## [2.13.1] - 2016/11/02
### Changed
- Readme to be slightly more new friendly

## [2.13.0] - 2016/11/02
### Added
- Linting in travis ci

### Changed
- Any linting errors found

## [2.12.0] - 2016/10/29
### Added
- Wvw rank to user page
- Dail ap to user page
- Fractal level to user page
- Commander flair to user page

### Changed
- Front page image to have a default height

## [2.11.0] - 2016/10/24
### Added
- Ranger pets to character page

## [2.10.0] - 2016/10/23
### Added
- Raid boss summary to user page

### Changed
- Attribute calculation to not blow up before finished loading
- Embed icon location on the character portrait

## [2.9.0] - 2016/10/22
### Added
- Language translations (de, es, fr, ru)

## [2.8.1] - 2016/10/20
### Changed
- Character attribute calculation
- Health check endpoint
- Styles for responsive menu, header, character embed, and random guilds list

## [2.8.0] - 2016/10/19
### Added
- Random guilds on front page

### Changed
- Front page ui design
- Fixed header design

## [2.7.0] - 2016/10/13
### Added
- Character hiding feature, you can find this by clicking the edit button on any character you own

## [2.6.0] - 2016/10/09
### Added
- Armory statistics page

## Changed
- Header to include link to statistics page

## [2.5.0] - 2016/10/08
### Added
- Character embed to frontpage, loaded with random character name endpoint from api `/random/character/`

## [2.4.0] - 2016/10/07
### Added
- Character embed entrypoint
- Character embed markup copy to character portrait

### Changed
- Form cards into a common view component

### Deleted
- Old `Avatar` component

## [2.3.0] - 2016/09/27
### Added
- Pvp gear to character page when pvp mode is enabled

## [2.2.0] - 2016/09/26
### Added
- Pvp gear to character page when pvp mode is enabled
- Pvp toggle button to character page
- Pvp map names to map component

### Changed
- Character page title from `{characterName}` to `{characterName} - {userAlias}`
- Character meta descriptions for SEO purposes

### Fixed
- User pvp seasons from not behaving as expected sometimes

### Removed
- Unused favicon images

## [2.1.0] - 2016/09/26
### Added
- `airbnb-js-shims` so Google will render the site and give gw2armory that sweet sweet SEO

## [2.0.0] - 2016/09/22
### Added
- This CHANGELOG file to allow more insight to the changes made throughout the development of gw2armory.com
