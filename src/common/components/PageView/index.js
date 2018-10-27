// @flow

import type { Node } from 'react';

import { withRouter } from 'react-router';
import { Component } from 'react';

import { pageView } from 'lib/tracking';

type Props = {
  location: string,
  children: Node,
};

export default withRouter(
  class PageView extends Component<Props> {
    props: Props;

    componentDidMount() {
      pageView();
    }

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        pageView();
      }
    }

    render() {
      return this.props.children;
    }
  }
);
