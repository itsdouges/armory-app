// @flow

import type { Amulets } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'features/Character/components/Item';
import styles from './styles.less';

function mapStateToProps (state) {
  return {
    amulets: state.amulets,
  };
}

type Props = {
  ids: Array<number>,
  amulets?: Amulets,
  fetchAmulets?: (ids: Array<number>) => void,
  className?: string,
  blankText: string,
};

@connect(mapStateToProps, {
  fetchAmulets: actions.fetchAmulets,
})
export default class AmuletsEmbed extends Component {
  props: Props;

  static renderAmulet (id: number, amulets?: Amulets, blankText) {
    if (id >= 0) {
      return (
        <Item
          tooltipType="amulets"
          className={styles.item}
          key={id}
          item={amulets && amulets[id]}
        />
      );
    }

    return <Item tooltipTextOverride={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchAmulets } = this.props;

    fetchAmulets && fetchAmulets(ids);
  }

  render () {
    const { ids, amulets, className, blankText } = this.props;
    return (
      <div className={className}>
        {ids.map((id) => AmuletsEmbed.renderAmulet(id, amulets, blankText))}
      </div>
    );
  }
}
