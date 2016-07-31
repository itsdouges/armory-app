import { PropTypes } from 'react';
import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Icon = ({ name, size, className }) => (
  <div className={cx('container', size, className)} style={{
    backgroundImage: 'url(' + require(`assets/images/${name}`) + ')',
  }}></div>
);

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Icon;
