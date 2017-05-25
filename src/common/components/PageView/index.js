// @flow

import { withRouter } from 'react-router';
import { Component } from 'react';

import { pageView } from 'lib/tracking';

export default withRouter(
class ScrollToTop extends Component {
  componentDidMount () {
    pageView();
  }

  componentDidUpdate (prevProps) {
    if (this.props.location !== prevProps.location) {
      pageView();
    }
  }

  render () {
    return this.props.children;
  }
}
);
