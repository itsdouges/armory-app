import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const Attribute = ({ value, name }) => (
  <div className={styles.root}>
    <i className={cx('icon', name)} />
    <span title={name}>{value}</span>
  </div>
);

Attribute.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
};

export default Attribute;
