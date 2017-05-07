// @flow
/* eslint-disable quote-props */
import T from 'i18n-react';

import CustomEmbed from 'embeds/components/Custom';
import RandomCharacter from 'features/Home/components/RandomCharacter';
import Head from 'common/components/Head';
import Tooltip from 'common/components/Tooltip';
import Container from 'common/components/Container';

import styles from './styles.less';

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

// const characterPvePreset = {
//   components: {
//     '00': ['contentCardC'],
//     '10': ['equipment'],
//     '20': ['allSkills'],
//     '30': ['portrait'],
//     '31': ['specializations'],
//   },
//   width: '600px',
//   height: '628px',
//   cells: [2, 4],
//   mode: 'pve',
// };

const EmbedExamples = () => (
  <Container className={styles.root}>
    <Head title="Embeds" />

    <T.p text={{ key: 'embeds.upsell' }} />

    <h2>{T.translate('embeds.custom')} | {T.translate('embeds.characterPvpPreset')}</h2>

    <CustomEmbed
      characterName="Cyberplus"
      {...characterPvpPreset}
    />

    <h2>{T.translate('embeds.characterOriginal')}</h2>

    <RandomCharacter type="random" />

    <Tooltip />
  </Container>
);

export default EmbedExamples;
