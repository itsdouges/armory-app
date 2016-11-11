// @flow

import styles from './styles.less';
import { prefix } from 'lib/css';

const Divider = ({ rotationOffset }: { rotationOffset: number }) => (
  <div className={styles.divider} style={prefix('transform', `rotate(${rotationOffset}deg)`)} />
);

export default Divider;
