// @flow

import axios from 'axios';
import React, { Component } from 'react';
import GuildContentCard from 'common/components/ContentCard/Guild';
import get from 'lodash/get';

import config from 'config';

import styles from './styles.less';

const STUB_GUILDS = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined];

export default class RandomGuilds extends Component<*, *> {
  state = {
    guilds: undefined,
  };

  componentDidMount () {
    axios.get(`${config.api.endpoint}of-the-day/guilds`)
    .then(({ data }) => this.setState({ guilds: data }));
  }

  render () {
    const guilds = get(this.state, 'guilds', STUB_GUILDS);

    return (
      <ul className={styles.root}>
        {guilds.map((guild, index) => (
          <li key={guild ? guild.name : index}>
            <GuildContentCard type="guilds" content={guild} />
          </li>
        ))}
      </ul>
    );
  }
}
