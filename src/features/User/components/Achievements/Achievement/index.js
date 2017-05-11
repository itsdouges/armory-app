// @flow

import { Component } from 'react';
import T from 'i18n-react';
import cx from 'classnames';
import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';
import Money from 'common/components/Tooltip/Gold';
import Gw2Item from 'common/components/Gw2Item';
import Gw2Title from 'common/components/Gw2Title';
import SvgIcon from 'common/components/Icon/Svg';

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

  return (
    <ol>
      {achievement.bits.map((bit, index) => {
        const completed = userBits.includes(index);
        let content;

        switch (bit.type) {
          case 'Text':
            content = bit.text;
            break;

          case 'Item':
            content = <Gw2Item id={bit.id} className={!completed && styles.incomplete} size="32" />;
            break;

          // Minipet not currently supported.
          // Skin not currently supported.
          case 'Minipet':
          case 'Skin':
          default:
            return null;
        }

        return (
          <li className={styles.bit} key={`${bit.type}-${bit.id || bit.text}`}>
            <SvgIcon sizePx={16} name={completed ? 'done' : 'clear'} /> {content}
          </li>
        );
      })}
    </ol>
  );
};

const extractColour = (c, opacity) => c && `rgba(${c.r}, ${c.g}, ${c.b}, ${opacity})`;

export default class Achievement extends Component {
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
    const { achievement, icon, current, bits, colour } = this.props;
    const { bitsExpanded } = this.state;

    const tier = calculateTier(achievement, current);
    const name = achievement ? achievement.name : '';
    const completed = current === tier.count;

    return (
      <Card className={cx(styles.root, cx({ [styles.completed]: completed }))}>
        <TooltipTrigger data={achievement && { ...achievement, current, userBits: bits }} type="achievement">
          <div className={styles.achievementContainer}>
            <div className={styles.iconContainer} style={{ backgroundColor: extractColour(colour, 0.1) }}>
              <Icon size="medium" src={icon} className={styles.icon} />

              <ProgressBar
                backgroundColor="transparent"
                barColor={extractColour(colour, 0.3)}
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

        <div className={styles.rewards} style={{ backgroundColor: extractColour(colour, 0.6) }}>
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

        {achievement && achievement.bits && (
          <button
            onClick={this.toggleBits}
            className={cx(styles.bits, {
              [styles.expanded]: bitsExpanded,
            })}
          >
            <SvgIcon name="expand" className={styles.expandIcon} />
            <span className={styles.bitsWash} />
            {makeBits(achievement, bits)}
          </button>
        )}
      </Card>
    );
  }
}
