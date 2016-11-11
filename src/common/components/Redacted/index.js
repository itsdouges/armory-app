// @flow

import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

type Props = {
  children?: any,
  redact: bool,
};

const Redacted = ({ children, redact }: Props) => (
  <span className={cx({ redact })}>
    {children}
  </span>
);

export default Redacted;
