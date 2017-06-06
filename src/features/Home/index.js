// @flow

import Head from 'common/components/Head';
import Container from 'common/components/Container';

import config from 'config';

import styles from './styles.less';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';
import RandomGuilds from './components/RandomGuilds';
import ResponsiveLeaderboard from 'common/components/DisplayAd/ResponsiveLeaderboard';

const Home = () => (
  <div className={styles.root}>
    <Head title={config.features.christmas ? 'Merry Wintersday!' : 'Armor Up'} />

    <div className={styles.introBackground}>
      <Container className={styles.atfContainer}>
        <Introduction className={styles.introContainer} />
        <RandomCharacter type="ofTheDay" />
      </Container>
    </div>
    <RandomGuilds />

    <ResponsiveLeaderboard className={styles.ad} />
  </div>
);

export default Home;
