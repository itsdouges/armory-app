// @flow

import styles from './styles.less';
import cx from 'classnames';

type Props = {
  children?: any,
  redact: boolean,
};

const Redacted = ({ children, redact }: Props) => (
  <span className={cx({ [styles.redact]: redact })}>
    {children}
  </span>
);

export default Redacted;
