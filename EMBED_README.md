# GW2Armory Embeds

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

### Character

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

### Skills

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

### Items

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

### Specializations

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

### Traits

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

### Amulets

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
