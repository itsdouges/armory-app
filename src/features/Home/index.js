import styles from './styles.less';
import heroImage from 'assets/images/logo.png';

const Home = (props) => (
  <div className={styles.container}>
    <img
      alt="Guild Wars 2 Armory"
      title="Guild Wars 2 Armory"
      className={styles.heroImage} src={heroImage}
    />
  </div>
);

export default Home;
