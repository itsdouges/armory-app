// @flow

import type { Props as DisplayAdProps } from './';

import React from 'react';
import MediaQuery from 'react-responsive';
import DisplayAd from './';

type Props = {
  className?: string,
  containerClassName?: string,
  breakpoints: Array<{
    type: $PropertyType<DisplayAdProps, 'type'>,
    minWidth: number,
    maxWidth: number,
  }>,
};

const ResponsiveDisplayAd = (props: Props) => (
  <span className={props.containerClassName}>
    {props.breakpoints.map(breakpoint => (
      <MediaQuery
        key={breakpoint.type}
        minWidth={breakpoint.minWidth}
        maxWidth={breakpoint.maxWidth}
      >
        <DisplayAd className={props.className} type={breakpoint.type} />
      </MediaQuery>
    ))}
  </span>
);

export default ResponsiveDisplayAd;
