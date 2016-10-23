import { PropTypes } from 'react';

import ProgressBar from 'common/components/ProgressBar';
import Icon from 'common/components/Icon';
import Summary from 'common/layouts/Summary';

const RAID_KILL_ACHIEVEMENTS = {
  2654: 'Sv',
  2667: 'Gors',
  2659: 'Sab',
  2826: 'Cm',
  3017: 'Xr',
  3014: 'Kc',
};

const TOTAL_KILLS = Object.keys(RAID_KILL_ACHIEVEMENTS).length;

const RaidSummary = ({ userAchievements, className }) => {
  const achievements = userAchievements.filter(
    ({ id, done }) => RAID_KILL_ACHIEVEMENTS[id] && done
  );

  return (
    <Summary
      className={className}
      leftIcon={<Icon name="raid.png" size="xlarge" />}
      title={
        `Raid Kills ${achievements.map(({ id }) => `[${RAID_KILL_ACHIEVEMENTS[id]}]`).join('')}`
      }
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
};

export default RaidSummary;
