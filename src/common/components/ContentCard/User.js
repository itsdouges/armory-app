// @flow

import ContentCard from './';
import { Link } from 'react-router';

type Props = {
  content: Object,
};

const GuildContentCard = ({ content, ...props }: Props) => (
  <Link to={`/${content.name}`}>
    <ContentCard type="users" content={content} {...props} />
  </Link>
);

export default GuildContentCard;
