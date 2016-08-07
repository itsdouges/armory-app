import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import Message from 'common/components/Message';

const Textbox = (props) => {
  const validity = props.valid ? <div>yes</div> : <div>no</div>;

  return (
    <div className={cx(props.containerClassName || 'container')}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}

      <input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
        type={props.type || 'text'}
        className={styles.textbox}
      />

      {props.error && <Message className={styles.error} type="error" small>{props.error}</Message>}

      {props.showStatus && <div className={styles.validityContainer}>{validity}</div>}
    </div>
  );
};

Textbox.propTypes = {
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
};

export default Textbox;
