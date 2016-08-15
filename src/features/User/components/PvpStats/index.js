import styles from './styles.less';
import { PropTypes } from 'react';
import PvpRanking from '../PvpRanking';
import Card from 'common/components/Card';

const PvpStats = ({ stats }) => (
  <div className={styles.root}>
    <PvpRanking rank={stats.pvp_rank} points={stats.pvp_rank_points} />

    <h3>PvP Stats</h3>
    <Card className={styles.card}>
      <div className={styles.unrankedContainer}>
        Unranked

        <div className={styles.win}>
          <div className={styles.bigWin}>
            {stats.ladders.unranked.wins || 0} Wins
          </div>

          <div>
            {stats.ladders.unranked.byes || 0} Byes
          </div>
        </div>
        <div className={styles.lose}>
          <div>
            {stats.ladders.unranked.losses || 0} Losses
          </div>

          <div>
            {stats.ladders.unranked.forfeits || 0} Forfeits
          </div>
          <div>
            {stats.ladders.unranked.desertions || 0} Desertions
          </div>
        </div>
      </div>
      <div className={styles.rankedContainer}>
        Ranked

        <div className={styles.win}>
          <div className={styles.bigWin}>
            {stats.ladders.ranked.wins || 0} Wins
          </div>

          <div>
            {stats.ladders.ranked.byes || 0} Byes
          </div>
        </div>
        <div className={styles.lose}>
          <div>
            {stats.ladders.ranked.losses || 0} Losses
          </div>
          <div>
            {stats.ladders.ranked.forfeits || 0} Forfeits
          </div>
          <div>
            {stats.ladders.ranked.desertions || 0} Desertions
          </div>
        </div>
      </div>
    </Card>
  </div>
);

PvpStats.defaultProps = {
  stats: {
    pvp_rank: 0,
    pvp_rank_points: 0,
    ladders: {
      ranked: {},
      unranked: {},
    },
  },
};

PvpStats.propTypes = {
  stats: PropTypes.object,
};

export default PvpStats;
