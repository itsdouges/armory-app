// @flow

import React, { Component } from 'react';
import cx from 'classnames';

import { addEvent } from 'lib/dom';
import SvgIcon from 'common/components/Icon/Svg';
import config from 'config';

import styles from './styles.less';

type MenuProps = {
  children?: any,
  itemClassName?: string,
  className?: string,
};

export default class ResponsiveMenu extends Component<MenuProps, *> {
  props: MenuProps;
  detatch: Function;

  state = {
    shown: false,
  };

  componentDidMount() {
    this.detatch = addEvent('click', this.onWindowClick);
  }

  componentWillUnmount() {
    this.detatch();
  }

  onWindowClick = () => {
    if (!this.state.shown) {
      return;
    }

    this.reset();
  };

  reset = () => {
    this.setState({
      shown: false,
    });
  };

  toggle = (e: MouseEvent) => {
    e.stopPropagation();

    this.setState({
      shown: !this.state.shown,
    });
  };

  render() {
    const { children, className, itemClassName, ...props } = this.props;
    const { shown } = this.state;
    const moreVertIconName = config.features.christmas ? 'more-vert-white' : 'more-vert';

    return (
      <div className={cx(styles.root, className, shown ? styles.shown : styles.hidden)}>
        <button className={styles.toggleButton} onClick={this.toggle}>
          <span>{shown ? 'Hide Menu' : 'Show Menu'}</span>
          <SvgIcon name={moreVertIconName} />
        </button>

        <nav>
          <ul className={styles.listRoot} {...props}>
            {children &&
              children.map((item, index) => (
                <li
                  className={cx(styles.item, itemClassName)}
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                >
                  {item}
                </li>
              ))}
          </ul>
        </nav>
      </div>
    );
  }
}
