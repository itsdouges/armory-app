import { Component } from 'react';
import get from 'lodash/get';

import Head from 'common/components/Head';
import heroImage from 'assets/images/gw_logo.png';
import SearchBar from 'common/components/SearchBar';
import Container from 'common/components/Container';
import ContentCard from 'common/components/ContentCard';
import { Link } from 'react-router';

import styles from './styles.less';
import News from './components/News';
import Introduction from './components/Introduction';
import RandomCharacter from './components/RandomCharacter';

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
    const guilds = get(this.state, 'guilds', [undefined, undefined, undefined, undefined]);

    return (
      <div className={styles.root}>
        <Head title="Armor Up" />

        <div id="search-box" className={styles.searchContainer}>
          <Container>
            <img
              alt="Guild Wars 2 Armory"
              title="Guild Wars 2 Armory"
              className={styles.heroImage} src={heroImage}
            />

            <SearchBar className={styles.searchBar} />
          </Container>
        </div>

        <div className={styles.introBackground}>
          <Container className={styles.atfContainer}>
            <Introduction className={styles.introContainer} />
            <RandomCharacter />
          </Container>
        </div>

        <ul className={styles.guildsContainer}>
          {guilds.map((guild, index) => (
            <li key={index}>
              <Link to={`g/${guild && guild.name}`}>
                <ContentCard type="guilds" content={guild} />
              </Link>
            </li>
          ))}
        </ul>

        <Container>
          <hr />

          <News className={styles.newsContainer} />
        </Container>
      </div>
    );
  }
}
