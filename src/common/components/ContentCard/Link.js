// @flow

import ContentCard from './';
import { Link } from 'react-router';

type Props = {
  to: string,
};

const LinkContentCard = ({ to, ...props }: Props) => (
  <Link to={to}>
    <ContentCard {...props} />
  </Link>
);

export default LinkContentCard;
