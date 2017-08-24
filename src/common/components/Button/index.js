// @flow

import styles from './styles.less';
import React from 'react';
import cx from 'classnames';

import ProgressIcon from 'common/components/Icon/Progress';

type ButtonProps = {
  className?: string,
  type?: 'cta' | 'ctaMinimal' | 'neutral' | 'minimal' | 'primary' | 'secondary',
  disabled?: boolean,
  onClick?: Function,
  children?: any,
  busy?: boolean,
};

const Button = (props: ButtonProps) => (
  <button
    className={cx(styles.button, props.className, styles[props.type], {
      [styles.disabled]: props.busy || props.disabled,
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
