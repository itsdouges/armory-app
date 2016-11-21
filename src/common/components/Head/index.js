// @flow

import Helmet from 'react-helmet';
import config from 'config';

import defaultImage from 'assets/images/logo.png';

type HeadProps = {
  title: string,
  description?: string,
  canonical?: string,
  type?: string,
  image?: string,
};

const Head = ({
  description,
  title = config.meta.title,
  canonical = location.href,
  type = 'website',
  image = defaultImage,
  ...extraProps
}: HeadProps) => {
  const fullTitle = `${title}${config.titleSuffix}`;
  const parsedDescription = description
    ? `${description} | ${config.description}`
    : config.description;

  const props = {
    title: fullTitle,
    meta: [
      { name: 'og:title', content: fullTitle },
      { name: 'description', content: parsedDescription },
      { name: 'og:description', content: parsedDescription },
      { name: 'og:image', content: `${location.origin}${image}` },
      { name: 'og:type', content: type },
      { name: 'og:url', content: canonical },
    ],
    link: [
      { rel: 'canonical', href: canonical },
    ],
    ...extraProps,
  };

  return (
    <Helmet {...props} />
  );
};

export default Head;
