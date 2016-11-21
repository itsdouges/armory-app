// @flow

import Head from 'common/components/Head';
import Container from 'common/components/Container';

import styles from './styles.less';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';
import RandomGuilds from './components/RandomGuilds';

const Home = () => (
  <div className={styles.root}>
    <Head title="Armor Up" />

    <div className={styles.introBackground}>
      <Container className={styles.atfContainer}>
        <Introduction className={styles.introContainer} />
        <RandomCharacter />
      </Container>
    </div>

    <RandomGuilds />
  </div>
);

export default Home;
