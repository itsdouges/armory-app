import { PropTypes } from 'react';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const CharacterCard = ({ character, className }) => (
  <div className={cx('root', className)}>
    <div className={cx('image', character.profession.toLowerCase())} />
    <div className={styles.textContainer}>
      <div className={cx('title')}>{character.name}</div>
      <div className={cx('subTitle')}>
        {character.level} {character.race} {character.profession}
      </div>
    </div>
  </div>
);

CharacterCard.propTypes = {
  character: PropTypes.object,
  className: PropTypes.string,
};

export default CharacterCard;
