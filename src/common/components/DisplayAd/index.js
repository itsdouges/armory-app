// @flow

import { Component } from 'react';
import cx from 'classnames';

import styles from './styles.less';
import config from 'config';

type Props = {
  className?: string,
};

export default class DisplayAd extends Component {
  props: Props;

  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    const { className } = this.props;

    return config.features.ads ? (
      <div className={cx(styles.root, className)}>
        <ins
          className={cx(styles.container, 'adsbygoogle', styles.ad)}
          data-ad-client="ca-pub-2175298201916217"
          data-ad-slot="8417387487"
        />
      </div>
    ) : null;
  }
}
