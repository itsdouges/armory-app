import { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import get from 'lodash/get';
import T from 'i18n-react';

import styles from './styles.less';

import { addEvent } from 'lib/dom';

import heroImage from 'assets/images/gw_logo.png';

import LangPicker from '../LangPicker';
import ResponsiveMenu from 'common/components/ResponsiveMenu';
import Container from 'common/components/Container';
import Icon from 'common/components/Icon';
import ProgressIcon from 'common/components/Icon/Progress';
import SearchBar from 'common/components/SearchBar';

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
    if (!this.initialised) {
      this.detatch = addEvent('scroll', this.onScroll);
    }

    this.onScroll();
    this.initialised = true;
  }

  render () {
    const { authenticated, alias, checkingAuthentication, compact } = this.props;
    const { stickyHeader } = this.state;

    const stickyHeaderStyles = {
      height: get(this._root, 'offsetHeight') || get(this._fixed, 'offsetHeight'),
      top: get(this._fixed, 'offsetHeight'),
    };

    const authenticatedLinks = [
      <Link key="alias" to={`/${alias}`}>{alias}</Link>,
      <Link key="settings" to="/settings">{T.translate('settings.name')}</Link>,
    ];

    const unauthenticatedLinks = [
      <Link key="login" to="/login">{T.translate('login.name')}</Link>,
      <Link key="join" to="/join">{T.translate('join.name')}</Link>,
    ];

    const linksForContext = authenticated ? authenticatedLinks : unauthenticatedLinks;

    const links = [
      ...checkingAuthentication ? [<ProgressIcon key="progress" size="nano" />] : linksForContext,
      <Link key="stats" to="/statistics">{T.translate('stats.name')}</Link>,
      <LangPicker key="langPicker" />,
    ];

    return (
      <div className={cx(styles.root)} ref={(e) => (this._root = e)}>
        {compact && <div style={{ height: stickyHeaderStyles.top }} />}

        <div className={styles.fixed} ref={(e) => (this._fixed = e)}>
          <Container className={styles.innerContainer}>
            <Link to="/" style={{ opacity: (compact || stickyHeader) ? 1 : 0 }}>
              <Icon className={styles.icon} name="logo-small.png" size="mini" />
              <h1>Guild Wars 2 Armory</h1>
            </Link>

            <div
              className={styles.searchContainer}
              style={{ opacity: (compact || stickyHeader) ? 1 : 0 }}
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
