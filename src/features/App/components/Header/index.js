import { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './styles.less';

import { addEvent } from 'lib/dom';

import heroImage from 'assets/images/gw_logo.png';
import Container from 'common/components/Container';
import Icon from 'common/components/Icon';
import ProgressIcon from 'common/components/Icon/Progress';
import SearchBar from 'common/components/SearchBar';

const DEFAULT_LINKS = [
  <Link to="/stats">STATS</Link>,
];

export default class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    alias: PropTypes.string,
    checkingAuthentication: PropTypes.bool,
    simple: PropTypes.bool,
  };

  state = {
    translateY: 0,
  };

  componentDidMount () {
    this.detatch = addEvent('scroll', this.onScroll);
  }

  componentWillUnmount () {
    this.detatch();
  }

  onScroll = () => {
    const fixedHeight = this._fixed.offsetHeight;
    const headerHeight = this._root.offsetHeight;
    const headerBounds = this._root.getBoundingClientRect();

    const stick = ((headerHeight + headerBounds.top) - fixedHeight) <= 0;

    if (stick) {
      this.setState({
        position: 'fixed',
        bottom: window.innerHeight - fixedHeight,
      });
    } else {
      this.setState({
        position: 'absolute',
        bottom: 'inherit',
      });
    }
  };

  render () {
    const { authenticated, alias, checkingAuthentication, simple } = this.props;

    const links = authenticated
      ? [<Link to={`/${alias}`}>{alias.toUpperCase()}</Link>, <Link to="/settings">SETTINGS</Link>]
      : [<Link to="/login">LOG IN</Link>, <Link to="/join">JOIN</Link>];

    return (
      <div className={cx(styles.root)} ref={(e) => (this._root = e)}>
        <div className={styles.fixed} ref={(e) => (this._fixed = e)}>
          <Container className={styles.innerContainer}>
            <Link to="/" key={0}>
              <Icon className={styles.icon} name="logo-small.png" size="mini" />
              <h1 key={1}>Guild Wars 2 Armory</h1>
            </Link>

            {!simple && <div className={styles.searchContainer}><SearchBar simple /></div>}

            <ul className={styles.linkContainer}>
              {!checkingAuthentication && links.map((link, index) =>
                <li className={styles.link} key={index}>{link}</li>)}
              {checkingAuthentication && (
                <li className={styles.link}><ProgressIcon size="micro" /></li>
              )}

              {DEFAULT_LINKS.map(
                (link, index) => <li className={styles.link} key={index}>{link}</li>
              )}
            </ul>
          </Container>
        </div>

        <div className={styles.background} style={{ ...this.state }} />

        <div className={styles.bigSearchContainer}>
          <Container>
            <img
              alt="Guild Wars 2 Armory"
              title="Guild Wars 2 Armory"
              className={styles.heroImage} src={heroImage}
            />

            <SearchBar className={styles.searchBar} />
          </Container>
        </div>
      </div>
    );
  }
}
