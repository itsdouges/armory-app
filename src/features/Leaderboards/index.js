// @flow

import T from 'i18n-react';

import config from 'config';
import Tabs from 'common/components/Tabs';
import styles from './styles.less';
import PvpLeaderboard from './components/Pvp';

const Leaderboards = () => (
  <div className={styles.root}>
    <Tabs
      titleSuffix={T.translate('leaderboards.name')}
      tabs={[{
        to: '/leaderboards',
        name: 'Pvp (GW2A)',
        content: <PvpLeaderboard />,
        description: config.descriptions.pvpLeaderboard,
      }]}
    />
  </div>
);

export default Leaderboards;
