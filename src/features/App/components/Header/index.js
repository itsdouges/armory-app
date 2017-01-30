// @flow

import { Component } from 'react';
import { Link } from 'react-router';
import T from 'i18n-react';
import cx from 'classnames';

import StickyHeader from 'common/components/StickyHeader';
import armoryLogo from 'assets/images/gw_logo.png';
import config from 'config';

const heroImage = config.features.christmas ? 'xmas-hero.jpg' : 'gw_bgrd.png';
const headerBg = require(`assets/images/${heroImage}`);

import buttonStyles from 'common/components/Button/styles.less';
import Flair from 'common/components/Flair';
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

type LinkDefs = {
  name: any,
  to: string,
};

const STATIC_LINKS = [{
  name: <Flair type="new">{T.translate('leaderboards.name')}</Flair>,
  to: '/leaderboards/pvp',
}, {
  name: T.translate('stats.name'),
  to: '/statistics',
}];

const UNAUTHENTICATED_STATIC_LINKS = [{
  name: T.translate('login.name'),
  to: '/login',
}, {
  name: <span className={buttonStyles.cta}>{T.translate('join.name')}</span>,
  to: '/join',
}];

const AUTHENTICATED_STATIC_LINKS = [{
  name: T.translate('settings.name'),
  to: '/settings',
}];

const LOADING_INDICATOR = [{
  name: <ProgressIcon key="progress" size="nano" />,
  to: '',
}];

const buildLinks = ({ checkingAuthentication, authenticated, alias }): Array<LinkDefs> => {
  let linksForContext;

  if (checkingAuthentication) {
    linksForContext = LOADING_INDICATOR;
  } else {
    linksForContext = authenticated
      ? [
        ...AUTHENTICATED_STATIC_LINKS,
        ...[{
          name: alias,
          to: `/${alias}`,
        }],
      ] : UNAUTHENTICATED_STATIC_LINKS;
  }

  return [
    ...STATIC_LINKS,
    ...linksForContext,
  ];
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
    const links = buildLinks({ authenticated, checkingAuthentication, alias });
    const smallIconName = config.features.christmas ? 'gift.png' : 'logo-small.png';

    const header = (
      <Container className={styles.innerContainer}>
        <Link to="/" style={{ opacity: (compact || showExtraHeaderItems) ? 1 : 0 }}>
          <Icon className={styles.icon} name={smallIconName} size="mini" />
          <h1>Guild Wars 2 Armory</h1>
        </Link>

        <div
          className={styles.searchContainer}
          style={{ opacity: (compact || showExtraHeaderItems) ? 1 : 0 }}
        >
          <SearchBar simple className={styles.smallSearchBar} />
        </div>

        <LangPicker key="langPicker" />

        <ResponsiveMenu
          className={styles.linkContainer}
          itemClassName={cx(styles.link, { [styles.christmas]: config.features.christmas })}
        >
          {links.map(({ to, name }) => <Link to={to} key={to}>{name}</Link>)}
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
              className={styles.armoryLogo} src={armoryLogo}
            />

            <SearchBar className={styles.searchBar} />
          </Container>
        </div>
      </StickyHeader>
    );
  }
}
