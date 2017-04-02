// @flow

import type { Items, Bags } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'common/components/Container';
import Item from 'features/Character/components/Item';
import actions from 'features/Gw2/actions';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    bags: (state.characters.data[state.characters.selected] || {}).bags || [],
  };
}

type Props = {
  bags?: Bags,
  items?: Items,
  fetchItems?: (ids: Array<number>) => {},
};

@connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
})
export default class CharacterBags extends Component {
  props: Props;

  componentWillMount () {
    this.fetchItems(this.props.bags);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.bags !== nextProps.bags) {
      this.fetchItems(nextProps.bags);
    }
  }

  fetchItems (bags?: Bags) {
    const ids = (bags || []).reduce((arr, bag) => {
      arr.push(bag.id);
      const itemIds = bag.inventory.map((inv) => inv && inv.id);
      return arr.concat(itemIds);
    }, []);

    this.props.fetchItems && this.props.fetchItems(ids);
  }

  renderItems (bags?: Bags) {
    if (!bags) {
      return null;
    }

    const { items } = this.props;

    return bags.reduce((arr, bag) => arr.concat(bag.inventory), [])
    .map((item, index) => {
      const { id, count } = item || {};
    // eslint-disable-next-line react/no-array-index-key
      return <Item inline key={index} item={items && items[id]} count={count} />;
    });
  }

  render () {
    const { bags, items } = this.props;

    return (
      <Container className={styles.root}>
        <div className={styles.bags}>
          {bags && bags.map((bag, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Item key={index} item={items && items[bag.id]} />
          ))}
        </div>

        <div className={styles.items}>
          {this.renderItems(bags)}
        </div>
      </Container>
    );
  }
}
