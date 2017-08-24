// @flow

import React from 'react';
import ContentCard from './';
import { Link } from 'react-router-dom';

type Props = {
  to: string,
};

const LinkContentCard = ({ to, ...props }: Props) => (
  <Link to={to}>
    <ContentCard {...props} />
  </Link>
);

export default LinkContentCard;
