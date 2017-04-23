// @flow

import LinkContentCard from './Link';

type Props = {
  content?: Object,
};

const UserContentCard = ({ content, ...props }: Props) => (
  <LinkContentCard
    to={`/${content ? content.name : ''}`}
    type="users"
    content={content}
    {...props}
  />
);

export default UserContentCard;
