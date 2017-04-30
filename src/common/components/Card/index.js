// @flow

import styles from './styles.less';
import cx from 'classnames';

type CardProps = {
  size?: string,
  className?: string,
  children?: Element<any>,
};

const Card = ({ size, className, children, ...props }: CardProps) => (
  <section {...props} className={cx(styles.root, styles[size], className)}>
    {children}
  </section>
);

export default Card;
