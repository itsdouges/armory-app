// @flow

import type { BaseProps } from 'common/components/Paginator';

import T from 'i18n-react';
import Paginator from 'common/components/Paginator';
import Button from 'common/components/Button';
import Progress from 'common/components/Icon/Progress';
import Grid from 'common/layouts/Grid';

import styles from './styles.less';

const renderContainer = (children) => (
  <Grid type="col5" fullWidth containerElement="ul">
    {children}
  </Grid>
);

export const renderButton = (onClick: Function) => (
  <Button type="cta" onClick={onClick} className={styles.loadMore}>
    {T.translate('words.loadMore')}
  </Button>
);

const PaginatorGrid = ({ children, ...props }: BaseProps<*>) => (
  <Paginator
    {...props}
    renderContainer={renderContainer}
    renderButton={renderButton}
    progressComponent={<Progress className={styles.progress} />}
  >
    {children}
  </Paginator>
);

export default PaginatorGrid;
