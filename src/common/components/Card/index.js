import styles from './styles.less';
import cx from 'classnames';

type CardProps = {
  size: string,
  className: string,
  children: any,
};

const Card = (props: CardProps) => (
  <div {...props} className={cx(styles.root, props.size, props.className)}>
    {props.children}
  </div>
);

export default Card;
