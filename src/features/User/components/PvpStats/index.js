import T from 'i18n-react';

import styles from './styles.less';

import ProgressBar from 'common/components/ProgressBar';
import Summary from 'common/layouts/Summary';
import Redacted from 'common/components/Redacted';
import colours from 'common/styles/colours';

function calculateWinLossRatio (stats) {
  if (!stats.wins) {
    return { current: 0, max: 1, winLossRatio: 0 };
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
  const smallLabel = `${wins} ${winsText} | ${losses} ${lossText} | ${byes} ${byesText} | ${desertions} ${deserText}`;
  const redact = winLossRatio === 0;

  return (
    <Summary
      leftIcon={{ name: 'raid.png', size: 'xlarge' }}
      title={<Redacted redact={redact}>{`PvP ${title}`}</Redacted>}
      subTitle={
        <span>
          <ProgressBar
            current={current}
            max={max}
            label={
              <Redacted redact={redact}>
                { // eslint-disable-next-line max-len
                  `${winLossRatio} ${T.translate('users.pvp.winLossAbbreviation')} ${T.translate('words.ratio')}`
                }
              </Redacted>
            }
            barColor={colours._lightgreen}
            backgroundColor={colours._red}
          />
          <span className={styles.small}>
            <Redacted redact={redact}>{smallLabel}</Redacted>
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

export default PvpStats;
