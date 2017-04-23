// @flow

import cx from 'classnames';
import styles from './styles.less';

type Props = {
  children?: any,
  className?: string,
  type: 'col2' | 'col5',
  containerElement: string,
  fullWidth?: boolean,
};

const Grid = ({ children, className, type, containerElement: Container, fullWidth }: Props) => (
  <Container
    className={cx(styles.root, className, styles[type], {
      [styles.fullWidth]: fullWidth,
    })}
  >
    {children}
  </Container>
);

Grid.defaultProps = {
  containerElement: 'div',
  type: 'col2',
};

export default Grid;
