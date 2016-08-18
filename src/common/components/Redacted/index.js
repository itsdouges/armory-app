import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Redacted = ({ children, redact }) => (
  <span className={cx({ redact })}>
    {children}
  </span>
);


Redacted.propTypes = {
  children: PropTypes.node,
  redact: PropTypes.bool,
};

export default Redacted;
