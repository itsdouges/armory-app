import { Component } from 'react';
import T from 'i18n-react';

import styles from './styles.less';
import Start from './components/Start';
import Finish from './components/Finish';

import qs from 'lib/qs';
import Head from 'common/components/Head';
import CardWithTitle from 'common/layouts/CardWithTitle';
import DisplayAd from 'common/components/DisplayAd';

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
        <Head title={T.translate('forgotPassword.name')} />

        <CardWithTitle title={T.translate('forgotPassword.name')}>
          {screen}
        </CardWithTitle>

        <DisplayAd type="mrec" className={styles.gw2Sale} />
      </span>
    );
  }
}
