import { PropTypes } from 'react';
import styles from './styles.less';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Icon = ({ name, size, className, src, button, ...props }) => {
  let image;

  try {
    image = require(`assets/images/${name}`);
  } catch (ex) {
    image = undefined;
  }

  return (
    <div
      {...props}
      className={cx('container', size, className, button && 'button')}
      style={{
        /* eslint prefer-template:0 */
        backgroundImage: (src || name) && 'url(' + (src || image) + ')',
      }}
    />
  );
};

Icon.defaultProps = {
  size: 'mini',
};

Icon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  src: PropTypes.string,
  button: PropTypes.bool,
};

export default Icon;
