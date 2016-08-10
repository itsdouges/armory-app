import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
import Placeholder from './placeholder';
const cx = classnames.bind(styles);

function extractData (content, { type, size }) {
  switch (type) {
    case 'user':
      return {
        title: content.alias,
        subTitle: 'stress level zero',
        imageStyle: {
          backgroundImage: `url(//api.adorable.io/avatars/128/${content.alias}.png})`,
          borderRadius: '50%',
        },
      };

    case 'character':
      return {
        title: size === 'big' && content.guild_tag ?
          `${content.name} [${content.guild_tag}]` : content.name,
        subTitle: `${content.level} ${content.race} ${content.profession}`,
        imageClass: content.profession && content.profession.toLowerCase(),
      };

    default:
      return undefined;
  }
}

const ContentCard = ({ content, className, type = 'character', size = 'small' }) => {
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
  type: PropTypes.oneOf(['character', 'user']),
  size: PropTypes.oneOf(['small', 'big']),
};

export default ContentCard;
