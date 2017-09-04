// @flow

import type { Amulets } from 'flowTypes';
import type { EmbedProps } from 'embeds/bootstrap';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import actions from 'features/Gw2/actions';
import Item from 'common/components/Item';
import styles from './styles.less';

function mapStateToProps (state) {
  return {
    amulets: state.amulets,
  };
}

type Props = EmbedProps & {
  ids: Array<number>,
  amulets?: Amulets,
  fetchAmulets?: (ids: Array<number>) => void,
};

export default connect(mapStateToProps, {
  fetchAmulets: actions.fetchAmulets,
})(
class AmuletsEmbed extends Component<Props> {
  props: Props;

  static renderAmulet (id: number, amulets?: Amulets, blankText, size, props) {
    if (id >= 0) {
      return (
        <Item
          tooltipType="amulets"
          className={styles.item}
          key={id}
          item={amulets && amulets[id]}
          size={size}
          {...props}
        />
      );
    }

    return <Item tooltipTextOverride={blankText} size={size} key={blankText} />;
  }

  componentWillMount () {
    const { ids, fetchAmulets } = this.props;

    fetchAmulets && fetchAmulets(ids);
  }

  render () {
    const { ids, amulets, className, blankText, size, ...props } = this.props;
    return (
      <div className={className}>
        {ids.map((id) => AmuletsEmbed.renderAmulet(id, amulets, blankText, size, props))}
      </div>
    );
  }
}
);
