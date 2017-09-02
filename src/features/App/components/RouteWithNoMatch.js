// @flow

import React from 'react';
import { Route } from 'react-router-dom';
import NotFound from 'features/NotFound';

type Props = {
  component: any,
};

const RouteWithNoMatch = ({ component: Component, ...props }: Props) => (
  <Route
    {...props}
    render={(router) => (router.location.state && router.location.state.notFound
      ? <NotFound />
      : <Component {...router} />
    )}
  />
);

export default RouteWithNoMatch;
