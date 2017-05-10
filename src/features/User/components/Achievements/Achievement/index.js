// @flow

import T from 'i18n-react';

import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import colours from 'common/styles/colours';
import Money from 'common/components/Tooltip/Gold';

import styles from './styles.less';

type Props = {
  achievement?: {
    name: string,
    description: string,
    rewards: Array<*>,
    bits?: Array<number>,
    tiers: Array<{
      points: number,
      count: number,
    }>,
  },
  icon: string,
  current: number,
};

const calculateTier = (achievement, current) => {
  if (!achievement) {
    return {};
  }

  return achievement.tiers.filter((tier) => tier.count >= current)[0] || {};
};

const makeRewards = (achievement) => {
  if (!achievement || !achievement.rewards) {
    return [];
  }

  return achievement.rewards.map((reward) => {
    switch (reward.type) {
      case 'Mastery':
        return <Icon key={reward.id} name={`mastery-point-${reward.region.toLowerCase()}.png`} />;

      case 'Coins':
        return <Money coins={reward.count} />;

      case 'Item':
        return 'item';

      case 'Title':
        return 'title';

      default:
        return '';
    }
  });
};

const makeBits = (achievement, userBits = []) => {
  if (!achievement || !achievement.bits) {
    return [];
  }

  return achievement.bits.map((bit, index) => {
    const completed = userBits.includes(index);

    switch (bit.type) {
      case 'Text':
        return `text${completed}`;

      case 'Item':
        return `item${completed}`;

      case 'Minipet':
        return `pet${completed}`;

      case 'Skin':
        return `skin${completed}`;

      default:
        return '';
    }
  });
};

const Achievement = ({ achievement, icon, current, bits }: Props) => {
  const tier = calculateTier(achievement, current);
  const tiers = achievement ? achievement.tiers : [];
  const name = achievement ? achievement.name : '';
  const completed = current === tier.count;

  return (
    <TooltipTrigger data={achievement} type="achievement">
      <Card className={styles.root}>
        <div className={styles.iconContainer}>
          {!completed && (
            <span className={styles.tierStatus}>
              {tiers.indexOf(tier)}/{tiers.length}
            </span>
          )}

          <Icon size="medium" src={icon} />
          {!completed && (
            <ProgressBar
              backgroundColor="transparent"
              barColor={colours.achievementBar}
              max={tier.count}
              current={current}
              className={styles.progress}
              labelClassName={styles.progressLabel}
              vertical
            />
          )}
        </div>

        <div className={styles.content}>
          <div className={styles.name}>{name}</div>

          <div className={styles.pointsContainer}>
            <span className={styles.points}>{tier.points} </span>
            <Icon name="arenanet-points.png" />
            {completed && <span className={styles.completed}>{T.translate('words.completed')}</span>}
          </div>
        </div>

        {makeRewards(achievement)}
        {makeBits(achievement, bits)}
      </Card>
    </TooltipTrigger>
  );
};

Achievement.defaultProps = {
  current: 0,
};

export default Achievement;
