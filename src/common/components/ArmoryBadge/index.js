// @flow

import React from 'react';
import cx from 'classnames';
import styles from './styles.less';

type Props = {
  className?: string,
  hotlink?: boolean,
};

const ArmoryBadge = ({ className, hotlink }: Props) => {
  const ctaText = 'Powered by gw2armory.com &#9829;';
  const text = hotlink
    ? <a href="https://gw2armory.com">{ctaText}</a>
    : ctaText;

  return (
    <div className={cx(styles.root, className)}>
      {text}
    </div>
  );
};

export default ArmoryBadge;
