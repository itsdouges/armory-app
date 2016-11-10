import styles from './styles.less';
import cx from 'classnames';

type ContainerProps = {
  className: string,
  children: any,
};

const Container = ({ className, ...props }: ContainerProps) => (
  <div {...props} className={cx(styles.container, className)}>
    {props.children}
  </div>
);

export default Container;
