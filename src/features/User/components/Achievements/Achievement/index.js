// @flow

import T from 'i18n-react';

import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import colours from 'common/styles/colours';
import Money from 'common/components/Tooltip/Gold';
import Gw2Item from 'common/components/Gw2Item';

import styles from './styles.less';

type Tier = {
  points: number,
  count: number,
};

type Props = {
  bits?: Array<number>,
  achievement?: {
    name: string,
    description: string,
    rewards: Array<*>,
    bits: Array<{
      type: string,
      count: number,
      text: string,
      id: number,
    }>,
    // $FlowFixMe
    tiers: Array<Tier>,
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
        return (
          <TooltipTrigger key={reward.id} data={reward.region}>
            <Icon name={`mastery-point-${reward.region.toLowerCase()}.png`} />
          </TooltipTrigger>
        );

      case 'Coins':
        return <Money key="coins" coins={reward.count} />;

      case 'Item':
        return <Gw2Item key={`item-${reward.id}`} id={reward.id} size="32" />;

      // Title not currently supported.
      case 'Title':
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
        return bit.text;

      case 'Item':
        return <Gw2Item id={bit.id} className={!completed && styles.incomplete} size="32" />;

      // Minipet not currently supported.
      // Skin not currently supported.
      case 'Minipet':
      case 'Skin':
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
    <Card className={styles.root}>
      <TooltipTrigger data={achievement} type="achievement">
        <div className={styles.iconContainer}>
          {tiers && !completed && (
            <span className={styles.tierStatus}>
              Tier {tiers.indexOf(tier)} of {tiers.length}
            </span>
          )}

          <Icon size="medium" src={icon} />
          {!completed && (
            <ProgressBar
              backgroundColor="transparent"
              barColor={colours.achievementBar}
              max={tier.count || 0}
              current={current || 0}
              className={styles.progress}
              labelClassName={styles.progressLabel}
              vertical
            />
          )}
        </div>
      </TooltipTrigger>
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
  );
};

Achievement.defaultProps = {
  current: 0,
};

export default Achievement;
