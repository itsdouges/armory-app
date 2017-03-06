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
  applyCount?: number,
};

const Icon = ({ name, size, className, src, button, children, applyCount, ...props }: IconProps) => {
  const APPLY_COUNT_THRESHOLD = 1;
  let image: string;
  let applyBadge: any;

  if (applyCount && applyCount > APPLY_COUNT_THRESHOLD) {
    applyBadge = (<sub className={styles.applyBadge}>{applyCount}</sub>);
  }

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
      {applyBadge}
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
  applyCount: 0,
  children: undefined,
};

export default Icon;
