// @flow

import axios from 'axios';
import config from 'config';
import { Component } from 'react';
import T from 'i18n-react';

import styles from './styles.less';
import Message from 'common/components/Message';

export default class Gw2ApiHealth extends Component {
  state = {
    up: true,
  };

  componentWillMount () {
    // eslint-disable-next-line
    axios.get(`${config.gw2.endpoint}v2/characters?access_token=EE920D9D-F7CF-A146-A5F5-95455980577B0DC68745-969C-4ED9-8462-1299FE6FB078`, { ignoreAuth: true })
      .then(null, () => {
        this.setState({
          up: false,
        });
      });
  }

  render () {
    if (this.state.up) {
      return null;
    }

    return (
      <div className={styles.root}>
        <Message>
          {T.translate('messages.gw2ApiDown')}
        </Message>
      </div>
    );
  }
}
