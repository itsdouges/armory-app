// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeStubItems } from 'lib/paginator';
import Container from 'common/components/Container';
import Gw2Item from 'common/components/Gw2Item';

import { fetchBank, fetchSharedInventory } from '../../actions';
import styles from './styles.less';

const STUB_ITEMS = makeStubItems(20).rows;

export const selector = createSelector(
  (store) => (store.users.data[store.users.selected] || {}).bank || STUB_ITEMS,
  (store) => (store.users.data[store.users.selected] || {}).sharedInventory,
  (bank, sharedInventory) => ({
    bank,
    sharedInventory,
  })
);

type Props = {
  alias: string,
  fetchBank: (string) => Promise<>,
  fetchSharedInventory: (string) => Promise<>,
  sharedInventory: Array<{
    id: number,
    count: number,
    charges?: number,
    binding?: 'Account',
  }>,
  bank: Array<{
    id: number,
    count: number,
    binding?: 'Character' | 'Account',
    bound_to?: string,
    upgrades?: Array<number>,
    stats?: {
      id: number,
      attributes: {
        [string]: number,
      },
    },
  }>,
};

export default connect(selector, {
  fetchBank,
  fetchSharedInventory,
})(
class UserBank extends Component {
  props: Props;

  componentDidMount () {
    this.props.fetchBank(this.props.alias);
    this.props.fetchSharedInventory(this.props.alias);
  }

  render () {
    const { bank, sharedInventory } = this.props;

    return (
      <Container className={styles.root}>
        {sharedInventory && !!sharedInventory.length && (
          <div className={styles.sharedInventory}>
            {sharedInventory.map((item, index) => (
              <Gw2Item
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                id={item.id}
                count={item.count}
              />
            ))}
          </div>
        )}

        <div className={styles.bank}>
          {bank.map((item, index) => (
            <Gw2Item
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...item}
            />
          ))}
        </div>
      </Container>
    );
  }
}
);
