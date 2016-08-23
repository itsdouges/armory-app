import { get } from 'axios';
import config from 'env';
import { Component } from 'react';
import styles from './styles.less';

import Message from 'common/components/Message';

export default class Gw2ApiHealth extends Component {
  state = {
    up: true,
  };

  componentWillMount () {
    get(`${config.api.endpoint}characters/Blastrn`)
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
          <strong>The offical GW2 API is experiencing issues, try again later :-(</strong>
        </Message>
      </div>
    );
  }
}
