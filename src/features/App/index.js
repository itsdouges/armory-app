import { Component, PropTypes } from 'react';
import styles from './styles.less';
import Footer from './Footer';
import Header from './Header';

class App extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return (
      <div className={styles.app}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
