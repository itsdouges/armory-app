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
        subTitle: 'something',
      };

    case 'character':
      return {
        title: size === 'big' && content.guild_tag ?
          `${content.name} [${content.guild_tag}]` : content.name,
        subTitle: `${content.level} ${content.race} ${content.profession}`,
        image: content.profession && content.profession.toLowerCase(),
      };

    default:
      return undefined;
  }
}

const ContentCard = ({ content, className, type = 'character', size = 'small' }) => {
  if (!content) {
    return <Placeholder size={size} className={className} />;
  }

  const { title, subTitle, image } = extractData(content, { type, size });

  return (
    <div className={cx('root', className, size)}>
      <div className={cx('image', image)} />
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
