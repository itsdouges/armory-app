// @flow

import { Component } from 'react';

import Currency from 'common/components/Currency';
import Container from 'common/components/Container';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import actions from 'features/Gw2/actions';
import styles from './styles.less';
import { fetchWallet } from '../../actions';

const withBatchLoad = ({ fetchUserData, storeKeyUser, fetchGw2Data, storeKeyGw2 }) => {
  const selector = createSelector(
    (store) => (store.users.data[store.users.selected] || {})[storeKeyUser] || [],
    (store) => store[storeKeyGw2] || {},
    (userData, gw2Data) => ({
      userData,
      gw2Data,
    })
  );

  return (WrappedComponent) => connect(selector, {
    fetchUserData,
    fetchGw2Data,
  })(
  class WithBatchLoad extends Component {
    props: {
      id: string,
      fetchUserData: (string) => Promise<*>,
      fetchGw2Data: (Array<number>) => Promise<*>,
      gw2Data: any,
      userData: any,
    };

    componentDidMount () {
      this.props.fetchUserData(this.props.id)
        .then((action) =>
          this.props.fetchGw2Data(action.payload.data.map((item) => item.id)));
    }

    render () {
      return <WrappedComponent {...this.props} />;
    }
  }
  );
};

type Props = {
  userData: Array<{ value: number, id: number }>,
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
    {props.userData.map(({ id, value }) =>
      <Currency className={styles.currency} key={id} value={value} {...props.gw2Data[id]} />)}
  </Container>
);

export default withBatchLoad({
  fetchUserData: fetchWallet,
  fetchGw2Data: actions.fetchCurrencies,
  storeKeyUser: 'wallet',
  storeKeyGw2: 'currencies',
})(Wallet);
