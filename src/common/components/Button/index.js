import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Button = (props) => (
  <div className={cx('container', {
    primary: props.primary,
    secondary: !props.primary,
    disabled: props.disabled,
  })}>
    <button className={styles.button}></button>
    {props.children}
  </div>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  busy: PropTypes.bool,
  primary: PropTypes.bool,
  children: PropTypes.any,
  containerClassName: PropTypes.string,
};

export default Button;
