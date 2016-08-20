import { PropTypes } from 'react';
import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Icon = ({ name, size, className, src }) => (
  <div
    className={cx('container', size, className)}
    style={{
      /* eslint prefer-template:0 */
      backgroundImage: 'url(' + (src || require(`assets/images/${name}`)) + ')',
    }}
  />
);

Icon.defaultProps = {
  size: 'mini',
};

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string,
};

export default Icon;
