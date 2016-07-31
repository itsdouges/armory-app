import { PropTypes } from 'react';
import styles from './styles.less';
import Footer from './Footer';
import Header from './Header';

const App = (props) => (
  <div className={styles.app}>
    <Header />
    {props.children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.any,
};

export default App;
