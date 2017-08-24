// @flow

import React from 'react';
import Icon from './';

type Props = {
  name: string,
};

const SvgIcon = (props: Props) => (
  <Icon {...props} name={`svg/${props.name}.svg`} />
);

export default SvgIcon;
