// @flow

import Head from 'common/components/Head';
import Container from 'common/components/Container';

import config from 'config';

import styles from './styles.less';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';
import RandomGuilds from './components/RandomGuilds';
import DisplayAd from 'common/components/DisplayAd';

const Home = () => (
  <div className={styles.root}>
    <Head title={config.features.christmas ? 'Merry Wintersday!' : 'Armor Up'} />

    <div className={styles.introBackground}>
      <Container className={styles.atfContainer}>
        <Introduction className={styles.introContainer} />
        <RandomCharacter />
      </Container>
    </div>

    <RandomGuilds />

    <DisplayAd className={styles.ad} />
  </div>
);

export default Home;
