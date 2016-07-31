import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Textbox = (props) => (
  <div className={cx(props.containerClassName || 'container')}>
    {props.label && <label for={props.id}>{props.label}</label>}

    <input
      id={props.id}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      type={props.type || 'text'}
      className={styles.textbox}
    />
  </div>
);

Textbox.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  busy: PropTypes.bool,
  type: PropTypes.string,
  onChange: PropTypes.func,
  containerClassName: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
};

export default Textbox;
