// @flow

import styles from './styles.less';
import Container from 'common/components/Container';
import SvgIcon from 'common/components/Icon/Svg';
import Icon from 'common/components/Icon';

const Footer = () => (
  <footer className={styles.root}>
    <Container className={styles.container}>
      <div>
        © 2015-2017 gw2armory.com © 2010–2017 ArenaNet, LLC. All
        rights reserved. Guild Wars, Guild Wars 2, Guild Wars 2:
        Heart of Thorns, ArenaNet, NCSOFT, the Interlocking NC Logo,
        and all associated logos and designs are trademarks or registered
        trademarks of NCSOFT Corporation. All other trademarks are the property
        of their respective owners.
      </div>

      <div className={styles.linkContainer}>
        <a title="Check out the code on Github!" href="https://github.com/madou/armory-react">
          <SvgIcon name="github" />
        </a>

        <a title="Found something weird? Want to make a suggestion? Come post on reddit!" href="https://www.reddit.com/r/gw2armory">
          <SvgIcon name="reddit" />
        </a>

        <a title="Donations keep the site running!" href="https://paypal.me/gw2armory">
          <Icon name="paypal.png" size="" className={styles.paypal} />
        </a>
      </div>
    </Container>
  </footer>
);

export default Footer;
