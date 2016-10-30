import { PropTypes } from 'react';
import T from 'i18n-react';

import styles from './styles.less';

import ProgressBar from 'common/components/ProgressBar';
import Icon from 'common/components/Icon';
import Summary from 'common/layouts/Summary';

function calculateWinLossRatio (stats) {
  if (!stats.wins) {
    return { current: 0, max: 0, winLossRation: 0 };
  }

  const totalGames = stats.wins + stats.losses + stats.desertions + stats.byes;
  const winRatio = ((stats.wins + stats.byes) / totalGames) * 100;
  const lossRatio = ((stats.losses + stats.desertions) / totalGames) * 100;
  const wlRatio = (winRatio / lossRatio).toFixed(2);

  return {
    current: stats.wins + stats.byes,
    max: totalGames,
    winLossRatio: wlRatio,
  };
}

const PvpStats = ({ stats, title }) => {
  const { current, max, winLossRatio } = calculateWinLossRatio(stats);
  const { wins, losses, byes, desertions } = stats;

  const winsText = T.translate('users.pvpStats.wins');
  const byesText = T.translate('users.pvpStats.byes');
  const lossText = T.translate('users.pvpStats.losses');
  const deserText = T.translate('users.pvpStats.desertions');

  // eslint-disable-next-line max-len
  const smallLabel = `${wins} ${winsText} | ${byes} ${byesText} | ${losses} ${lossText} | ${desertions} ${deserText}`;

  return (
    <Summary
      leftIcon={<Icon name="raid.png" size="xlarge" />}
      title={`PvP ${title}`}
      subTitle={
        <span>
          <ProgressBar
            current={current}
            max={max}
            label={`${winLossRatio} WL Ratio`}
            barColor="#4CAF50"
            backgroundColor="#F44336"
          />
          <span className={styles.small}>
            {smallLabel}
          </span>
        </span>
      }
    />
  );
};

PvpStats.defaultProps = {
  stats: {
    wins: 0,
    losses: 0,
    byes: 0,
    desertions: 0,
  },
};

PvpStats.propTypes = {
  title: PropTypes.string,
  stats: PropTypes.object,
};

export default PvpStats;
