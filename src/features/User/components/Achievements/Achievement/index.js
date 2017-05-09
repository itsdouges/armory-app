// @flow

import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Card from 'common/components/Card';

import styles from './styles.less';

type Props = {
  achievement?: {
    name: string,
    description: string,
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

  return achievement.tiers.filter((tier) => tier.count >= current)[0];
};

const Achievement = ({ achievement, icon, current }: Props) => {
  const tier = calculateTier(achievement, current);
  const name = achievement ? achievement.name : '';

  return (
    <TooltipTrigger data={achievement} type="achievement">
      <Card className={styles.root}>
        <div className={styles.iconContainer}>
          <Icon size="medium" src={icon} />
          <ProgressBar
            backgroundColor="transparent"
            barColor="rgba(0, 0, 0, 0.5)"
            max={tier.count}
            current={current}
            className={styles.progress}
            labelClassName={styles.progressLabel}
            vertical
          />
        </div>

        <div className={styles.content}>
          <div className={styles.name}>{name}</div>

          <div className={styles.pointsContainer}>
            <span className={styles.points}>{tier.points} </span>
            <Icon name="arenanet-points.png" />
          </div>
        </div>
      </Card>
    </TooltipTrigger>
  );
};

Achievement.defaultProps = {
  current: 0,
};

export default Achievement;
