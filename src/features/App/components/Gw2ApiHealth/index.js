// import { get } from 'axios';
// import config from 'config';
import { Component } from 'react';
import styles from './styles.less';

import Message from 'common/components/Message';

export default class Gw2ApiHealth extends Component {
  state = {
    up: true,
  };

  componentWillMount () {
    // get(`${config.api.endpoint}characters/Blastrn`, { ignoreAuth: true })
    //   .then(null, () => {
    //     this.setState({
    //       up: false,
    //     });
    //   });
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
