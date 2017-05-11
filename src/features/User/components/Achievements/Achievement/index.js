// @flow

import T from 'i18n-react';

import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import colours from 'common/styles/colours';
import Money from 'common/components/Tooltip/Gold';
import Gw2Item from 'common/components/Gw2Item';
import Gw2Title from 'common/components/Gw2Title';

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
          <TooltipTrigger key={reward.id} data={`${reward.region} ${T.translate('words.masteryPoint')}`}>
            <Icon name={`mastery-point-${reward.region.toLowerCase()}.png`} />
          </TooltipTrigger>
        );

      case 'Coins':
        return (
          <TooltipTrigger key="coins" data={`${reward.count} ${T.translate('words.coins')}`}>
            <Money coins={reward.count} />
          </TooltipTrigger>
        );

      case 'Item':
        return <Gw2Item key={`item-${reward.id}`} id={reward.id} size="32" />;

      case 'Title':
        return <Gw2Title key={`item-${reward.id}`} id={reward.id} />;

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
  const name = achievement ? achievement.name : '';
  const completed = current === tier.count;

  return (
    <Card className={styles.root}>
      <TooltipTrigger data={{ ...achievement, current, userBits: bits }} type="achievement">
        <div className={styles.achievementContainer}>
          <div className={styles.iconContainer}>
            <Icon size="medium" src={icon} />

            <ProgressBar
              backgroundColor="transparent"
              barColor={colours.achievementBar}
              max={tier.count || 0}
              current={current || 0}
              className={styles.progress}
              labelClassName={styles.progressLabel}
              label={completed ? T.translate('words.completed') : ''}
              vertical
            />
          </div>

          <div className={styles.content}>
            <div className={styles.name}>{name}</div>
          </div>
        </div>
      </TooltipTrigger>

      <div className={styles.rewards}>
        {!!tier.points && (
          <TooltipTrigger data={T.translate('achievements.pointsThisTier')}>
            <div className={styles.pointsContainer}>
              <span className={styles.points}>{tier.points} </span>
              <Icon sizePx={32} name="arenanet-points.png" />
            </div>
          </TooltipTrigger>
        )}

        {makeRewards(achievement)}
      </div>

      {makeBits(achievement, bits)}
    </Card>
  );
};

Achievement.defaultProps = {
  current: 0,
};

export default Achievement;
