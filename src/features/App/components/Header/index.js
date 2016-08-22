import { PropTypes } from 'react';
import styles from './styles.less';
import Container from 'common/components/Container';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import Textbox from 'common/components/Textbox';
import { Link, browserHistory } from 'react-router';
import SvgIcon from 'common/components/Icon/Svg';
import ProgressIcon from 'common/components/Icon/Progress';

function search (event) {
  event.preventDefault();
  const filter = event.nativeEvent.target[0].value;
  browserHistory.push(`/search/${filter}`);
}

const Header = ({ authenticated, alias, checkingAuthentication }) => {
  const links = authenticated ?
    [<Link to={`/${alias}`}>{alias.toUpperCase()}</Link>, <Link to="/settings">SETTINGS</Link>] :
    [<Link to="/join">JOIN</Link>, <Link to="/login">LOGIN</Link>];

  return (
    <Card className={styles.root}>
      <div className={styles.heroImage}></div>

      <Container className={styles.innerContainer}>
        <Link to="/"><Icon name="logo-small.png" size="mini" /></Link>
        <h1>Guild Wars 2 Armory</h1>

        <form className={styles.formContainer} onSubmit={search}>
          <Textbox
            autoFocus
            required
            placeholder="Search Guild Wars 2 Armory"
            containerClassName={styles.textBoxContainer}
          />

          <button className={styles.searchButton}>
            <SvgIcon button className={styles.searchIcon} name="search" size="micro" />
          </button>
        </form>

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
};

export default Header;
