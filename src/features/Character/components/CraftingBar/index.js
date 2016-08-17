import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

function getTotal (discipline) {
  return discipline === 'Chef' || discipline === 'Jeweler' ? 400 : 500;
}

function getStyle ({ discipline, rating }) {
  const total = getTotal(discipline);
  const percent = Math.ceil((rating / total || 0) * 100);

  return {
    width: `${percent}%`,
  };
}

const CraftingBar = ({ craft }) => (
  <TooltipTrigger data={craft.discipline}>
    <div className={cx('root', { active: craft.active })}>
      <span className={cx('icon', craft.discipline && craft.discipline.toLowerCase())} />
      <span className={styles.ratingBlock} style={getStyle(craft)} />
      <span className={styles.rating}>
        {`${craft.rating || 0} / ${getTotal(craft.discipline)}`}
      </span>
    </div>
  </TooltipTrigger>
);

CraftingBar.propTypes = {
  craft: PropTypes.object,
};

export default CraftingBar;
