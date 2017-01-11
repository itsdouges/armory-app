// @flow

import { Component } from 'react';
import cx from 'classnames';

import styles from './styles.less';

type Props = {
  className?: string,
};

export default class DisplayAd extends Component {
  props: Props;

  render () {
    const { className } = this.props;

    return (
      <div className={cx(styles.root, className)}>

      </div>
    );
  }
}
