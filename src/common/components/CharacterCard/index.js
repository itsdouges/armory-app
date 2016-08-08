import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
import Placeholder from './placeholder';
const cx = classnames.bind(styles);

const CharacterCard = ({ character, className, size = 'small' }) => {
  if (!character) {
    return <Placeholder size={size} className={className} />;
  }

  return (
    <div className={cx('root', className, size)}>
      <div className={cx('image', character.profession.toLowerCase())} />
      <div className={styles.textContainer}>
        <div className={cx('title')}>{character.name}</div>
        <div className={cx('subTitle')}>
          {character.level} {character.race} {character.profession}
        </div>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.object,
  className: PropTypes.string,
  size: PropTypes.oneOf(['small', 'big']),
};

export default CharacterCard;
