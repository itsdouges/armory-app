// @flow

import { Component } from 'react';
import cx from 'classnames';
import Gw2Item from 'common/components/Gw2Item';
import SvgIcon from 'common/components/Icon/Svg';

import styles from './styles.less';

type Props = {
  name: string,
  items: Array<number>,
  userMaterials: {
    [id: number]: { id: number, category: number, count: number },
  },
  expanded?: boolean,
};

export default class MaterialSection extends Component {
  props: Props;

  state = {
    expanded: false,
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
        <h2>
          <button onClick={this.toggleExpanded}>
            <SvgIcon name="arrow-down" className={styles.icon} />
            {name}
          </button>
        </h2>

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
