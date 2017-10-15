// @flow

import React, { Component } from 'react';
import T from 'i18n-react';
import cx from 'classnames';
import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import Money from 'common/components/Gold';
import Gw2Item from 'common/components/Gw2Item';
import Gw2Skin from 'common/components/Gw2Skin';
import Gw2Title from 'common/components/Gw2Title';
import SvgIcon from 'common/components/Icon/Svg';

import extractColour from 'lib/colour';
import styles from './styles.less';

type Tier = {
  points: number,
  count: number,
};

type Props = {
  done?: boolean,
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
  colour?: {
    r: string,
    g: string,
    b: string,
  },
};

const calculateTier = (achievement, current) => {
  if (!achievement) {
    return {};
  }

  return achievement.tiers.filter((tier) => tier.count >= current)[0] || {};
};

const masteryMap = {
  // TODO: This is due to the the api returning unknown instead of desert.
  // See: https://github.com/arenanet/api-cdi/issues/577
  Unknown: 'Desert',
};

const makeRewards = (achievement) => {
  if (!achievement || !achievement.rewards) {
    return [];
  }

  return achievement.rewards.map((reward) => {
    switch (reward.type) {
      case 'Mastery': {
        const masteryType = masteryMap[reward.region] || reward.region;
        return (
          <TooltipTrigger key={reward.id} data={`${masteryType} ${T.translate('words.masteryPoint')}`}>
            <Icon name={`mastery-point-${masteryType.toLowerCase()}.png`} />
          </TooltipTrigger>
        );
      }

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

const makeBits = (achievement, expanded, userBits = []) => {
  if (!achievement || !achievement.bits) {
    return [];
  }

  const bits = expanded
    ? achievement.bits
    : achievement.bits.slice(0, 1);

  return (
    <ol>
      {bits.map((bit, index) => {
        const completed = userBits.includes(index);
        let content;

        switch (bit.type) {
          case 'Text':
            content = bit.text;
            break;

          case 'Item':
            content = <Gw2Item id={bit.id} className={!completed && styles.incomplete} size="32" />;
            break;

          case 'Skin':
            content = <Gw2Skin id={bit.id} className={!completed && styles.incomplete} size="32" />;
            break;

          case 'Minipet':
          default:
            return null;
        }

        return (
          <li className={styles.bit} key={`${bit.type}-${bit.id || bit.text}`}>
            <SvgIcon
              className={styles.progressIcon}
              size="micro"
              name={completed ? 'done' : 'clear'}
            />

            {content}
          </li>
        );
      })}
    </ol>
  );
};

export default class Achievement extends Component<Props, *> {
  props: Props;

  static defaultProps = {
    current: 0,
  };

  state: {
    bitsExpanded: boolean,
  } = {
    bitsExpanded: false,
  };

  toggleBits = () => {
    this.setState((prevState) => ({
      bitsExpanded: !prevState.bitsExpanded,
    }));
  };

  render () {
    const { achievement, icon, current, bits, colour, done: completed } = this.props;
    const { bitsExpanded } = this.state;
    const tier = calculateTier(achievement, current);
    const name = achievement ? achievement.name : <span className={styles.loading}>Loading Achievement...</span>;

    return (
      <Card className={cx(styles.root, cx({ [styles.completed]: completed }))}>
        <div className={styles.achievementContainer}>
          <TooltipTrigger data={achievement && { ...achievement, current, userBits: bits }} type="achievement">
            <div className={styles.iconContainer} style={{ backgroundColor: extractColour(colour, 0.1) }}>
              <Icon size="medium" src={icon} className={styles.icon} />

              <ProgressBar
                backgroundColor="transparent"
                barColor={extractColour(colour, 0.3)}
                max={tier.count}
                current={current}
                className={styles.progress}
                labelClassName={styles.progressLabel}
                label={completed ? T.translate('words.completed') : ''}
                vertical
              />
            </div>
          </TooltipTrigger>

          <div className={styles.content}>
            <div className={styles.name}>{name}</div>

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
          </div>
        </div>

        {achievement && achievement.bits && (
          <button
            onClick={this.toggleBits}
            className={cx(styles.bits, {
              [styles.expanded]: bitsExpanded,
            })}
          >
            <SvgIcon name="expand" className={styles.expandIcon} />
            <span className={styles.bitsWash} />
            {makeBits(achievement, bitsExpanded, bits)}
          </button>
        )}
      </Card>
    );
  }
}
