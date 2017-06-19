// @flow

import cx from 'classnames';

import Icon from 'common/components/Icon';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Gold from 'common/components/Gold';
import Card from 'common/components/Card';
import { thousands } from 'lib/numbers';

import styles from './styles.less';

type Props = {
  name: string,
  description: string,
  icon: string,
  order: number,
  id: number,
  className?: string,
  value?: number,
};

const buildValueComponent = (id, value) => {
  if (!value) {
    return 0;
  }

  switch (id) {
    case 1:
      return <Gold coins={value} />;

    default:
      return thousands(value);
  }
};

const Currency = ({ id, name, description, icon, value, order, className }: Props) => (
  <TooltipTrigger data={description}>
    <Card className={cx(styles.root, className)} style={{ order }}>
      <Icon size="small" src={icon} />

      <div className={cx(styles.value, styles[`currency-${id}`])}>
        {buildValueComponent(id, value)}
      </div>

      <div className={styles.name}>{name}</div>
    </Card>
  </TooltipTrigger>
);

export default Currency;
