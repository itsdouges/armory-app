// @flow

export default [{
  title: 'Character',
  options: [
    'data-armory-name="{CHARACTER_NAME}"',
  ],
  html: `
<div
  data-armory-embed="character"
  data-armory-name="Blastrn"
>
</div>
  `,
}, {
  title: 'Skills',
  options: [
    'data-armory-ids="{IDS_COMMA_SEPARATED}" | use id:-1 for blank skills',
    'data-armory-size="{NUMBER}" (optional)',
    'data-armory-blank-text="{STRING}" (optional, if missing, "optional" is used in its place)',
  ],
  html: `
<div
  data-armory-embed="skills"
  data-armory-ids="5507,5508,5510,5515"
>
</div>

<div
  data-armory-embed="skills"
  data-armory-ids="5508,332211,5510,-1"
  data-armory-size="40"
  data-armory-blank-text="This can be replaced with any text!"
>
</div>

<div
  data-armory-embed="skills"
  data-armory-ids="5516,5517,30662,5542"
>
</div>
  `,
}, {
  title: 'Items',
  options: [
    'data-armory-ids="{IDS_COMMA_SEPARATED}" | use id:-1 for blank skills',
    'data-armory-{ITEM_ID}-stat="{ITEMSTAT_ID}" (optional)',
    'data-armory-size="{NUMBER}" (optional)',
    'data-armory-blank-text="{STRING}" (optional, if missing, "optional" is used in its place)',
  ],
  html: `
<div
  data-armory-embed="items"
  data-armory-ids="7139,74847,332211,993,109"
>
</div>

<div
  data-armory-embed="items"
  data-armory-blank-text="Some other text can go here!"
  data-armory-size="60"
  data-armory-ids="24836,-1,74412,46774,39620"
>
</div>

<div
  data-armory-embed="items"
  data-armory-ids="77482,79712,79444,80241,80434"
  data-armory-77482-stat="656"
  data-armory-79444-stat="591"
  data-armory-79712-stat="1153"
  data-armory-80241-stat="588"
  data-armory-80434-stat="1153"
>
</div>
  `,
}, {
  title: 'Amulets',
  options: [
    'data-armory-ids="{IDS_COMMA_SEPARATED}" | use id:-1 for blank skills',
    'data-armory-size="{NUMBER}" (optional)',
    'data-armory-blank-text="{STRING}" (optional, if missing, "optional" is used in its place)',
  ],
  html: `
<div
  data-armory-embed="amulets"
  data-armory-ids="10,12"
  data-armory-blank-text="This is a blank space!"
>
</div>

<div
  data-armory-embed="amulets"
  data-armory-ids="332211,-1"
  data-armory-size="30"
  data-armory-blank-text="This is a blank space!"
>
</div>

<div
  data-armory-embed="amulets"
  data-armory-ids="13,14"
>
</div>
  `,
}, {
  title: 'Traits',
  options: [
    'data-armory-ids="{IDS_COMMA_SEPARATED}" | use id:-1 for blank skills',
    'data-armory-size="{NUMBER}" (optional)',
    'data-armory-blank-text="{STRING}" (optional, if missing, "optional" is used in its place)',
  ],
  html: `
<div
  data-armory-embed="traits"
  data-armory-ids="700,1960,1950"
>
</div>

<div
  data-armory-embed="traits"
  data-armory-ids="820,-1,1694"
  data-armory-blank-text="This could be anything you want!"
>
</div>

<div
  data-armory-embed="traits"
  data-armory-size="30"
  data-armory-ids="1471,22331122,1711"
>
</div>

<div
  data-armory-embed="traits"
  data-armory-ids="577,578,1686"
>
</div>
  `,
}, {
  title: 'Specializations',
  options: [
    'data-armory-ids="{IDS_COMMA_SEPARATED}" | use id:-1 for blank skills',
    'data-armory-{SPECIALIZATION_ID}="{TRAIT_IDS_COMMA_SEPARATED}" | Not mandatory, you can leave traits out if you want, either all three or individual ones.',
  ],
  html: `
<div
  data-armory-embed="specializations"
  data-armory-ids="1,2"
  data-armory-1-traits="700,1960,1950"
  data-armory-2-traits="820,858,1694"
>
</div>

<div
  data-armory-embed="specializations"
  data-armory-ids="3,332211"
  data-armory-3-traits="1761,1774,1749"
>
</div>

<div
  data-armory-embed="specializations"
  data-armory-ids="39,11"
  data-armory-39-traits="815,801"
  data-armory-11-traits="1471,1482,1711"
>
</div>

<div
  data-armory-embed="specializations"
  data-armory-ids="16,18"
  data-armory-16-traits="577,578,1686"
  data-armory-18-traits="2049,2011,1928"
>
</div>
  `,
}].map((res) => ({
  ...res,
  html: res.html.trim(),
}));
