// @flow

import { Component } from 'react';
import cx from 'classnames';

import { addEvent } from 'lib/dom';
import SvgIcon from 'common/components/Icon/Svg';

import styles from './styles.less';

type MenuProps = {
  children?: any,
  itemClassName?: string,
  className?: string,
};

export default class ResponsiveMenu extends Component {
  props: MenuProps;
  detatch: Function;

  state = {
    shown: false,
  };

  componentDidMount () {
    this.detatch = addEvent('click', this.onWindowClick);
  }

  componentWillUnmount () {
    this.detatch();
  }

  onWindowClick = () => {
    if (!this.state.shown) {
      return;
    }

    this.reset();
  }

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
  }

  render () {
    const { children, className, itemClassName, ...props } = this.props;
    const { shown } = this.state;

    return (
      <div
        className={cx(styles.root, className, shown ? styles.shown : styles.hidden)}
      >
        <button className={styles.toggleButton} onClick={this.toggle}>
          <span>{shown ? 'Hide Menu' : 'Show Menu'}</span>
          <SvgIcon name="more-vert" />
        </button>

        <ul className={styles.listRoot} {...props}>
          {children && children.map((item, index) => (
            <li
              className={cx(styles.item, itemClassName)}
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
