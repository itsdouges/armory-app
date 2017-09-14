# GW2Armory Embeds

Guild Wars 2 Armory is arming the GW2 community with powered up embeds for items, skills, and more. Currently serving over 5.5 million requests a month and growing!

For examples of the embeds go look at the [GW2Armory example page](https://gw2armory.com/embeds).

## Getting Started

First add the embed script to your `<head>`:

```html
<head>
  <script async src="https://gw2armory.com/gw2aEmbeds.js"></script>
</head>
```

Next add embeds to your html response:

```html
<body>
  <div data-armory-embed="skills" data-armory-ids="5507,5508,5510,5515"></div>
</body>
```

Finally when the `DOMContentLoaded` event is triggered the embed script will find all embeds and render them.

### Single Page Application Support

While the embeds don't _officially_ support SPAs, it doesn't mean you can't use the embeds.
You'll want to make sure that you render the markup for the embeds first, and then add the embed script to the head.

An example of this in React could look like:

```javascript
class Gw2ArmorySkills extends React.Component {
  shouldComponentUpdate () {
    // We don't want the embed to be blown away by re-renders.
    return false;
  }

  componentDidMount () {
    const script = document.createElement('script');
    script.src = 'https://gw2armory.com/gw2aEmbeds.js';
    document.body.appendChild(script);
  }

  render () {
    return <div data-armory-embed="skills" data-armory-ids="5507,5508" />;
  }
}
```

In the future we will support SPAs more officially.

## Configuration

### Global Settings

Entirely optional.

Create an object on the document object named `GW2A_EMBED_OPTIONS`. See below for an example.
Make sure the assign this config _before_ declaring the `gw2a` script.

| prop | type | required | description |
|-|-|-|-|
| lang | string | no | The language the embeds will be loaded in. Supported values are: en, fr, de, es, zh, ru |

```javascript
document.GW2A_EMBED_OPTIONS = {
  lang: 'en',
};
```

### Styles

Each embed has a class that you can target, each class follows the pattern `.gw2a-{EMBED_NAME}-embed`.

```css
.gw2a-character-embed {}
.gw2a-skills-embed {}
.gw2a-items-embed {}
.gw2a-amulets-embed {}
.gw2a-traits-embed {}
.gw2a-specializations-embed {}
```

## Embeds

### [Character](https://gw2armory.com/embeds#character)

<img src="https://user-images.githubusercontent.com/6801309/30039207-3fd4819c-9211-11e7-9ddd-62faa3b6bfec.png" width="400" />

Useful for showing off your character on a forum or fansite.

```html
<div
  data-armory-embed="character"
  data-armory-name="Blastrn">
</div>
```

| attribute | value | required | description |
|-|-|-|-|
| data-armory-embed | character | yes | |
| data-armory-name | string | yes | Your character name, case-sensitive. |

### [Skills](https://gw2armory.com/embeds#skills)

<img src="https://user-images.githubusercontent.com/6801309/30039214-7078b6c4-9211-11e7-8d93-b93f870fc032.png" width="400" />

```html
<div
  data-armory-embed="skills"
  data-armory-ids="5507,5508,5510,5515">
</div>

<div
  data-armory-embed="skills"
  data-armory-ids="5508,332211,5510,-1"
  data-armory-size="40"
  data-armory-blank-text="This can be replaced with any text!"
>
</div>
```

| attribute | value | required | description |
|-|-|-|-|
| data-armory-embed | skills | yes | |
| data-armory-ids | numbers delimited by commas | yes | The skill ids you want to load. If you pass `-1` you will load an empty box instead of the skill. |
| data-armory-size | number | no | The size of each skill in the embed. |
| data-armory-blank-text | string | no | When loading an skill of id `-1` you can override the tooltip text to be whatever you want. |
| data-armory-inline-text | string | no | Optional inline text that will be displayed to the right of the icon. You can pass in `wiki` to use a gw2 wiki URL, or pass in any other text that will be used as the link. |

### [Items](https://gw2armory.com/embeds#items)

<img src="https://user-images.githubusercontent.com/6801309/30039226-84ce7dc0-9211-11e7-9df7-693fb8921300.png" width="400" />

```html
<div
  data-armory-embed="items"
  data-armory-blank-text="Some other text can go here!"
  data-armory-size="60"
  data-armory-ids="24836,-1,74412,46774,39620"
>
</div>

<div
  data-armory-embed="items"
  data-armory-ids="77482"
  data-armory-77482-stat="656"
>
</div>
```

| attribute | value | required | description |
|-|-|-|-|
| data-armory-embed | items | yes | |
| data-armory-ids | numbers delimited by commas | yes | The item ids you want to load. If you pass `-1` you will load an empty box instead of the item. |
| data-armory-size | number | no | The size of each item in the embed. |
| data-armory-blank-text | string | no | When loading an item of id `-1` you can override the tooltip text to be whatever you want. |
| data-armory-{ITEM_ID}-stat | number | no | Loads the item with the stat of choice. |
| data-armory-{ITEM_ID}-skin | number | no | Loads the item with the skin of choice. |
| data-armory-inline-text | string | no | Optional inline text that will be displayed to the right of the icon. You can pass in `wiki` to use a gw2 wiki URL, `gw2spidy` to use a gw2spidy URL, or pass in any other text that will be used as the link. |

### [Specializations](https://gw2armory.com/embeds#specializations)

<img src="https://user-images.githubusercontent.com/6801309/30039237-9ba20c1a-9211-11e7-8e57-8b2efffe5304.png" width="400" />

```html
<div
  data-armory-embed="specializations"
  data-armory-ids="3,332211"
  data-armory-3-traits="1761,1774,1749"
>
</div>
```

| attribute | value | required | description |
|-|-|-|-|
| data-armory-embed | specializations | yes | |
| data-armory-ids | numbers delimited by commas | yes | The specialization ids you want to load. |
| data-armory-{SPEC_ID}-traits | numbers delimited by commas | no | Traits you want to select for the specialization. Entirely optional, you can select any combination. |

### [Traits](https://gw2armory.com/embeds#traits)

<img src="https://user-images.githubusercontent.com/6801309/30039240-abca384c-9211-11e7-8f04-f90127747c8b.png" width="400" />

```html
<div
  data-armory-embed="traits"
  data-armory-ids="820,-1,1694"
  data-armory-blank-text="This could be anything you want!"
>
</div>
```

| attribute | value | required | description |
|-|-|-|-|
| data-armory-embed | traits | yes | |
| data-armory-ids | numbers delimited by commas | yes | The trait ids you want to load. If you pass `-1` you will load an empty box instead of the trait. |
| data-armory-size | number | no | The size of each trait in the embed. |
| data-armory-blank-text | string | no | When loading an trait of id `-1` you can override the tooltip text to be whatever you want. |
| data-armory-inline-text | string | no | Optional inline text that will be displayed to the right of the icon. You can pass in `wiki` to use a gw2 wiki URL, or pass in any other text that will be used as the link. |

### [Amulets](https://gw2armory.com/embeds#amulets)

<img src="https://user-images.githubusercontent.com/6801309/30039246-bb506ffc-9211-11e7-981e-1fa5d62342a7.png" width="400" />

```html
<div
  data-armory-embed="amulets"
  data-armory-ids="332211,-1"
  data-armory-size="30"
  data-armory-blank-text="This is a blank space!"
>
</div>

```

| attribute | value | required | description |
|-|-|-|-|
| data-armory-embed | amulets | yes | |
| data-armory-ids | numbers delimited by commas | yes | The amulet ids you want to load. If you pass `-1` you will load an empty box instead of the amulet. |
| data-armory-size | number | no | The size of each amulet in the embed. |
| data-armory-blank-text | string | no | When loading an amulet of id `-1` you can override the tooltip text to be whatever you want. |
| data-armory-inline-text | string | no | Optional inline text that will be displayed to the right of the icon. You can pass in `wiki` to use a gw2 wiki URL, or pass in any other text that will be used as the link. |

## Finding IDs

Unfortunately you can't pass the embeds the item/skill etc names. You have to pass the specific ids.

### Item IDs

Item IDs are easy enough, go look at https://www.gw2spidy.com.

### Skill/Trait/Specialization IDs

Best bet is to look at the GW2 Wiki, for example: https://wiki.guildwars2.com/wiki/Virtue_of_Justice.

## Who Is Using GW2AEmbeds?

- [MetaBattle](https://metabattle.com)
- [Quantify](https://qtfy.eu)
- [Le Bus Magique](http://www.lebusmagique.fr)
- [mists.co](http://mists.co)
- [Lucky Noobs](https://lucky-noobs.com)
- [Discretize](http://discretize.eu)
- [Abaddons Maul](https://abaddons-maul.de)
- [Chains of the Kraken](https://ctk.enjin.com)
- [Snow Crows](http://snowcrows.com)

[Don't see your site? Add it in a Pull Request!](https://github.com/madou/armory-react/pulls)

## Troubleshooting

Hit [@itsmadou](https://twitter.com/itsmadou) up on twitter, or [post an issue](https://github.com/madou/armory-react/issues) if you think something is a bug.
