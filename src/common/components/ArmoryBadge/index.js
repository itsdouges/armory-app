// @flow

import React from 'react';
import cx from 'classnames';
import styles from './styles.less';

type Props = {
  className?: string,
  hotlink?: boolean,
};

const ArmoryBadge = ({ className, hotlink }: Props) => {
  const text = hotlink
    ? <a href="https://gw2armory.com">Powered by gw2armory.com &#9829;</a>
    : <span>Powered by gw2armory.com &#9829;</span>;

  return (
    <div className={cx(styles.root, className)}>
      {text}
    </div>
  );
};

export default ArmoryBadge;
