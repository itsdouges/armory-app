import { PropTypes } from 'react';

import Card from 'common/components/Card';
import styles from './styles.less';
import cx from 'classnames';
import { Link } from 'react-router';

const Introduction = ({ className, ...props }) => (
  <div {...props} className={cx(styles.root, className)}>
    <h2>What is Guild Wars 2 Armory?</h2>

    <Card className={styles.text}>
      Guild Wars 2 Armory is an opt-in utility that you can use to find,
      view, and share Guild Wars 2 user, character, and guild pages.

      <br /><br />

      Can't find your characters or guilds? You'll need to opt-in first.
      <Link to="join"> Create an account</Link>, then add your api token(s)!
    </Card>
  </div>
);

Introduction.propTypes = {
  className: PropTypes.string,
};

export default Introduction;
