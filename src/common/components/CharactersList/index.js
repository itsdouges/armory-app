import { PropTypes } from 'react';
import CharacterCard from 'common/components/CharacterCard';
import PlaceholderCharacterCard from 'common/components/CharacterCard/placeholder';
import Card from 'common/components/Card';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const CharactersList = ({ characters = [] }) => {
  const content = characters.length ?
    characters.map((character) => (
      <CharacterCard className={styles.item} character={character} key={character.name} />)
    ) :
    [0, 0, 0, 0].map((data, index) => (
      <PlaceholderCharacterCard className={styles.item} key={index} />)
    );

  return (
    <div className={styles.root}>
      <div className={cx('borderContainer', 'borderContainerTop')}>
        <div className={cx('border', 'borderTopLeft')}></div>
        <div className={cx('border', 'borderTopRight')}></div>
      </div>

      <Card className={styles.container}>
        {content}
      </Card>
    </div>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
  type: PropTypes.oneOf(['grid', 'list', '']),
};

export default CharactersList;
