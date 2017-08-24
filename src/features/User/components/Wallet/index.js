// @flow

import React from 'react';
import Currency from 'common/components/Currency';
import Container from 'common/components/Container';

import { makeStubItems } from 'lib/paginator';
import withBatchLoad from 'common/decorators/reduxBatchLoad';
import actions from 'features/Gw2/actions';
import styles from './styles.less';
import { fetchWallet } from '../../actions';

type Props = {
  resourceData: Array<{ value: number, id: number }>,
  gw2Data: {
    [id: number]: {
      id: number,
      name: string,
      description: string,
      order: number,
      icon: string,
    }
  },
};

const Wallet = (props: Props) => (
  <Container className={styles.root}>
    {props.resourceData.map(({ id, value } = {}, index) =>
      <Currency className={styles.currency} key={id || index} value={value} {...props.gw2Data[id]} />)}
  </Container>
);

export default withBatchLoad({
  fetchResourceData: fetchWallet,
  fetchGw2Data: actions.fetchCurrencies,
  storeKeyResource: 'wallet',
  storeKeyGw2: 'currencies',
  emptyUserData: makeStubItems(18).rows,
  resource: 'users',
})(Wallet);
