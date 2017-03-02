// @flow

import cx from 'classnames';
import get from 'lodash/get';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';

import styles from './styles.less';

const Skill = ({ data, className }: { data?: {}, className?: string }) => (
  <TooltipTrigger type="skill" data={data || 'No Skill Selected'}>
    <Icon src={get(data, 'icon')} size="mediumSmall" className={cx(styles.skill, className)} />
  </TooltipTrigger>
);

export default Skill;
