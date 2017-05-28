// @flow

import { Component } from 'react';

const withScroll = (WrappedComponent: ReactClass<*>) => class ScrollTopOnMount extends Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }

  render () {
    return <WrappedComponent {...this.props} />;
  }
};

export default withScroll;
