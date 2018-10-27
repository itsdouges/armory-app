// @flow

import { withRouter } from 'react-router';
import React, { Component } from 'react';
import cx from 'classnames';

import config from 'config';
import { iframe } from 'lib/dom';
import styles from './styles.less';

export type Props = {
  className?: string,
  location: Object,
  type: 'billboard' | 'halfpage' | 'leaderboard' | 'mrec' | 'wideskyscraper' | 'banner' | 'mbanner',
};

const displayAdMap = {
  billboard: {
    width: 970,
    height: 250,
    tag: 480591,
  },
  leaderboard: {
    width: 728,
    height: 90,
    tag: 480592,
  },
  halfpage: {
    width: 300,
    height: 600,
    tag: 480595,
  },
  mrec: {
    width: 300,
    height: 250,
    tag: 480593,
  },
  wideskyscraper: {
    width: 160,
    height: 600,
    tag: 480597,
  },
  mbanner: {
    width: 320,
    height: 50,
    tag: 480970,
  },
  banner: {
    width: 468,
    height: 60,
    tag: 480971,
  },
};

export default withRouter(
  class DisplayAd extends Component<Props> {
    props: Props;
    _container: ?HTMLElement;

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        this.renderAd();
      }
    }

    componentDidMount() {
      this.renderAd();
    }

    renderAd() {
      if (!config.features.ads || !this._container) {
        return;
      }

      this._container.innerHTML = '';

      const ad = displayAdMap[this.props.type];

      iframe(
        this._container,
        `
<script src="//ap.lijit.com/www/delivery/fpi.js?z=${ad.tag}&width=${ad.width}&height=${
          ad.height
        }"></script>
    `
      );
    }

    render() {
      if (!config.features.ads) {
        return null;
      }

      const { className } = this.props;
      const { width, height } = displayAdMap[this.props.type];

      return (
        <div
          className={cx(styles.root, className)}
          style={{
            width,
            height,
          }}
          ref={c => (this._container = c)}
        />
      );
    }
  }
);
