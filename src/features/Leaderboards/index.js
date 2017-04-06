// @flow

import T from 'i18n-react';

import config from 'config';
import Tabs from 'common/components/Tabs';
import styles from './styles.less';
import PvpLeaderboard from './components/Pvp';
import DisplayAd from 'common/components/DisplayAd';

const Leaderboards = () => (
  <div className={styles.root}>
    <DisplayAd className={styles.ad} />

    <Tabs
      titleSuffix={T.translate('leaderboards.name')}
      tabs={[{
        to: '/leaderboards/pvp',
        name: 'PvP (GW2A)',
        content: <PvpLeaderboard region="gw2a" />,
        description: config.descriptions.pvpLeaderboard,
      }, {
        to: '/leaderboards/pvp/na',
        name: 'PvP (NA)',
        content: <PvpLeaderboard region="na" />,
        description: config.descriptions.pvpLeaderboard,
      }, {
        to: '/leaderboards/pvp/eu',
        name: 'PvP (EU)',
        content: <PvpLeaderboard region="eu" />,
        description: config.descriptions.pvpLeaderboard,
      }]}
    />

    <DisplayAd className={styles.ad} />
  </div>
);

export default Leaderboards;
