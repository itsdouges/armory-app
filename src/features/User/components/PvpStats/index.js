import styles from './styles.less';
import { PropTypes } from 'react';
import PvpRanking from '../PvpRanking';
import Card from 'common/components/Card';

const PvpStats = ({ stats }) => (
  <div className={styles.root}>
    <PvpRanking rank={stats.pvp_rank} points={stats.pvp_rank_points} />

    <h3>PvP Stats</h3>
    <Card>
      asd
    </Card>
  </div>
);

PvpStats.defaultProps = {
  stats: {
    pvp_rank: 0,
    pvp_rank_points: 0,
  },
};

PvpStats.propTypes = {
  stats: PropTypes.object,
};

export default PvpStats;
