// @flow

import T from 'i18n-react';

import React from 'react';
import config from 'config';
import { connect } from 'react-redux';
import TabsContent from 'common/components/Tabs/Content';
import TabsRow from 'common/components/Tabs/TabsRow';
import HeroHeader from 'common/components/HeroHeader';
import seasonEightBg from 'assets/images/season-eight.jpg';
import LoadingStrip from 'common/components/LoadingStrip';

import styles from './styles.less';
import PvpLeaderboard from './components/Pvp';

type Props = {
  pvpSeasonName: string,
  match: {
    url: string,
  },
};

const buildName = str => str;

const tabs = [
  {
    path: '',
    name: buildName('GW2Armory'),
    content: <PvpLeaderboard region="gw2a" />,
    description: config.descriptions.pvpLeaderboard,
  },
  {
    path: '/na',
    name: buildName('North America'),
    content: <PvpLeaderboard region="na" />,
    description: config.descriptions.pvpLeaderboard,
  },
  {
    path: '/eu',
    name: buildName('Europe'),
    content: <PvpLeaderboard region="eu" />,
    description: config.descriptions.pvpLeaderboard,
  },
];

const tabsProps = {
  tabs,
  titleSuffix: `PvP ${T.translate('leaderboards.name')}`,
};

const mapStateToProps = state => ({
  pvpSeasonName: state.leaderboards.pvp.name,
});

const Leaderboards = ({ match, pvpSeasonName }: Props) => (
  <div className={styles.root}>
    <HeroHeader
      backgroundColor="#57585d"
      backgroundImage={seasonEightBg}
      title={
        <LoadingStrip long appearance="white">
          {pvpSeasonName}
        </LoadingStrip>
      }
    >
      <TabsRow {...tabsProps} basePath={match.url} appearance="transparent" />
    </HeroHeader>

    <TabsContent {...tabsProps} basePath={match.url} />
  </div>
);

export default connect(mapStateToProps)(Leaderboards);
