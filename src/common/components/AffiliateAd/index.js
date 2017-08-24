// @flow

import React from 'react';
import cx from 'classnames';
import styles from './styles.less';

type Props = {
  className?: string,
};

const AffilateAd = ({ className }: Props) => (
  <a
    href="http://send.onenetworkdirect.net/z/617230/CD238549/"
    className={cx(styles.root, className)}
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src="http://show.onenetworkdirect.com/digitalriver/617230.gif?e=ceilznqpxkaeis" alt="Buy Now" />
  </a>
);

export default AffilateAd;
