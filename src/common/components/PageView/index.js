// @flow

import type { Children } from 'react';

import { withRouter } from 'react-router';
import { Component } from 'react';

import { pageView } from 'lib/tracking';

type Props = {
  location: string,
  children?: Children,
};

export default withRouter(
class ScrollToTop extends Component {
  props: Props;

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
