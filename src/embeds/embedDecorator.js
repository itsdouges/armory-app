// @flow

import { Component } from 'react';

import Base from '../Base';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';
import Tooltip from 'common/components/Tooltip';
import ArmoryBadge from 'common/components/ArmoryBadge';

const embedDecorator = (title: string) => (WrappedComponent: any) => class extends Component {
  componentWillMount () {
    pageView();
  }

  render () {
    return (
      <Base>
        <span>
          <Head title={title} />
          <ArmoryBadge />
          <WrappedComponent {...this.props} />
          <Tooltip />
        </span>
      </Base>
    );
  }
};

export default embedDecorator;
