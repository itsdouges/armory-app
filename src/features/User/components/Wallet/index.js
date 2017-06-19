// @flow

import Currency from 'common/components/Currency';
import Container from 'common/components/Container';

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
    {props.resourceData.map(({ id, value }) =>
      <Currency className={styles.currency} key={id} value={value} {...props.gw2Data[id]} />)}
  </Container>
);

export default withBatchLoad({
  fetchResourceData: fetchWallet,
  fetchGw2Data: actions.fetchCurrencies,
  storeKeyResource: 'wallet',
  storeKeyGw2: 'currencies',
  resource: 'users',
})(Wallet);
