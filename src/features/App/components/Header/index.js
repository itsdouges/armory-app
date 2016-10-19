import { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './styles.less';

import { addEvent } from 'lib/dom';

import heroImage from 'assets/images/gw_logo.png';

import ResponsiveMenu from 'common/components/ResponsiveMenu';
import Container from 'common/components/Container';
import Icon from 'common/components/Icon';
import ProgressIcon from 'common/components/Icon/Progress';
import SearchBar from 'common/components/SearchBar';

const DEFAULT_LINKS = [
  <Link key="stats" to="/stats">Stats</Link>,
  <Link key="settings" to="/settings">Settings</Link>,
];

export default class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
    alias: PropTypes.string,
    checkingAuthentication: PropTypes.bool,
    compact: PropTypes.bool,
  };

  state = {
    stickyHeader: false,
    stickyHeaderStyles: {},
    compactSpacer: {},
  };

  componentDidMount () {
    this.initStickyHeader();
  }

  componentDidUpdate (prevProps) {
    if (prevProps.compact === this.props.compact) {
      return;
    }

    this.initStickyHeader();
  }

  componentWillUnmount () {
    this.detatch();
  }

  onScroll = () => {
    const { stickyHeader } = this.state;

    const stickyHeaderHeight = this._fixed.offsetHeight;
    const headerHeight = this._root.offsetHeight;
    const headerBounds = this._root.getBoundingClientRect();

    const sticky = ((headerHeight + headerBounds.top) - stickyHeaderHeight) <= 0;

    if (sticky && !stickyHeader) {
      this.setState({
        stickyHeader: true,
      });
    } else if (!this.props.compact && !sticky && stickyHeader) {
      this.setState({
        stickyHeader: false,
      });
    }
  };

  initStickyHeader () {
    this.setState({
      stickyHeaderStyles: {
        height: this._root.offsetHeight || this._fixed.offsetHeight,
        top: this._fixed.offsetHeight,
      },
      compactSpacer: {
        height: this._fixed.offsetHeight,
      },
    });

    if (!this.initialised) {
      this.detatch = addEvent('scroll', this.onScroll);
    }

    this.onScroll();
    this.initialised = true;
  }

  render () {
    const { authenticated, alias, checkingAuthentication, compact } = this.props;
    const { stickyHeader, stickyHeaderStyles, compactSpacer } = this.state;

    const authenticatedLinks = [
      <Link key="alias" to={`/${alias}`}>{alias}</Link>,
    ];

    const unauthenticatedLinks = [
      <Link key="login" to="/login">Log in</Link>,
      <Link key="join" to="/join">Join</Link>,
    ];

    const linksForContext = authenticated ? authenticatedLinks : unauthenticatedLinks;

    const links = [
      ...checkingAuthentication ? [<ProgressIcon key="progress" size="nano" />] : linksForContext,
      ...DEFAULT_LINKS,
    ];

    return (
      <div className={cx(styles.root)} ref={(e) => (this._root = e)}>
        {compact && <div style={{ height: compactSpacer.height }} />}

        <div className={styles.fixed} ref={(e) => (this._fixed = e)}>
          <Container className={styles.innerContainer}>
            <Link to="/" style={{ opacity: stickyHeader ? 1 : 0 }}>
              <Icon className={styles.icon} name="logo-small.png" size="mini" />
              <h1>Guild Wars 2 Armory</h1>
            </Link>

            <div
              className={styles.searchContainer}
              style={{ opacity: stickyHeader ? 1 : 0 }}
            >
              <SearchBar simple />
            </div>

            <ResponsiveMenu className={styles.linkContainer} itemClassName={styles.link}>
              {links}
            </ResponsiveMenu>
          </Container>
        </div>

        {compact || <div className={styles.anotherBackground} />}
        {compact || <div className={styles.background} style={{ opacity: stickyHeader ? 0 : 1 }} />}

        <div
          className={styles.backgroundFloat}
          style={stickyHeaderStyles}
        />

        <div className={styles.bigSearchContainer} style={{ display: compact ? 'none' : '' }}>
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
