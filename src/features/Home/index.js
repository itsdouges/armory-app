import Head from 'common/components/Head';

import heroImage from 'assets/images/logo.png';
import SearchBar from 'common/components/SearchBar';
import Container from 'common/components/Container';

import styles from './styles.less';
import News from './components/News';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';

const Home = () => (
  <div className={styles.root}>
    <Head title="Armor Up" />

    <Container>
      <div className={styles.heroImageContainer}>
        <img
          alt="Guild Wars 2 Armory"
          title="Guild Wars 2 Armory"
          className={styles.heroImage} src={heroImage}
        />

        <div className={styles.searchContainer}>
          <SearchBar className={styles.searchBar} />
        </div>
      </div>

      <hr />

      <Introduction className={styles.introContainer} />

      <hr />

      <RandomCharacter />

      <hr />

      <News className={styles.newsContainer} />
    </Container>
  </div>
);

export default Home;
