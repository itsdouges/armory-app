// @flow

import type { Items, Bags } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

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

type State = {
  focusedBagIndex: number,
};

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
  state: State = {
    focusedBagIndex: -1,
  };

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
      if (bag) {
        arr.push(bag.id);
        const itemIds = bag.inventory.map((inv) => inv && inv.id);
        return arr.concat(itemIds);
      }

      return arr;
    }, []);

    this.props.fetchItems && this.props.fetchItems(ids);
  }

  focusBag (index?: number) {
    this.setState({
      focusedBagIndex: index,
    });
  }

  renderItems (bags?: Bags, focusedBagIndex: number) {
    if (!bags) {
      return null;
    }

    const { items } = this.props;

    return bags.map((bag, bagIndex) => {
      return (
        <span
          key={bagIndex} // eslint-disable-line react/no-array-index-key
          className={cx(styles.bag, {
            [styles.blur]: focusedBagIndex >= 0 && focusedBagIndex !== bagIndex,
          })}
        >
          {bag && bag.inventory.map((item, itemIndex) => {
            const { id, count } = item || {};
            return (
              <Item
                key={itemIndex} // eslint-disable-line react/no-array-index-key
                item={items && items[id]}
                count={count}
              />
            );
          })}
        </span>
      );
    });
  }

  render () {
    const { bags, items } = this.props;
    const { focusedBagIndex } = this.state;

    return (
      <Container className={styles.root}>
        <div className={styles.items}>
          {this.renderItems(bags, focusedBagIndex)}
        </div>

        <div className={styles.bags}>
          {bags && bags.map((bag, index) => (
            <Item
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              item={items && items[bag && bag.id]}
              onMouseEnter={() => this.focusBag(index)}
              onMouseLeave={() => this.focusBag(-1)}
              className={cx(focusedBagIndex >= 0 && focusedBagIndex !== index && styles.blur)}
            />
          ))}
        </div>
      </Container>
    );
  }
}
