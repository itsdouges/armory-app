// @flow

import { Component } from 'react';
import { post } from 'axios';
import T from 'i18n-react';

import Textbox from 'common/components/Textbox';
import Button from 'common/components/Button';
import Message from 'common/components/Message';

import config from 'config';
import styles from '../../styles.less';

type Props = {
  next: Function,
};

export default class Start extends Component {
  props: Props;

  state = {
    email: '',
    error: '',
    busy: false,
    valid: false,
  };

  fieldChanged = ({ target: { id, value } }: SyntheticInputEvent) => {
    const newState = {
      ...this.state,
      [id]: value,
    };

    newState.valid = !!newState.email;

    this.setState(newState);
  };

  begin = (event: Event) => {
    event.preventDefault();

    this.setState({
      busy: true,
      error: '',
    });

    return post(`${config.api.endpoint}forgot-my-password`, {
      email: this.state.email,
    })
    .then(this.props.next, () => this.setState({
      error: 'Uh Oh!',
      busy: false,
    }));
  };

  render () {
    return (
      <form onSubmit={this.begin}>
        <Message type="error">{this.state.error}</Message>

        <Textbox
          required
          id="email"
          label="Email"
          value={this.state.email}
          onChange={this.fieldChanged}
        />

        <div className={styles.buttons}>
          <Button
            type="primary"
            busy={this.state.busy}
            disabled={!this.state.valid}
          >
            {T.translate('forgotPassword.nextCta')}
          </Button>
        </div>
      </form>
    );
  }
}
