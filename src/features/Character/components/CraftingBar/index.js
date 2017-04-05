// @flow

import cx from 'classnames';

import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import Icon from 'common/components/Icon';
import colours from 'common/styles/colours';

const craftingUpTo400 = ['Chef', 'Jeweler', 'Scribe'];
const getTotal = (discipline) => {
  return craftingUpTo400.indexOf(discipline) >= 0 ? 400 : 500;
};

type Props = {
  craft: {
    discipline?: string,
    rating?: number,
  },
};

const CraftingBar = ({ craft }: Props) => {
  const max = getTotal(craft.discipline);

  return (
    <TooltipTrigger data={craft.discipline}>
      <div className={styles.root}>
        <ProgressBar
          backgroundColor={colours._darkestgray}
          barColor={colours._orange}
          icon={
            <Icon
              className={cx(styles.icon)}
              name={craft.discipline && `${craft.discipline.toLowerCase()}-icon.png`}
            />
          }
          current={craft.rating || 0}
          max={max}
        />
      </div>
    </TooltipTrigger>
  );
};

export default CraftingBar;
