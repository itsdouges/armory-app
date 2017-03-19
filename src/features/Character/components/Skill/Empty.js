// @flow

import cx from 'classnames';

import Icon from 'common/components/Icon';
import styles from './styles.less';

type Props = {
  className?: string,
};

const EmptySkill = ({ className, ...props }: Props) => (
  <Icon
    name="empty-skill-back.png"
    size="mediumSmall"
    className={cx(styles.empty, className)}
    {...props}
  >
    <Icon
      name="empty-skill-lock.png"
      size="mediumSmall"
      className={styles.emptyLock}
    />

    <Icon
      name="empty-skill-fade.png"
      size="mediumSmall"
      className={styles.emptyFade}
    />
  </Icon>
);

export default EmptySkill;
