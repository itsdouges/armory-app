import { PropTypes } from 'react';
import styles from './styles.less';

const ApiToken = ({ token: { accountName, primary, permissions }, remove, setPrimary }) => (
  <div className={styles.root}>
    <div onClick={setPrimary}>
      {primary.toString()}
    </div>

    <div className={styles.information}>
      <strong>{`${accountName}${primary ? ' (primary)' : ''}`}</strong>
      <div>
        {permissions.split(',').join(' | ')}
      </div>
    </div>

    <div onClick={remove}>
      del
    </div>
  </div>
);

ApiToken.propTypes = {
  token: PropTypes.object,
  remove: PropTypes.func,
  setPrimary: PropTypes.func,
};

export default ApiToken;
