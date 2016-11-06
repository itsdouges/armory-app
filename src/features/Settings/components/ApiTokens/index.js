import { Component, PropTypes } from 'react';
import T from 'i18n-react';

import styles from './styles.less';

import CardWithTitle from 'common/layouts/CardWithTitle';
import Textbox from 'common/components/Textbox';
import Button from 'common/components/Button';
import ApiToken from '../ApiToken';
import Message from 'common/components/Message';

export default class ApiTokens extends Component {
  static propTypes = {
    tokens: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
    valid: PropTypes.bool,
    setPrimary: PropTypes.func,
    validate: PropTypes.func,
    validating: PropTypes.bool,
    error: PropTypes.array,
    adding: PropTypes.bool,
  };

  static defaultProps = {
    tokens: [],
  };

  state = {
    newToken: '',
  };

  fieldChanged = ({ target: { id, value } }) => {
    this.setState({
      ...this.state,
      [id]: value,
    });

    this.props.validate(value);
  };

  add = (event) => {
    event.preventDefault();

    this.props.add(this.state.newToken);
  };

  render () {
    return (
      <CardWithTitle title={T.translate('settings.apiKeys.name')} size="medium" type="compact">
        <div className={styles.padding}>
          {!this.props.tokens.length &&
            <Message>
              <a target="_blank" title={T.translate('misc.opensInNewWindow')} href="https://account.arena.net/applications/create">
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
            placeholder={T.translate('settings.apiKeys.inputs.add')}
            value={this.state.newToken}
            valid={this.props.valid}
            onChange={this.fieldChanged}
            error={this.props.error}
            disabled={this.props.adding}
            busy={this.props.validating}
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
