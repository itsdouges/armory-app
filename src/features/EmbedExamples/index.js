// @flow
/* eslint-disable quote-props */
import T from 'i18n-react';

import CustomEmbed from 'embeds/components/Custom';
import RandomCharacter from 'features/Home/components/RandomCharacter';
import Head from 'common/components/Head';
import Tooltip from 'common/components/Tooltip';

const characterPvpPreset = {
  components: {
    '00': ['contentCardC'],
    '10': ['pvpEquipment'],
    '20': ['allSkills'],
    '30': ['portrait'],
    '31': ['specializations'],
  },
  width: '600px',
  height: '628px',
  cells: [2, 4],
  mode: 'pvp',
};

const characterPvePreset = {
  components: {
    '00': ['contentCardC'],
    '10': ['equipment'],
    '20': ['allSkills'],
    '30': ['portrait'],
    '31': ['specializations'],
  },
  width: '600px',
  height: '628px',
  cells: [2, 4],
  mode: 'pve',
};

const EmbedExamples = () => (
  <div>
    <Head title="Embeds" />

    <T.p text={{ key: 'embeds.upsell' }} />

    <h2>{T.translate('embeds.characterCustom')}</h2>

    <h3>{T.translate('embeds.characterPvpPreset')}</h3>

    <CustomEmbed
      characterName="Cyberplus"
      {...characterPvpPreset}
    />

    <h3>{T.translate('embeds.characterPvePreset')}</h3>

    <CustomEmbed
      characterName="Cyberplus"
      {...characterPvePreset}
    />

    <h2>{T.translate('embeds.characterOriginal')}</h2>

    <RandomCharacter />

    <Tooltip />
  </div>
);

export default EmbedExamples;
