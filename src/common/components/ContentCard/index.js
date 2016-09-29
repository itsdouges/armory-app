import { PropTypes } from 'react';
import styles from './styles.less';
import config from 'config';
import classnames from 'classnames/bind';
import Placeholder from './placeholder';
const cx = classnames.bind(styles);

function extractData (content, { type, forceUpdate }) {
  switch (type) {
    case 'users': {
      const alias = content.alias || content.name;
      const url = alias &&
        `${config.imagesEndpoint}${alias}/avatar${forceUpdate ? `?${+new Date()}` : ''}`;

      return {
        title: alias,
        subTitle: content.accountName || 'User',
        imageStyle: {
          backgroundColor: '#c1c1c1',
          backgroundImage: `url(${url})`,
          borderRadius: '50%',
        },
      };
    }

    case 'characters':
      return {
        title: content.guild_tag ? `${content.name} [${content.guild_tag}]` : content.name,
        // eslint-disable-next-line
        subTitle: `${content.level} ${content.race} ${content.eliteSpecialization || content.profession}`,
        imageClass: content.profession && content.profession.toLowerCase(),
      };

    case 'guilds':
      return {
        title: content.name || 'No Guild',
        subTitle: (content.tag && `[${content.tag}]`) || 'Guild',
        imageStyle: {
          backgroundImage: `url(https://guilds.gw2w2w.com/guilds/${content.name && content.name.replace(/\s+/g, '-')}/256.svg)`,
          borderRadius: '50%',
        },
      };

    default:
      return {};
  }
}

const ContentCard = ({ content, className, type = 'characters', size = 'small', forceUpdate }) => {
  if (!content) {
    return <Placeholder size={size} className={className} />;
  }

  const {
    title,
    subTitle,
    imageClass,
    imageStyle,
  } = extractData(content, { type, size, forceUpdate });

  return (
    <div className={cx('root', className, size)}>
      <div className={cx('image', imageClass)} style={imageStyle} />
      <div className={styles.textContainer}>
        {size === 'big' ?
          <h2 className={cx('title')}>{title}</h2> : <div className={cx('title')}>{title}</div>}
        <div className={cx('subTitle')}>{subTitle}</div>
      </div>
    </div>
  );
};

ContentCard.propTypes = {
  content: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.oneOf(['characters', 'users', 'guilds']),
  size: PropTypes.oneOf(['small', 'big']),
  // I don't like this.
  forceUpdate: PropTypes.bool,
};

export default ContentCard;
