// @flow

import React from 'react';
import LinkContentCard from './Link';

type Props = {
  content?: Object,
};

const GuildContentCard = ({ content, ...props }: Props) => (
  <LinkContentCard
    to={`/g/${content ? content.name : ''}`}
    type="guilds"
    content={content}
    {...props}
  />
);

export default GuildContentCard;
