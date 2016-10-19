# Change Log

## Log structure

```
## [Unreleased|major.minor.patch] - yyyy/mm/dd
### Added|Changed|Fixed|Removed
- Changes
```

## [2.8.1] - 2016/10/20
### Changed
- Character attribute calculation.
- Health check endpoint.

## [2.8.0] - 2016/10/19
### Added
- Random guilds on front page

### Changed
- Front page ui design
- Fixed header design

## [2.7.0] - 2016/10/13
### Added
- Character hiding feature, you can find this by clicking the edit button on any character you own.

## [2.6.0] - 2016/10/09
### Added
- Armory statistics page.

## Changed
- Header to include link to statistics page.

## [2.5.0] - 2016/10/08
### Added
- Character embed to frontpage, loaded with random character name endpoint from api `/random/character/`.

## [2.4.0] - 2016/10/07
### Added
- Character embed entrypoint.
- Character embed markup copy to character portrait.

### Changed
- Form cards into a common view component.

### Deleted
- Old `Avatar` component.

## [2.3.0] - 2016/09/27
### Added
- Pvp gear to character page when pvp mode is enabled.

## [2.2.0] - 2016/09/26
### Added
- Pvp gear to character page when pvp mode is enabled.
- Pvp toggle button to character page.
- Pvp map names to map component.

### Changed
- Character page title from `{characterName}` to `{characterName} - {userAlias}`.
- Character meta descriptions for SEO purposes.

### Fixed
- User pvp seasons from not behaving as expected sometimes.

### Removed
- Unused favicon images.

## [2.1.0] - 2016/09/26
### Added
- `airbnb-js-shims` so Google will render the site and give gw2armory that sweet sweet SEO.

## [2.0.0] - 2016/09/22
### Added
- This CHANGELOG file to allow more insight to the changes made throughout the development of gw2armory.com.
