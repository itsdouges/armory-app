import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Button = (props) => (
  <button
    className={cx('container', {
      primary: props.primary,
      secondary: !props.primary,
      disabled: props.disabled,
    })}
    disabled={props.busy || props.disabled}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.any,
  containerClassName: PropTypes.string,
};

export default Button;
