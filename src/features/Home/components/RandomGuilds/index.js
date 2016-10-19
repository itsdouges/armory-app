import axios from 'axios';
import { Component } from 'react';
import ContentCard from 'common/components/ContentCard';
import { Link } from 'react-router';
import get from 'lodash/get';

import config from 'config';

import styles from './styles.less';

export default class RandomGuilds extends Component {
  state = {
    guilds: undefined,
  };

  componentDidMount () {
    axios.get(`${config.api.endpoint}random/guilds/4`)
      .then(({ data }) => this.setState({ guilds: data }));
  }

  render () {
    const guilds = get(this.state, 'guilds', [undefined, undefined, undefined, undefined]);

    return (
      <ul className={styles.root}>
        {guilds.map((guild, index) => (
          <li key={index}>
            <Link to={`g/${guild && guild.name}`}>
              <ContentCard type="guilds" content={guild} />
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
