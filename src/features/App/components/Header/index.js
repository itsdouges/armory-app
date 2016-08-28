import { PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './styles.less';
import Container from 'common/components/Container';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import ProgressIcon from 'common/components/Icon/Progress';
import SearchBar from 'common/components/SearchBar';

const Header = ({ authenticated, alias, checkingAuthentication, simple }) => {
  const links = authenticated ?
    [<Link to={`/${alias}`}>{alias.toUpperCase()}</Link>, <Link to="/settings">SETTINGS</Link>] :
    [<Link to="/join">JOIN</Link>, <Link to="/login">LOGIN</Link>];

  return (
    <Card className={cx(styles.root, simple && styles.simple)}>
      <div className={styles.heroImage}></div>

      <Container className={styles.innerContainer}>
        <Link to="/" key={0}>
          <Icon className={styles.icon} name="logo-small.png" size="mini" />
          <h1 key={1}>Guild Wars 2 Armory</h1>
        </Link>

        {!simple && <SearchBar />}

        {checkingAuthentication ?
          <ProgressIcon size="micro" /> :
          <ul className={styles.linkContainer}>
            {links.map((link, index) => <li className={styles.link} key={index}>{link}</li>)}
          </ul>
        }
      </Container>
    </Card>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool,
  alias: PropTypes.string,
  checkingAuthentication: PropTypes.bool,
  simple: PropTypes.bool,
};

export default Header;
