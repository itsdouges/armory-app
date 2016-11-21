// @flow
/* eslint-disable jsx-a11y/label-has-for */
import styles from './styles.less';

type CheckboxProps = {
  label: string,
};

const Checkbox = ({ label, ...props }: CheckboxProps) => (
  <div className={styles.root}>
    <label>
      <input {...props} type="checkbox" className={styles.checkbox} />
      {label}
    </label>
  </div>
);

export default Checkbox;
