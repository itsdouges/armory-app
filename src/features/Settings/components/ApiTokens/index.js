import { Component, PropTypes } from 'react';
import styles from './styles.less';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Button from 'common/components/Button';
import ApiToken from '../ApiToken';

export default class ApiTokens extends Component {
  static propTypes = {
    tokens: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
    valid: PropTypes.bool,
    setPrimary: PropTypes.func,
    validate: PropTypes.func,
    error: PropTypes.array,
    adding: PropTypes.bool,
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
      <span>
        <h2>Api tokens</h2>
        <Card size="medium" className={styles.root}>
          <div className={styles.padding}>
            {!this.props.tokens.length &&
              <span>
                Oh, you have no api tokens.. <a target="_blank" title="Opens in a new window" href="https://account.arena.net/applications/create"><strong>go generate one <i className="fa fa-external-link"></i></strong></a> ..! Make sure you select characters, builds, and pvp permissions :-).
              </span>}

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
              placeholder="Add token"
              value={this.state.newToken}
              valid={this.props.valid}
              onChange={this.fieldChanged}
              error={this.props.error}
              disabled={this.props.adding}
            />

            <Button
              primary
              busy={this.props.adding}
              disabled={!this.props.valid}
            >
              ADD
            </Button>
          </form>
        </Card>
      </span>
    );
  }
}
