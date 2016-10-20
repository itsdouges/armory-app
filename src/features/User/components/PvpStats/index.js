import styles from './styles.less';
import { PropTypes } from 'react';
import Card from 'common/components/Card';
import Redacted from 'common/components/Redacted';

function calculateWinLossRatio (stats) {
  if (!stats.wins) {
    return 0;
  }

  const totalGames = stats.wins + stats.losses + stats.desertions + stats.byes;
  const winRatio = ((stats.wins + stats.byes) / totalGames) * 100;
  const lossRatio = ((stats.losses + stats.desertions) / totalGames) * 100;
  const wlRatio = (winRatio / lossRatio).toFixed(2);

  return wlRatio;
}

const PvpStats = ({ stats }) => {
  const { unranked = {}, ranked = {} } = stats.ladders || {};
  const redact = !unranked.wins || !ranked.wins;

  const unrankedWlRatio = calculateWinLossRatio(unranked);
  const rankedWlRatio = calculateWinLossRatio(ranked);

  return (
    <div className={styles.root}>
      <h3>Pvp Stats</h3>
      <Card className={styles.card}>
        <div className={styles.unrankedContainer}>
          <h4><Redacted redact={redact}>Unranked</Redacted></h4>

          <div className={styles.win}>
            <div className={styles.bigWin}>
              <Redacted redact={redact}><strong>{unrankedWlRatio}</strong> W/L Ratio</Redacted>
            </div>

            <Redacted redact={redact}>{unranked.wins || 0} Wins</Redacted>

            <div>
              <Redacted redact={redact}>{unranked.byes || 0} Byes</Redacted>
            </div>
          </div>
          <div className={styles.lose}>
            <div>
              <Redacted redact={redact}>{unranked.losses || 0} Losses</Redacted>
            </div>
            <div>
              <Redacted redact={redact}>{unranked.desertions || 0} Desertions</Redacted>
            </div>
          </div>
        </div>
        <div className={styles.rankedContainer}>
          <h4><Redacted redact={redact}>Ranked</Redacted></h4>

          <div className={styles.win}>
            <div className={styles.bigWin}>
              <Redacted redact={redact}><strong>{rankedWlRatio}</strong> W/L Ratio</Redacted>
            </div>

            <Redacted redact={redact}>{ranked.wins || 0} Wins</Redacted>

            <div>
              <Redacted redact={redact}>{ranked.byes || 0} Byes</Redacted>
            </div>
          </div>
          <div className={styles.lose}>
            <div>
              <Redacted redact={redact}>{ranked.losses || 0} Losses</Redacted>
            </div>
            <div>
              <Redacted redact={redact}>{ranked.forfeits || 0} Forfeits</Redacted>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

PvpStats.defaultProps = {
  stats: {
    pvp_rank: 0,
    pvp_rank_points: 0,
    pvp_rank_rollovers: 0,
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
