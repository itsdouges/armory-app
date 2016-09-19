import { Component } from 'react';
import Head from 'common/components/Head';

import styles from './styles.less';

import qs from 'lib/qs';
import Card from 'common/components/Card';
import Start from './components/Start';
import Finish from './components/Finish';

export default class ForgotMyPassword extends Component {
  constructor () {
    super();

    const token = qs('token');

    this.state = {
      initialToken: token,
      screen: token ? 'finish' : 'start',
    };
  }

  setProgress = (screen) => {
    this.setState({
      screen,
    });
  }

  render () {
    let screen;

    switch (this.state.screen) {
      case 'start':
        screen = (
          <Start next={() => this.setProgress('finish')} />
        );
        break;

      case 'finish':
        screen = (
          <Finish initialToken={this.state.initialToken} />
        );
        break;

      default:
        break;
    }

    return (
      <span className={styles.root}>
        <Head title="Forgot My Password" />

        <h2>Forgot My Password</h2>
        <Card size="small">
          {screen}
        </Card>
      </span>
    );
  }
}
