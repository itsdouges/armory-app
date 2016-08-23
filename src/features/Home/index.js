import styles from './styles.less';
import heroImage from 'assets/images/logo.png';
import Title from 'react-title-component';

const Home = () => (
  <div className={styles.root}>
    <Title render={(title) => `Armor Up${title}`} />

    <img
      alt="Guild Wars 2 Armory"
      title="Guild Wars 2 Armory"
      className={styles.heroImage} src={heroImage}
    />
  </div>
);

export default Home;
