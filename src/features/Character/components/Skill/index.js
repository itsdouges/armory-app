// @flow

import React from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import T from 'i18n-react';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';
import ResourceLink, { buildLink } from 'common/components/ResourceLink';

import EmptySkill from './Empty';
import styles from './styles.less';

type Props = {
  data?: {
    name: string,
  },
  className?: string,
  tooltipTextOverride?: string,
  size?: number,
  inlineText?: string,
};

const Skill = ({ data, className, tooltipTextOverride, size, inlineText }: Props) => {
  const error = get(data, 'error');
  const tooltipData = tooltipTextOverride || data || T.translate('characters.noSkill');

  return (
    <TooltipTrigger type="skill" data={tooltipData}>
      <ResourceLink text={data && data.name} href={buildLink(inlineText, data && data.name)}>
        {error || !data ? (
          <EmptySkill size={size} />
        ) : (
          <Icon
            src={get(data, 'icon')}
            size="mediumSmall"
            className={cx(styles.skill, className)}
            sizePx={size}
          />
        )}
      </ResourceLink>
    </TooltipTrigger>
  );
};

export default Skill;
