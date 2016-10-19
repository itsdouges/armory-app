import { get } from 'axios';
import config from 'config';
import { Component } from 'react';
import styles from './styles.less';

import Message from 'common/components/Message';

export default class Gw2ApiHealth extends Component {
  state = {
    up: true,
  };

  componentWillMount () {
    // eslint-disable-next-line
    get(`${config.gw2.endpoint}/v2/characters?access_token=EE920D9D-F7CF-A146-A5F5-95455980577B0DC68745-969C-4ED9-8462-1299FE6FB078`, { ignoreAuth: true })
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
          The offical GW2 API is experiencing issues, your session may be affected!
        </Message>
      </div>
    );
  }
}
