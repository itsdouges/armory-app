// @flow

import cx from 'classnames';
import T from 'i18n-react';

import SvgIcon from 'common/components/Icon/Svg';
import styles from './styles.less';

type Props = {
  message: string,
  type: 'info' | 'error',
  dismiss: () => void,
  className?: string,
  iconName?: string,
};

const Notification = (props: Props) => (
  <div className={cx(styles.root, props.className, styles[props.type])}>
    {props.iconName && <SvgIcon name={props.iconName} size="mini" className={styles.leftIcon} />}
    <span className={styles.message}>{props.message}</span>

    <button title="Dismiss" onClick={props.dismiss} className={styles.button}>
      {T.translate('words.dismiss')}
    </button>
  </div>
);

export default Notification;
