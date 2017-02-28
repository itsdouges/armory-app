// @flow

import { Component } from 'react';

import Base from '../Base';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';
// import Tooltip from 'common/components/Tooltip';

const createEmbed = (title: string) => (WrappedComponent: any) => class extends Component {
  componentWillMount () {
    pageView();
  }

  render () {
    return (
      <Base>
        <div>
          <Head title={title} />
          <WrappedComponent {...this.props} />
          {/* <Tooltip />*/}
        </div>
      </Base>
    );
  }
};

export default createEmbed;
