// @flow

import styles from './styles.less';
import TooltipTrigger from 'common/components/TooltipTrigger';
import cx from 'classnames';

type Props = {
  data?: {
    icon: string,
  },
  className?: string,
  active?: boolean,
};

const Trait = ({ data, className, active }: Props) => (
  <TooltipTrigger type="trait" data={data}>
    <div
      className={cx(styles.root, className, { [styles.active]: active })}
      style={{ backgroundImage: `url(${data ? data.icon : ''})` }}
    />
  </TooltipTrigger>
);

export default Trait;
