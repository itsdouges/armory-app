// @flow

import ProgressBar from 'common/components/ProgressBar';
import Summary from 'common/layouts/Summary';
import T from 'i18n-react';
import Redacted from 'common/components/Redacted';
import RAID_KILL_ACHIEVEMENTS from './idToNameMap.json';

const TOTAL_KILLS = Object.keys(RAID_KILL_ACHIEVEMENTS).length;

type Props = {
  userAchievements: Object,
  className?: string,
  simple?: boolean,
};

const RaidSummary = ({ userAchievements, className, simple }: Props) => {
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
        />
      }
    />
  );
};

export default RaidSummary;
