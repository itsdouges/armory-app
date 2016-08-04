import { PropTypes } from 'react';
import styles from './styles.less';
import Container from 'common/components/Container';
import Card from 'common/components/Card';
import Icon from 'common/components/Icon';
import Textbox from 'common/components/Textbox';
import { Link } from 'react-router';

const Header = ({ authenticated, alias }) => {
  const links = authenticated ?
    [<Link to="/me">{alias}</Link>, <Link to="/me/settings">Settings</Link>] :
    [<Link to="/join">Join</Link>, <Link to="/in">Login</Link>];

  return (
    <Card className={styles.container}>
      <div className={styles.heroImage}></div>

      <Container className={styles.innerContainer}>
        <Link to="/"><Icon name="logo-small.png" size="mini" /></Link>

        <Textbox
          placeholder="Search Guild Wars 2 Armory"
          containerClassName={styles.textBoxContainer}
        />

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
