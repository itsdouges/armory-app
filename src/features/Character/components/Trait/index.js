// @flow

import React from 'react';
import cx from 'classnames';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import colours from 'common/styles/colours';

import styles from './styles.less';

type Props = {
  data?: {
    icon?: string,
  },
  className?: string,
  active?: boolean,
  tooltipTextOverride?: string,
  size?: number,
};

const Trait = ({ data, className, active, tooltipTextOverride, size }: Props) => (
  <TooltipTrigger type="trait" data={tooltipTextOverride || data}>
    <Icon
      className={cx(styles.root, className, { [styles.active]: active })}
      src={data && data.icon}
      style={{ backgroundColor: data && data.icon && colours._black }}
      sizePx={size}
    />
  </TooltipTrigger>
);

export default Trait;
