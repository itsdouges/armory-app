import { Component } from 'react';

import Head from 'common/components/Head';
import Container from 'common/components/Container';


import styles from './styles.less';
import News from './components/News';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';
import RandomGuilds from './components/RandomGuilds';

export default class Home extends Component {
  state = {
    guilds: undefined,
  };

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        guilds: [
          { name: 'Ultra Lux', tag: 'LUX' },
          { name: 'Guild Of Madness', tag: 'GOM' },
          { name: 'Tyrian Nomads', tag: 'TNM' },
          { name: 'Haus Bergfried', tag: 'BERG' },
        ],
      });
    }, 1500);
  }

  render () {
    return (
      <div className={styles.root}>
        <Head title="Armor Up" />

        <div className={styles.introBackground}>
          <Container className={styles.atfContainer}>
            <Introduction className={styles.introContainer} />
            <RandomCharacter />
          </Container>
        </div>

        <RandomGuilds />

        <Container>
          <hr />

          <News className={styles.newsContainer} />
        </Container>
      </div>
    );
  }
}
