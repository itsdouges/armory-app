import { Component, PropTypes } from 'react';

import Textbox from 'common/components/Textbox';
import Card from 'common/components/Card';
import Button from 'common/components/Button';

export default class ApiTokens extends Component {
  static propTypes = {
    tokens: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
    valid: PropTypes.bool,
    validate: PropTypes.func,
    error: PropTypes.array,
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
        <Card size="small">
          <form onSubmit={this.add}>
            <Textbox
              showStatus
              required
              id="newToken"
              placeholder="Add token"
              value={this.state.newToken}
              valid={this.props.valid}
              onChange={this.fieldChanged}
              error={this.props.error}
            />

            <Button
              primary
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
