// @flow

import styles from './styles.less';
import cx from 'classnames';

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
      className={cx(styles.container, styles[size], className, button && styles.button)}
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
