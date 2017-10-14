// @flow

import React, { Component } from 'react';
import cx from 'classnames';
import { Gw2Item } from 'armory-component-ui';
import SvgIcon from 'common/components/Icon/Svg';

import styles from './styles.less';

type Props = {
  name: string,
  items: Array<number>,
  userMaterials: {
    [id: number]: { id: number, category: number, count: number },
  },
  beginExpanded: boolean,
};

export default class MaterialSection extends Component<Props, *> {
  props: Props;

  static defaultProps = {
    beginExpanded: false,
  };

  state = {
    expanded: this.props.beginExpanded,
  };

  toggleExpanded = () => {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
    }));
  };

  render () {
    const { items, name, userMaterials } = this.props;
    const { expanded } = this.state;

    return (
      <section className={cx(styles.sectionRoot, { [styles.expanded]: expanded })}>
        <button className={styles.buttonContainer} onClick={this.toggleExpanded}>
          <h2>
            <SvgIcon name="arrow-down" className={styles.icon} />
            {name}
          </h2>
        </button>

        {items.slice(0, expanded ? undefined : 18).map((id) => {
          const data = userMaterials[id] || {};

          return (
            <Gw2Item
              id={id}
              key={id}
              count={data.count}
              className={cx(styles.item, { [styles.hasItems]: data.count })}
            />);
        })}
      </section>
    );
  }
}
