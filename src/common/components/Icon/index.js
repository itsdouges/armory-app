// @flow

import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

type IconProps = {
  name: string,
  size?: string,
  className?: string,
  src?: string,
  button?: bool,
};

const Icon = ({ name, size, className, src, button, ...props }: IconProps) => {
  let image: string;

  try {
    image = require(`assets/images/${name}`);
  } catch (ex) {
    image = '';
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

export default Icon;
