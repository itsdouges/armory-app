// @flow

import { Component } from 'react';

const withScroll = (WrappedComponent: React.ComponentType<*>) => class ScrollTopOnMount extends Component<void> {
  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return <WrappedComponent {...this.props} />;
  }
};

export default withScroll;
