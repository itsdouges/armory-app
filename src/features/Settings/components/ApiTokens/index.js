// @flow

import type { Token } from 'flowTypes';

import React, { Component } from 'react';
import qs from 'lib/qs';
import T from 'i18n-react';

import styles from './styles.less';

import CardWithTitle from 'common/layouts/CardWithTitle';
import Textbox from 'common/components/Textbox';
import Button from 'common/components/Button';
import ApiToken from '../ApiToken';
import Message from 'common/components/Message';

type Props = {
  tokens: Array<Token>,
  error: string,
  add: Function,
  remove: Function,
  setPrimary: Function,
  validate: Function,
  valid: boolean,
  validating: boolean,
  adding: boolean,
};

type State = {
  claimingUser: string,
  newToken: string,
};

export default class ApiTokens extends Component<Props, State> {
  props: Props;

  static defaultProps = {
    tokens: [],
  };

  state: State = {
    claimingUser: '',
    newToken: '',
  };

  componentWillMount () {
    this.setState({
      claimingUser: qs('claiming'),
    });
  }

  fieldChanged = ({ target: { id, value } }: SyntheticInputEvent<*>) => {
    this.setState({
      ...this.state,
      [id]: value,
    });

    this.props.validate(value);
  };

  add = (event: SyntheticEvent<*>) => {
    event.preventDefault();

    this.props.add(this.state.newToken);
  };

  render () {
    const { claimingUser } = this.state;

    const addKeyLabel = claimingUser
      ? `${T.translate('settings.apiKeys.inputs.add')} for ${claimingUser}`
      : `${T.translate('settings.apiKeys.inputs.add')}`;

    return (
      <CardWithTitle title={T.translate('settings.apiKeys.name')} size="medium" type="compact">
        <div className={styles.padding}>
          {!this.props.tokens.length &&
            <Message>
              <a
                target="_blank"
                rel="noopener noreferrer"
                title={T.translate('misc.opensInNewWindow')}
                href="https://account.arena.net/applications/create"
              >
                {T.translate('settings.apiKeys.noKeysCta')}
              </a>
            </Message>}

          {this.props.tokens.map((token) =>
            <ApiToken
              key={token.token}
              token={token}
              remove={() => this.props.remove(token.token)}
              setPrimary={() => this.props.setPrimary(token.token)}
            />
          )}
        </div>

        <hr />

        <form onSubmit={this.add} className={styles.padding}>
          <Textbox
            showStatus
            required
            id="newToken"
            label={addKeyLabel}
            value={this.state.newToken}
            valid={this.props.valid}
            onChange={this.fieldChanged}
            error={this.props.error}
            disabled={this.props.adding}
            busy={this.props.validating}
            autoFocus={!!claimingUser}
          />

          <Button
            type="primary"
            busy={this.props.adding}
            disabled={!this.props.valid}
          >
            {T.translate('settings.apiKeys.buttons.add')}
          </Button>
        </form>
      </CardWithTitle>
    );
  }
}
