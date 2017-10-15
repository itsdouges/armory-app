// @flow

import React from 'react';
import noop from 'lodash/noop';
import register from './register';

type Props = {
  children: Function,
};

type State = {
  newVersionAvailable: boolean,
  error: Object,
};

export default class RegisterServiceWorker extends React.Component<Props, State> {
  props: Props;
  state: State;
  initialised: boolean;

  static defaultProps = {
    children: noop,
  };

  componentDidMount () {
    this.initialised = true;

    register({
      onLoaded: ({ newVersionAvailable }) => {
        this.setState({
          newVersionAvailable,
        });
      },

      onError: (error) => {
        this.setState({
          error,
        });
      },
    });
  }

  render () {
    if (!this.initialised) {
      return null;
    }

    return this.props.children({
      newVersionAvailable: this.state.newVersionAvailable,
      error: this.state.error,
    });
  }
}

