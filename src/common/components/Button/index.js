import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

import ProgressIcon from 'common/components/Icon/Progress';

const Button = (props) => (
  <button
    className={cx('container', {
      primary: props.primary,
      secondary: !props.primary,
      disabled: props.busy || props.disabled,
    })}
    disabled={props.busy || props.disabled}
    onClick={props.onClick}
  >
    {props.busy ? <ProgressIcon /> : props.children}
  </button>
);

Button.defaultProps = {
  onClick: () => {},
};

Button.propTypes = {
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.any,
  containerClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
