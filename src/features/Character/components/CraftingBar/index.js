import { PropTypes } from 'react';
import classnames from 'classnames/bind';

import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import ProgressBar from 'common/components/ProgressBar';
import colours from 'common/styles/colours';

const cx = classnames.bind(styles);

function getTotal (discipline) {
  return discipline === 'Chef' || discipline === 'Jeweler' ? 400 : 500;
}

const CraftingBar = ({ craft }) => {
  const max = getTotal(craft.discipline);

  return (
    <TooltipTrigger data={craft.discipline}>
      <div className={styles.root}>
        <ProgressBar
          backgroundColor={colours._darkestgray}
          barColor={colours._orange}
          icon={<span className={cx('icon', craft.discipline && craft.discipline.toLowerCase())} />}
          current={craft.rating}
          max={max}
        />
      </div>
    </TooltipTrigger>
  );
};

CraftingBar.propTypes = {
  craft: PropTypes.object,
};

export default CraftingBar;
