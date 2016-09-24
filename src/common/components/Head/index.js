import { PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from 'env';

import defaultImage from 'assets/images/logo.png';

const Head = ({
  description = config.description,
  title = config.meta.title,
  canonical = location.href,
  type = 'Article',
  image = defaultImage,
  ...extraProps,
}) => {
  const fullTitle = `${title} | Guild Wars 2 Armory`;

  const props = {
    title: fullTitle,
    meta: [
      { name: 'og:title', content: fullTitle },
      { name: 'description', content: description },
      { name: 'og:description', content: description },
      { name: 'og:image', content: image },
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
