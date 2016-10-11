# Change Log

## Log structure

```
## [Unreleased|major.minor.patch] - yyyy/mm/dd
### Added|Changed|Fixed|Removed
- Changes
```

## [2.7.0] - 2016/12/09
### Added
- Character hiding feature, you can find this by clicking the edit button on any character you own.

## [2.6.0] - 2016/10/09
### Added
- Armory statistics page.

## Changed
- Header to include link to statistics page.

## [2.5.0] - 2016/10/08
### Added
- Adds character embed to frontpage, loaded with random character name endpoint from api `/random/character/`.

## [2.4.0] - 2016/10/07
### Added
- Adds character embed entrypoint.
- Adds character embed markup copy to character portrait.

### Changed
- Refactored form cards into a common view component.

### Deleted
- Removed old `Avatar` component.

## [2.3.0] - 2016/09/27
### Added
- Adds pvp gear to character page when pvp mode is enabled.

## [2.2.0] - 2016/09/26
### Added
- Adds pvp gear to character page when pvp mode is enabled.
- Adds pvp toggle button to character page.
- Adds pvp map names to map component.

### Changed
- Character page title from `{characterName}` to `{characterName} - {userAlias}`.
- Character meta descriptions for SEO purposes.

### Fixed
- Fixes user pvp seasons from not behaving as expected sometimes.

### Removed
- Removes unused favicon images.

## [2.1.0] - 2016/09/26
### Added
- Adds `airbnb-js-shims` so Google will render the site and give gw2armory that sweet sweet SEO.

## [2.0.0] - 2016/09/22
### Added
- This CHANGELOG file to allow more insight to the changes made throughout the development of gw2armory.com.
