import { PropTypes } from 'react';
import CharacterCard from 'common/components/CharacterCard';
import PlaceholderCharacterCard from 'common/components/CharacterCard/placeholder';
import Card from 'common/components/Card';
import { Link } from 'react-router';
import styles from './styles.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);

const CharactersList = ({ characters = [], alias, type = 'list' }) => {
  const content = characters.length ?
    characters.map((character) => (
      <Link
        to={`${alias}/characters/${character.name}`}
        key={character.name}
        className={styles.item}
      >
        <CharacterCard character={character} />
      </Link>)
    ) :
    [0, 0].map((data, index) => (
      <PlaceholderCharacterCard className={styles.item} key={index} />)
    );

  return (
    <div className={styles.root}>
      <div className={cx('borderContainer', 'borderContainerTop')}>
        <div className={cx('border', 'borderTopLeft')}></div>
        <div className={cx('border', 'borderTopRight')}></div>
      </div>

      <Card className={cx('container', type)}>
        {content}
      </Card>
    </div>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
  alias: PropTypes.string,
  type: PropTypes.oneOf(['grid', 'list']),
};

export default CharactersList;
