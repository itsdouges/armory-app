// @flow

import styles from './styles.less';
import Container from 'common/components/Container';
import SvgIcon from 'common/components/Icon/Svg';
import Icon from 'common/components/Icon';

const iconLinks = [{
  title: 'Check out the code on Github!',
  url: 'https://github.com/madou/armory-react',
  icon: <SvgIcon name="github" />,
}, {
  title: 'Found something weird? Want to make a suggestion? Come post on reddit!',
  url: 'https://www.reddit.com/r/gw2armory',
  icon: <SvgIcon name="reddit" />,
}, {
  title: 'Donations keep the site running!',
  url: 'https://paypal.me/gw2armory',
  icon: <Icon name="paypal.png" size="" className={styles.paypal} />,
}];

const textLinks = [{
  title: 'CHANGELOG',
  url: 'https://github.com/madou/armory-react/blob/master/CHANGELOG.md',
  text: 'Changelog',
}, {
  title: 'Tweet me @itsmadou',
  url: 'https://twitter.com/itsmadou',
  text: 'Twitter',
}, {
  title: 'Go to the official gw2 site',
  url: 'https://guildwars2.com',
  text: 'Guild Wars 2',
}, {
  title: 'GW2 Reddit',
  url: 'https://www.reddit.com/r/guildwars2',
  text: 'GW2 Reddit',
}];

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

      <ul className={styles.linkContainer}>
        {iconLinks.map((link) => (
          <li key={link.title}>
            <a target="_blank" rel="noopener noreferrer" title={link.title} href={link.url}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </Container>

    <Container>
      <ul className={styles.linkContainer}>
        {textLinks.map((link) => (
          <li key={link.title}>
            <a target="_blank" rel="noopener noreferrer" title={link.title} href={link.url}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  </footer>
);

export default Footer;
