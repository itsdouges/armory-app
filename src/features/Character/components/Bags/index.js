// @flow

import type { Items, Bags } from 'flowTypes';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Container from 'common/components/Container';
import { actions, Item } from 'armory-component-ui';

import styles from './styles.less';

function mapStateToProps (state) {
  return {
    items: state.items,
    bags: (state.characters.data[state.characters.selected] || {}).bags || [],
  };
}

type State = {
  focusedBagIndex: number,
  stickFocusBag: number,
};

type Props = {
  bags?: Bags,
  items?: Items,
  fetchItems?: (ids: Array<number>) => {},
};

export default connect(mapStateToProps, {
  fetchItems: actions.fetchItems,
})(
class CharacterBags extends Component<Props, State> {
  props: Props;
  funcs: Array<{
    enter: () => void,
    leave: () => void,
    click: () => void,
  }>;
  state: State = {
    focusedBagIndex: -1,
    stickFocusBag: -1,
  };

  componentWillMount () {
    this.fetchItems(this.props.bags);
    this.createFuncs(this.props.bags);
  }

  componentWillReceiveProps (nextProps: Props) {
    if (this.props.bags !== nextProps.bags) {
      this.fetchItems(nextProps.bags);
      this.createFuncs(nextProps.bags);
    }
  }

  createFuncs = (bags?: Bags) => {
    this.funcs = (bags || []).map((bag, index) => ({
      enter: () => this.focusBag(index),
      leave: () => this.resetFocus(),
      click: () => this.clickBag(index),
    }));
  };

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

  clickBag (index?: number) {
    this.setState((prevState) => ({
      stickFocusBag: prevState.stickFocusBag === index ? -1 : index,
    }));
  }

  resetFocus () {
    this.setState((prevState) => ({
      focusedBagIndex: prevState.stickFocusBag >= 0 ? prevState.stickFocusBag : -1,
    }));
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
    const { focusedBagIndex, stickFocusBag } = this.state;

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
              onClick={this.funcs[index].click}
              onMouseEnter={this.funcs[index].enter}
              onMouseLeave={this.funcs[index].leave}
              className={cx(styles.bagItem, {
                [styles.blur]: focusedBagIndex >= 0 && focusedBagIndex !== index,
                [styles.selected]: stickFocusBag === index,
              })}
            />
          ))}
        </div>
      </Container>
    );
  }
}
);
