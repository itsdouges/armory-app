import { PropTypes } from 'react';
import styles from './styles.less';
import Container from 'common/components/Container';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import Textbox from 'common/components/Textbox';
import { Link, browserHistory } from 'react-router';

function search (event) {
  event.preventDefault();
  const filter = event.nativeEvent.target[0].value;
  browserHistory.push(`/search/${filter}`);
}

const Header = ({ authenticated, alias }) => {
  const links = authenticated ?
    [<Link to={`/${alias}`}>{alias}</Link>, <Link to="/settings">Settings</Link>] :
    [<Link to="/join">Join</Link>, <Link to="/login">Login</Link>];

  return (
    <Card className={styles.container}>
      <div className={styles.heroImage}></div>

      <Container className={styles.innerContainer}>
        <Link to="/"><Icon name="logo-small.png" size="mini" /></Link>

        <form className={styles.formContainer} onSubmit={search}>
          <Textbox
            required
            placeholder="Search Guild Wars 2 Armory"
            containerClassName={styles.textBoxContainer}
          />

          <button className={styles.searchButton}>SEARCH</button>
        </form>

        <ul className={styles.linkContainer}>
          {links.map((link, index) => <li className={styles.link} key={index}>{link}</li>)}
        </ul>
      </Container>
    </Card>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool,
  alias: PropTypes.string,
};

export default Header;
