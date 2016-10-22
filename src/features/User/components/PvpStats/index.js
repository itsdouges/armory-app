import { PropTypes } from 'react';
import T from 'i18n-react';

import styles from './styles.less';
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
      <h3>{T.translate('users.pvpStats.name')}</h3>
      <Card className={styles.card}>
        <div className={styles.unrankedContainer}>
          <h4><Redacted redact={redact}>{T.translate('users.pvpStats.unranked')}</Redacted></h4>

          <div className={styles.win}>
            <div className={styles.bigWin}>
              <Redacted redact={redact}><strong>{unrankedWlRatio}</strong> W/L Ratio</Redacted>
            </div>

            <Redacted redact={redact}>
              {unranked.wins || 0} {T.translate('users.pvpStats.wins')}
            </Redacted>

            <div>
              <Redacted redact={redact}>
                {unranked.byes || 0} {T.translate('users.pvpStats.byes')}
              </Redacted>
            </div>
          </div>
          <div className={styles.lose}>
            <div>
              <Redacted redact={redact}>
                {unranked.losses || 0} {T.translate('users.pvpStats.losses')}
              </Redacted>
            </div>
            <div>
              <Redacted redact={redact}>
                {unranked.desertions || 0} {T.translate('users.pvpStats.desertions')}
              </Redacted>
            </div>
          </div>
        </div>
        <div className={styles.rankedContainer}>
          <h4><Redacted redact={redact}>{T.translate('users.pvpStats.ranked')}</Redacted></h4>

          <div className={styles.win}>
            <div className={styles.bigWin}>
              <Redacted redact={redact}><strong>{rankedWlRatio}</strong> W/L Ratio</Redacted>
            </div>

            <Redacted redact={redact}>
              {ranked.wins || 0} {T.translate('users.pvpStats.wins')}
            </Redacted>

            <div>
              <Redacted redact={redact}>
                {ranked.byes || 0} {T.translate('users.pvpStats.byes')}
              </Redacted>
            </div>
          </div>
          <div className={styles.lose}>
            <div>
              <Redacted redact={redact}>
                {ranked.losses || 0} {T.translate('users.pvpStats.losses')}
              </Redacted>
            </div>

            <div>
              <Redacted redact={redact}>
                {ranked.forfeits || 0} {T.translate('users.pvpStats.forfeits')}
              </Redacted>
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
