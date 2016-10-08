import { get } from 'axios';
import { Component } from 'react';

import config from 'config';
import CharacterLite from 'features/Character/Lite';

import styles from './styles.less';

export default class RandomCharacter extends Component {
  state = {
    loading: true,
    name: '',
  };

  componentDidMount () {
    get(`${config.api.endpoint}random/character`)
      .then(({ data }) => this.setState({ name: data }));
  }

  render () {
    const { name } = this.state;

    return (
      <div className={styles.root}>
        <CharacterLite name={name} />
      </div>
    );
  }
}
