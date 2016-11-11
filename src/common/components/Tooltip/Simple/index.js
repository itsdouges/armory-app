// @flow

import styles from './styles.less';

const SimpleTooltip = ({ data }: { data: string }) => (
  <div className={styles.simple}>{data}</div>
);

export default SimpleTooltip;
