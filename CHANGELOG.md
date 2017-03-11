# Change Log

## Log structure

```
## [Unreleased|major.minor.patch] - yyyy/mm/dd
### Added|Changed|Fixed|Removed
- Changes
```
## [4.3.1] - 2017/03/12
### Fixed
- Tooltip: limit skills on traits to show only first skill

## [4.3.0] - 2017/03/11
### Added
- Ability to turn off embed badge
- Classes for consumers of embeds to use to override styles

### Changed
- Armory badge for tooltip to have dark background

## [4.2.1] - 2017/03/09
### Fixed
- i18n being set with `'undefined'`

## [4.2.0] - 2017/03/08
### Added
- i18n support for embeds

## [4.1.3] - 2017/03/08
### Changed
- Pvp leaderboard description

## [4.1.2] - 2017/03/08
### Fixed
- Fact Tooltip: Showing extraneous infusion buffs
- Fact Tooltip: Critical damage/healing power being used
- Fact Tooltip: Defaults to `data.text` for AttributeAdjust facts

## [4.1.1] - 2017/03/07
### Fixed
- Search icon from not being centered

## [4.1.0] - 2017/03/07
### Changed
- Embed example page to be more informative
- Readme to be a little friendlier

### Added
- Embeds link to header

### Fixed
- Tooltip fact spacing
- Tooltip descriptions not being parsed via gw2 parser
- Tooltip damage not being rounded

## [4.0.0] - 2017/03/05
### Added
- `details.description` to item tooltip
- `details.infix_upgrade.buff.description` to item tooltip
- New embed system (breaking change). See: `/embeds/example/index.html` for a working example. The new system works like the following:

Add divs where you want embeds:
```
<div
  data-armory-embed="specializations"
  data-armory-ids="1,2,3"
  data-armory-1-traits="700,1960,1950"
  data-armory-2-traits="820,858,1694"
  data-armory-3-traits="1761,1774,1749"
>
</div>

<div
  data-armory-embed="skills"
  data-armory-ids="1175,5491"
>
</div>

<div
  data-armory-embed="items"
  data-armory-ids="1,2,109"
>
</div>

<div
  data-armory-embed="character"
  data-armory-name="Blastrn"
>
</div>
```

Drop embed script onto your website:
```
<script async scr="https://gw2armory.com/gw2aEmbeds.js" />
```

At a later date a embed generator page will be made to help with the creation of embeds for your sites, for now you have to do everything manually-ish. Currently only `character`, `items`, `skills`, and `specializations` embeds are supported.

## Removed
- Old embed iframe system

## Changed
- Character page embed content to use new system
- Open Sans font to be bundled instead of loaded through Google Fonts

## Fixed
- Tooltip Fix - add bonus to runes
- Tooltip Fix - show buffs only for upgrade components
- Tooltip Fix - fix attribute adjust parsing
- Tooltip Fix - add apply count badge to conditions
- Tooltip Fix - add simple formula to Damage
- Tooltip Fix - add mapping to attributes

## [3.18.0] - 26/02/17
### Changed
- Header/introduction containers to have a background color
- Search bar button to have a background color

### Added
- Import variables from less with `less-vars-loader`
- New links to the footer

## [3.17.0] - 25/02/17
### Added
- Wins/losses from `/users/{alias}` to user page

## [3.16.0] - 25/02/17
### Added
- Wins/losses to leaderboards

### Fixed
- Healthcheck message spelling mistake

## [3.15.0] - 09/02/17
### Added
- Rating change for pvp matches
- New raid boss achievements to raid component

## [3.14.4] - 03/02/17
### Changed
- Travis ci config to use yarn through offical means

## [3.14.3] - 31/01/17
### Fixed
- Tabs _again_ to not break when unicode characters are being used #morningbugfixes

## [3.14.2] - 31/01/17
### Fixed
- Tabs not working where unicode characters are being used

## [3.14.1] - 31/01/17
### Fixed
- User pvp ranking from not having Dragon ranking

## [3.14.0] - 30/01/17
### Added
- Na/eu leaderboards
- Claiming call to action for placeholder users
- Eu/na rank to user pages

## Changed
- User rating to be sourced from main `user/{alias}` resource and then be overriden if found in `user/{alias}/pvp/standings`

## Removed
- Guild members api call
- New flairs from some tabs

## [3.13.2] - 2017/01/21
### Changed
- Upgraded dependencies
- Fixes lint errors
- Fixes flow errors

## [3.13.1] - 2017/01/14
### Fixed
- Ads breaking the site, lol

## [3.13.0] - 2017/01/14
### Added
- Display ads (disabled for now)
- Donation link to footer
- Affiliate ads for guild wars 2

### Changed
- Gw2a leaderboard api uri

### Fixed
- Gw2aRank on user page display

### Removed
- Trello link in footer

## [3.12.1] - 2017/01/10
### Added
- Conversion tracking to settings page

## [3.12.0] - 2017/01/10
### Added
- Open search configuration

## [3.11.3] - 2017/01/09
### Changed
- Gw2a pvp leaderboard to have `Gw2a` in the page title and tab

## [3.11.2] - 2017/01/08
### Fixed
- Languages to have basic english text if not found

## [3.11.1] - 2017/01/07
### Fixed
- User page from throwing when pvp season info wasn't available
- Responsive menu to be correctly aligned in Firefox

## [3.11.0] - 2017/01/07
### Added
- User ranking strip
- Current pvp season leaderboard for gw2a
- Layout prop to Tab component

### Changed
- Content card (big) styles
- Search bar icon to the right
- Search bar to be bigger
- How the header link generation works
- Copyright year

### Fixed
- Front page from not working if users auth became invalid

## [3.10.2] - 2017/01/04
### Removed
- Snow storm dependency

## [3.10.1] - 2017/01/04
### Removed
- Christmas cheer

## [3.10.0] - 2016/12/29
### Added
- "New" flair to guilds tab on user page

## [3.9.0] - 2016/12/29
### Changed
- Guild users page name to members

### Added
- Gw2 members to guild new members page

## [3.8.0] - 2016/12/27
### Added
- Guild logs page

### Fixed
- Z position of social buttons
- Guild overview nulls and undefineds

## [3.7.1] - 2016/12/26
### Fixed
- Christmas cheer hiding response menu text

## [3.7.0] - 2016/12/25
### Added
- Christmas cheer

## [3.6.1] - 2016/12/21
### Fixed
- User page from not displaying overview

## [3.6.0] - 2016/12/21
### Added
- Motd into i18n texts
- New decoration to guild overview tab

### Changed
- Guild overview page to look nicer on mobile viewports

## [3.5.0] - 2016/12/20
### Added
- Call to action for claiming guilds on guild page
- Adds guild overview page

## [3.4.1] - 2016/12/09
### Changed
- French translations

## [3.4.0] - 2016/12/08
### Added
- Users to guild page

### Changed
- Sets users to be default tab on guild page
- User access icon to a nicer location

## [3.3.0] - 2016/12/08
### Added
- User access to user content card on user page
- User guilds to user page

### Changed
- User account name to be more appropriate when unavailable
- Sign up button margins
- Buttons border width to 2px

## [3.2.1] - 2016/12/02
### Fixed
- Gw2 map component from linking to wiki BETA map that doesn't exist

## [3.2.0] - 2016/12/01
### Added
- New select list component

### Changed
- Join link on header to be more prominent
- Language picker to use a select list
- Small search bar to be slightly bigger

## [3.1.0] - 2016/11/30
### Changed
- Header, extracted sticky header component out in anticipation for creating a standalone module
- Character portrait and items to be slightly smalelr
- Extract user page into three sub pages, overview, characters, and recent matches
- Edit button on character page to be slightly nicer looking

### Added
- Tabs to user and guild pages

## [3.0.0] - 2016/11/22
### Added
- Customisable armory embed
- Page title to character embed
- Embed details page (but is currently disabled)

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

### Removed
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
