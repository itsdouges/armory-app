// @flow

import React from 'react';
import cx from 'classnames';
import get from 'lodash/get';
import T from 'i18n-react';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';

import EmptySkill from './Empty';
import styles from './styles.less';

type Props = {
  data?: {},
  className?: string,
  tooltipTextOverride?: string,
  size?: number,
};

const Skill = ({ data, className, tooltipTextOverride, size }: Props) => {
  const error = get(data, 'error');
  const tooltipData = tooltipTextOverride || data || T.translate('characters.noSkill');

  return (
    <TooltipTrigger type="skill" data={tooltipData}>
      {(error || !data)
        ? <EmptySkill size={size} />
        : (
          <Icon
            src={get(data, 'icon')}
            size="mediumSmall"
            className={cx(styles.skill, className)}
            sizePx={size}
          />
        )}
    </TooltipTrigger>
  );
};

export default Skill;
