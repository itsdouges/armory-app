// @flow

import cx from 'classnames';
import get from 'lodash/get';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';

import styles from './styles.less';

type Props = {
  data?: {},
  className?: string,
};

const Skill = ({ data, className }: Props) => {
  const error = get(data, 'error');

  return (
    <TooltipTrigger type="skill" data={data || 'No Skill Selected'}>
      <Icon
        src={!error ? get(data, 'icon') : undefined}
        name={error ? 'empty.png' : undefined}
        size="mediumSmall"
        className={cx(styles.skill, className)}
      />
    </TooltipTrigger>
  );
};

export default Skill;
