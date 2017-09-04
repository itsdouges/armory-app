// @flow

import React from 'react';
import cx from 'classnames';

import ResourceLink, { buildLink } from 'common/components/ResourceLink';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import colours from 'common/styles/colours';

import styles from './styles.less';

type Props = {
  data?: {
    icon?: string,
    name: string,
  },
  className?: string,
  active?: boolean,
  tooltipTextOverride?: string,
  size?: number,
  inlineText?: string,
};

const Trait = ({ data, className, active, tooltipTextOverride, size, inlineText }: Props) => (
  <TooltipTrigger type="trait" data={tooltipTextOverride || data}>
    <ResourceLink text={data && data.name} href={buildLink(inlineText, data && data.name)}>
      <Icon
        className={cx(styles.root, className, { [styles.active]: active })}
        src={data && data.icon}
        style={{ backgroundColor: data && data.icon && colours._black }}
        sizePx={size}
      />
    </ResourceLink>
  </TooltipTrigger>
);

export default Trait;
