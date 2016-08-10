import { PropTypes } from 'react';
import styles from './styles.less';

const Attribute = ({ value, name }) => (
  <div className={styles.root}>
    <i className={styles[name]} />
    <span>{value}</span>
  </div>
);

Attribute.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
};

export default Attribute;
