// @flow

import styles from './styles.less';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

export type IconProps = {
  name?: string,
  size?: string,
  className?: string,
  src?: string,
  button?: boolean,
  children?: any,
  style?: {
    [string]: ?string,
  },
};

const Icon = ({ name, size, className, src, button, children, style, ...props }: IconProps) => {
  let image;

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
        ...style,
        /* eslint prefer-template:0 */
        backgroundImage: (src || name) && 'url(' + (src || image) + ')',
      }}
    >
      {children}
    </div>
  );
};

Icon.defaultProps = {
  size: 'mini',
  name: '',
  className: '',
  src: '',
  button: false,
  children: undefined,
};

export default Icon;
