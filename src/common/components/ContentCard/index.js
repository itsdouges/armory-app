import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
import Placeholder from './placeholder';
const cx = classnames.bind(styles);

function extractData (content, { type, size }) {
  switch (type) {
    case 'users':
      return {
        title: content.alias || content.name,
        // TODO: Source accountName from api for search
        subTitle: content.accountName || 'user',
        imageStyle: {
          backgroundImage: `url(//api.adorable.io/avatars/128/${content.alias}.png)`,
          borderRadius: '50%',
        },
      };

    case 'characters':
      return {
        title: size === 'big' && content.guild_tag ?
          `${content.name} [${content.guild_tag}]` : content.name,
        subTitle: `${content.level} ${content.race} ${content.profession}`,
        imageClass: content.profession && content.profession.toLowerCase(),
      };

    case 'guilds':
      return {
        title: content.name,
        // TODO: Source tag from api for search
        subTitle: (content.tag && `[${content.tag}]`) || 'guild',
        imageStyle: {
          backgroundImage: `url(https://guilds.gw2w2w.com/guilds/${content.name && content.name.replace(/\s+/g, '-')}/256.svg)`,
          borderRadius: '50%',
        },
      };

    default:
      return {};
  }
}

const ContentCard = ({ content, className, type = 'characters', size = 'small' }) => {
  if (!content) {
    return <Placeholder size={size} className={className} />;
  }

  const { title, subTitle, imageClass, imageStyle } = extractData(content, { type, size });

  return (
    <div className={cx('root', className, size)}>
      <div className={cx('image', imageClass)} style={imageStyle} />
      <div className={styles.textContainer}>
        <div className={cx('title')}>{title}</div>
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
};

export default ContentCard;
