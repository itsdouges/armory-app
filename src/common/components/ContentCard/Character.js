// @flow

import LinkContentCard from './Link';

type Props = {
  content?: Object,
  aliasOverride?: string,
};

const str = (s) => s || '';

const makeUrl = (content, aliasOverride) => {
  const alias = aliasOverride || (content && (content.alias || content.userAlias));
  return `/${str(alias)}/c/${str(content && content.name)}`;
};

const CharacterContentCard = ({ content, aliasOverride, ...props }: Props) => (
  <LinkContentCard
    to={makeUrl(content, aliasOverride)}
    type="characters"
    content={content}
    {...props}
  />
);

export default CharacterContentCard;
