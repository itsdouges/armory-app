import styles from './styles.less';
import Container from 'common/components/Container';

const Footer = () => (
  <Container className={styles.footer}>
    © 2015-2016 gw2armory.com © 2010–2016 ArenaNet, LLC. All
    rights reserved. Guild Wars, Guild Wars 2, Guild Wars 2:
    Heart of Thorns, ArenaNet, NCSOFT, the Interlocking NC Logo,
    and all associated logos and designs are trademarks or registered
    trademarks of NCSOFT Corporation. All other trademarks are the property
    of their respective owners.
  </Container>
);

export default Footer;
