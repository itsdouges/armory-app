import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Trait = ({ data, className, active }) => (
  <div
    className={cx('root', className, { active })}
    style={{ backgroundImage: `url(${data.icon})` }}
  />
);

Trait.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  className: PropTypes.string,
};

export default Trait;
