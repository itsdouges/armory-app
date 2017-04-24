// @flow

import type { Props } from 'common/components/Paginator';

import cx from 'classnames';
import styles from 'common/layouts/Grid/styles.less';
import Paginator from 'common/components/Paginator';
import Progress from 'common/components/Icon/Progress';

const PaginatorGrid = ({ children, ...props }: Props<*>) => (
  <Paginator
    {...props}
    progressComponent={<Progress style={{ display: 'block', margin: '2em auto' }} />}
    containerClassName={cx(styles.root, styles.col5, styles.fullWidth)}
  >
    {children}
  </Paginator>
);

export default PaginatorGrid;
