// @flow

import T from 'i18n-react';

import config from 'config';
import Tabs from 'common/components/Tabs';
import ResponsiveLeaderboard from 'common/components/DisplayAd/ResponsiveLeaderboard';

import styles from './styles.less';
import PvpLeaderboard from './components/Pvp';

type Props = {
  match: {
    url: string,
  },
};

const Leaderboards = ({ match }: Props) => (
  <div className={styles.root}>
    <ResponsiveLeaderboard className={styles.leaderboard} />

    <Tabs
      titleSuffix={`PvP ${T.translate('leaderboards.name')}`}
      basePath={match.url}
      tabs={[{
        path: '',
        name: 'GW2A Ladder',
        content: <PvpLeaderboard region="gw2a" />,
        description: config.descriptions.pvpLeaderboard,
      }, {
        path: '/na',
        name: 'NA Ladder',
        content: <PvpLeaderboard region="na" />,
        description: config.descriptions.pvpLeaderboard,
      }, {
        path: '/eu',
        name: 'EU Ladder',
        content: <PvpLeaderboard region="eu" />,
        description: config.descriptions.pvpLeaderboard,
      }]}
    />
  </div>
);

export default Leaderboards;
