// @flow

import styles from './styles.less';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

import ProgressIcon from 'common/components/Icon/Progress';

type ButtonProps = {
  className?: string,
  type?: string,
  disabled?: boolean,
  onClick?: Function,
  children?: any,
  busy?: boolean,
};

const Button = (props: ButtonProps) => (
  <button
    className={cx('button', props.className, props.type, {
      disabled: props.busy || props.disabled,
    })}
    disabled={props.busy || props.disabled}
    onClick={props.onClick}
  >
    {props.busy ? <ProgressIcon className={styles.progress} /> : props.children}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
  type: 'neutral',
};

export default Button;
