import { PropTypes } from 'react';
import T from 'i18n-react';
import cx from 'classnames';

import styles from './styles.less';

const Introduction = ({ className, ...props }) => (
  <div {...props} className={cx(styles.root, className)}>
    <h2>{T.translate('home.whatIs.title')} Guild Wars 2 Armory?</h2>

    <div className={styles.text}>
      {T.translate('home.whatIs.text')}
    </div>
  </div>
);

Introduction.propTypes = {
  className: PropTypes.string,
};

export default Introduction;
