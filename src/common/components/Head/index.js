import { PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from 'config';

import defaultImage from 'assets/images/logo.png';

const Head = ({
  description,
  title = config.meta.title,
  canonical = location.href,
  type = 'website',
  image = defaultImage,
  ...extraProps,
}) => {
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

Head.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  canonical: PropTypes.string,
  image: PropTypes.string,
  titleTemplate: PropTypes.string,
};

export default Head;
