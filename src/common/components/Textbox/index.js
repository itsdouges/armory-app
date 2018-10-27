// @flow

import React from 'react';
import styles from './styles.less';
import cx from 'classnames';
import SvgIcon from 'common/components/Icon/Svg';
import ProgressIcon from 'common/components/Icon/Progress';

import Message from 'common/components/Message';

type TextboxProps = {
  valid?: boolean,
  label: string,
  containerClassName?: string,
  id: string,
  busy?: boolean,
  error?: string,
  iconLeft?: any,
  iconRight?: any,
  showStatus?: boolean,
  type?: string,
  autoSelect?: boolean,
  singleClickSelect?: boolean,
  placeholder?: string,
  className?: string,
};

const Textbox = ({
  valid,
  label,
  containerClassName,
  id,
  busy,
  error,
  iconLeft,
  iconRight,
  showStatus,
  type,
  autoSelect,
  singleClickSelect,
  placeholder,
  className,
  ...props
}: TextboxProps) => {
  const validity = valid ? <SvgIcon name="done" /> : <SvgIcon name="clear" />;
  const status = valid ? 'valid' : 'invalid';

  return (
    <div className={cx(containerClassName, styles.container)}>
      {label && <label htmlFor={id}>{label}</label>}

      {iconLeft}

      <input
        {...props}
        onClick={singleClickSelect && (e => e.target.select())}
        ref={autoSelect ? c => c && c.select() : undefined}
        disabled={busy}
        id={id}
        type={type || 'text'}
        className={cx(styles.textbox, showStatus && status, className)}
        placeholder={placeholder || label}
      />

      {error && (
        <Message className={styles.error} type="error" size="small">
          {error}
        </Message>
      )}

      {iconRight}

      {showStatus && (
        <div className={styles.validityContainer}>
          {busy ? <ProgressIcon size="micro" /> : validity}
        </div>
      )}
    </div>
  );
};

export default Textbox;
