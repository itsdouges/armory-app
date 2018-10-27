// @flow

import React from 'react';

type Props = {
  load: () => Promise<{ default: React.Component<*> }>,
};

export default class AsyncComponent extends React.Component<*, *> {
  props: Props;
  state = {};

  componentDidMount() {
    this.props.load().then(({ default: Component }) => {
      this.setState({
        Component,
      });
    });
  }

  render() {
    const { load, ...props } = this.props;

    const { Component } = this.state;
    if (Component) {
      return <Component {...props} />;
    }

    return null;
  }
}
