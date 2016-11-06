import { PropTypes } from 'react';

import ProgressBar from 'common/components/ProgressBar';
import Summary from 'common/layouts/Summary';
import T from 'i18n-react';
import Redacted from 'common/components/Redacted';

const RAID_KILL_ACHIEVEMENTS = {
  2654: 'Vg', // Vale Guardian
  2667: 'Gors', // Gorseval
  2659: 'Sab',  // Sabetha
  2826: 'Cm', // Cave Monster
  3017: 'Xr', // Xera
  3014: 'Kc', // Keep Construct
  2836: 'Mt', // Matthias
};

const TOTAL_KILLS = Object.keys(RAID_KILL_ACHIEVEMENTS).length;

const RaidSummary = ({ userAchievements, className, simple }) => {
  const redact = !userAchievements.length;
  const achievements = userAchievements.filter(
    ({ id, done }) => RAID_KILL_ACHIEVEMENTS[id] && done
  );

  const raidKills = `${T.translate('accSummary.raidBossKills')} ${achievements.map(({ id }) =>
    `[${RAID_KILL_ACHIEVEMENTS[id]}]`).join('')}`;

  if (simple) {
    return <span>{raidKills}</span>;
  }

  return (
    <Summary
      className={className}
      leftIcon={{ name: 'raid.png', size: 'xlarge' }}
      title={<Redacted redact={redact}>{raidKills}</Redacted>}
      subTitle={
        <ProgressBar
          current={achievements.length}
          max={TOTAL_KILLS}
          backgroundColor="rgb(41, 41, 41)"
          barColor="rgb(85, 35, 164)"
        />
      }
    />
  );
};

RaidSummary.propTypes = {
  className: PropTypes.string,
  achievements: PropTypes.object,
  userAchievements: PropTypes.array,
  simple: PropTypes.bool,
};

export default RaidSummary;
