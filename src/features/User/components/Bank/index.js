// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import Container from 'common/components/Container';
import Gw2Item from 'common/components/Gw2Item';

import { fetchBank } from '../../actions';
import styles from './styles.less';

export const selector = createSelector(
  (store) => (store.users.data[store.users.selected] || {}).bank || [],
  (bank) => ({
    bank,
  })
);

type Props = {
  alias: string,
  fetchBank: (string) => Promise<>,
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
})(
class UserBank extends Component {
  props: Props;

  componentDidMount () {
    this.props.fetchBank(this.props.alias);
  }

  render () {
    const { bank } = this.props;

    return (
      <Container className={styles.root}>
        {bank.map((item, index) => (
          <Gw2Item
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            id={item.id}
            count={item.count}
          />
        ))}
      </Container>
    );
  }
}
);
