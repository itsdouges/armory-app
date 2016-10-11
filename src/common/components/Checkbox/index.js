import { PropTypes } from 'react';

import styles from './styles.less';

const Checkbox = ({ label, ...props }) => (
  <div className={styles.root}>
    <label>
      <input {...props} type="checkbox" className={styles.checkbox} />
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  label: PropTypes.string,
};

export default Checkbox;
