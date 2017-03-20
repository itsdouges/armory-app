// @flow

import cx from 'classnames';

import SvgIcon from 'common/components/Icon/Svg';
import styles from './styles.less';

type Props = {
  message: string,
  type: 'info' | 'error',
  dismiss: () => void,
  className?: string,
};

const Notification = (props: Props) => (
  <div type={props.type} className={cx(styles.root, props.className)}>
    <span className={styles.message}>{props.message}</span>

    <button title="Dismiss" onClick={props.dismiss} className={styles.button}>
      <SvgIcon name="clear" size="mini" />
    </button>
  </div>
);

export default Notification;
