// @flow

import axios from 'axios';
import { Component } from 'react';
import T from 'i18n-react';

import config from 'config';
import CharacterEmbed from 'embeds/components/Character';
import TooltipTrigger from 'common/components/TooltipTrigger';
import SvgIcon from 'common/components/Icon/Svg';
import Tooltip from 'common/components/Tooltip';

import styles from './styles.less';


export default class RandomCharacter extends Component {
  props: {
    type: 'ofTheDay' | 'random',
  };

  state = {
    name: '',
  };

  componentDidMount () {
    const resource = this.props.type === 'ofTheDay'
      ? 'of-the-day/characters'
      : 'random/characters/1';

    axios.get(`${config.api.endpoint}${resource}`, {
      ignoreAuth: true,
    })
    .then(({ data }) => this.setState({ name: data[0] }));
  }

  render () {
    const { name } = this.state;

    return (
      <div className={styles.root}>
        <CharacterEmbed name={name} />

        <TooltipTrigger
          data={T.translate('characters.embedCta')}
        >
          <SvgIcon className={styles.helpIcon} name="help" />
        </TooltipTrigger>

        <Tooltip />
      </div>
    );
  }
}
