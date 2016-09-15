import { PropTypes } from 'react';
import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Trait = ({ data, className, active }) => (
  <TooltipTrigger type="trait" data={data}>
    <div
      className={cx('root', className, { active })}
      style={{ backgroundImage: `url(${data.icon})` }}
    />
  </TooltipTrigger>
);

Trait.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  className: PropTypes.string,
};

export default Trait;
