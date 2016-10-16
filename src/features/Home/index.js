import Head from 'common/components/Head';

import heroImage from 'assets/images/gw2-logo.jpg';
import SearchBar from 'common/components/SearchBar';
import Container from 'common/components/Container';
import ContentCard from 'common/components/ContentCard';

import styles from './styles.less';
import News from './components/News';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';

const Home = () => (
  <div className={styles.root}>
    <Head title="Armor Up" />

    <div className={styles.heroImageContainer}>
      <Container>
        <img
          alt="Guild Wars 2 Armory"
          title="Guild Wars 2 Armory"
          className={styles.heroImage} src={heroImage}
        />

        <SearchBar className={styles.searchBar} />
      </Container>
    </div>

    <div className={styles.introBackgroundContainer}>
      <div className={styles.introBackground} />

      <Container className={styles.atfContainer}>
        <Introduction className={styles.introContainer} />
        <RandomCharacter />
      </Container>
    </div>

    <div className={styles.guildsContainer}>
      <ContentCard type="guilds" content={{ name: 'Ultra Lux', tag: 'LUX' }} />
      <ContentCard type="guilds" content={{ name: 'Guild Of Madness', tag: 'GOM' }} />
      <ContentCard type="guilds" content={{ name: 'Tyrian Nomads', tag: 'TNM' }} />
      <ContentCard type="guilds" content={{ name: 'Haus Bergfried', tag: 'BERG' }} />
    </div>

    <Container>
      <hr />

      <News className={styles.newsContainer} />
    </Container>
  </div>
);

export default Home;
