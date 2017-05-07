// @flow

import cx from 'classnames';

import Icon from 'common/components/Icon';
import styles from './styles.less';

type Props = {
  className?: string,
  size?: number,
};

const EmptySkill = ({ className, size, ...props }: Props) => (
  <Icon
    size="mediumSmall"
    className={cx(styles.skill, styles.empty, className)}
    sizePx={size}
    {...props}
  >
    <Icon
      name="empty-skill-lock.png"
      size="mediumSmall"
      sizePx={size}
      className={styles.emptyLock}
    />

    <Icon
      name="empty-skill-fade.png"
      size="mediumSmall"
      sizePx={size}
      className={styles.emptyFade}
    />
  </Icon>
);

export default EmptySkill;
