// @flow

import { Component } from 'react';
import { Link } from 'react-router';
import T from 'i18n-react';

import StickyHeader from 'common/components/StickyHeader';
import heroImage from 'assets/images/gw_logo.png';
import headerBg from 'assets/images/gw_bgrd.png';

import ResponsiveMenu from 'common/components/ResponsiveMenu';
import Container from 'common/components/Container';
import Icon from 'common/components/Icon';
import ProgressIcon from 'common/components/Icon/Progress';
import SearchBar from 'common/components/SearchBar';

import styles from './styles.less';
import LangPicker from '../LangPicker';

type Props = {
  authenticated: boolean,
  alias: string,
  checkingAuthentication: boolean,
  compact: boolean,
};

type State = {
  showExtraHeaderItems: boolean,
};

export default class Header extends Component {
  props: Props;

  state: State = {
    showExtraHeaderItems: false,
  };

  onSticky = (isSticky: boolean) => {
    this.setState({
      showExtraHeaderItems: isSticky,
    });
  };

  render () {
    const { authenticated, alias, checkingAuthentication, compact } = this.props;
    const { showExtraHeaderItems } = this.state;

    const authenticatedLinks = [
      <Link key="alias" to={`/${alias}`}>{alias}</Link>,
      <Link key="settings" to="/settings">{T.translate('settings.name')}</Link>,
    ];

    const unauthenticatedLinks = [
      <Link key="join" to="/join">{T.translate('join.name')}</Link>,
      <Link key="login" to="/login">{T.translate('login.name')}</Link>,
    ];

    const linksForContext = authenticated ? authenticatedLinks : unauthenticatedLinks;

    const links = [
      ...checkingAuthentication ? [<ProgressIcon key="progress" size="nano" />] : linksForContext,
      <Link key="stats" to="/statistics">{T.translate('stats.name')}</Link>,
      <LangPicker key="langPicker" />,
    ];

    const header = (
      <Container className={styles.innerContainer}>
        <Link to="/" style={{ opacity: (compact || showExtraHeaderItems) ? 1 : 0 }}>
          <Icon className={styles.icon} name="logo-small.png" size="mini" />
          <h1>Guild Wars 2 Armory</h1>
        </Link>

        <div
          className={styles.searchContainer}
          style={{ opacity: (compact || showExtraHeaderItems) ? 1 : 0 }}
        >
          <SearchBar simple />
        </div>

        <ResponsiveMenu className={styles.linkContainer} itemClassName={styles.link}>
          {links}
        </ResponsiveMenu>
      </Container>
    );

    return (
      <StickyHeader
        header={header}
        backgroundSrc={headerBg}
        headerOnly={compact}
        onSticky={this.onSticky}
      >
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
      </StickyHeader>
    );
  }
}
