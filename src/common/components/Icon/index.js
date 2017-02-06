// @flow

import styles from './styles.less';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

type IconProps = {
  name?: string,
  size?: string,
  className?: string,
  src?: string,
  button?: boolean,
  children?: any,
};

const Icon = ({ name, size, className, src, button, children, ...props }: IconProps) => {
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
