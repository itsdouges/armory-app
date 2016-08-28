import { PropTypes } from 'react';
import styles from './styles.less';
import cx from 'classnames/bind';
import SvgIcon from 'common/components/Icon/Svg';
import ProgressIcon from 'common/components/Icon/Progress';

import Message from 'common/components/Message';

const Textbox = (props) => {
  const validity = props.valid ? <SvgIcon name="done" /> : <SvgIcon name="clear" />;

  const status = props.valid ? 'valid' : 'invalid';

  return (
    <div className={cx(props.containerClassName, styles.container)}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}

      <input
        disabled={props.busy}
        autoFocus={props.autofocus}
        required={props.required}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type || 'text'}
        className={cx(styles.textbox, props.showStatus && status)}
      />

      {props.error &&
        <Message className={styles.error} type="error" size="small">
          {props.error}
        </Message>}

      {props.iconRight}

      {props.showStatus &&
        <div className={styles.validityContainer}>
          {props.busy ? <ProgressIcon size="micro" /> : validity}
        </div>}
    </div>
  );
};

Textbox.propTypes = {
  autofocus: PropTypes.bool,
  showStatus: PropTypes.bool,
  valid: PropTypes.bool,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  busy: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  containerClassName: PropTypes.string,
  error: PropTypes.any,
  value: PropTypes.string,
  id: PropTypes.string,
  iconRight: PropTypes.any,
};

export default Textbox;
