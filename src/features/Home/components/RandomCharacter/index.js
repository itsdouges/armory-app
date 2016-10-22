import { get } from 'axios';
import { Component } from 'react';
import T from 'i18n-react';

import config from 'config';
import CharacterLite from 'features/Character/Lite';
import TooltipTrigger from 'common/components/TooltipTrigger';
import SvgIcon from 'common/components/Icon/Svg';
import Tooltip from 'common/components/Tooltip';

import styles from './styles.less';

/* eslint max-len:0 */
export default class RandomCharacter extends Component {
  state = {
    name: '',
  };

  componentDidMount () {
    get(`${config.api.endpoint}random/characters/1`)
      .then(({ data }) => this.setState({ name: data[0] }));
  }

  render () {
    const { name } = this.state;

    return (
      <div className={styles.root}>
        <CharacterLite name={name} />

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
