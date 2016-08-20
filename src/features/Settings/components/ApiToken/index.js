import { PropTypes } from 'react';
import styles from './styles.less';
import SvgIcon from 'common/components/Icon/Svg';

const ApiToken = ({ token: { accountName, primary, permissions }, remove, setPrimary }) => (
  <div className={styles.root}>
    <div onClick={setPrimary}>
      <SvgIcon button name={primary ? 'cb-checked' : 'cb-clear'} />
    </div>

    <div className={styles.information}>
      <div className={styles.accountName}>{`${accountName}${primary ? ' (primary)' : ''}`}</div>

      <div className={styles.permissions}>
        {permissions.split(',').join(' | ')}
      </div>
    </div>

    <div onClick={remove}>
      <SvgIcon button name="delete-forever" />
    </div>
  </div>
);

ApiToken.propTypes = {
  token: PropTypes.object,
  remove: PropTypes.func,
  setPrimary: PropTypes.func,
};

export default ApiToken;
