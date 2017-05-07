// @flow

import type { BaseProps, ButtonProps, ContainerProps } from 'react-scroll-paginator';

import T from 'i18n-react';
import Paginator from 'react-scroll-paginator';
import Button from 'common/components/Button';
import Progress from 'common/components/Icon/Progress';
import Grid from 'common/layouts/Grid';

import styles from './styles.less';

const renderContainer = (props: ContainerProps) => (
  <Grid type="col5" fullWidth containerElement="ul">
    {props.children}
  </Grid>
);

export const renderButton = (props: ButtonProps) => (
  <Button type="cta" onClick={props.onClick} className={styles.loadMore}>
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
