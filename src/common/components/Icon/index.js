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
  sizePx?: number,
  style?: {
    [string]: ?string,
  },
};

const buildStyle = ({ style, src, name, imageSrc, sizePx }) => {
  return {
    ...style,
    width: sizePx && `${sizePx}px`,
    height: sizePx && `${sizePx}px`,
    backgroundImage: (src || name) && `url(${src || imageSrc})`,
  };
};

const Icon = ({ name, size, className, src, button, children, style, sizePx, ...props }: IconProps) => {
  let imageSrc;

  try {
    imageSrc = require(`assets/images/${name}`);
  } catch (ex) {
    imageSrc = '';
  }

  return (
    <div
      {...props}
      className={cx(styles.container, styles[size], className, button && styles.button)}
      style={buildStyle({ style, src, name, imageSrc, sizePx })}
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
