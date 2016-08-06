import { PropTypes } from 'react';
import CharacterCard from 'common/components/CharacterCard';
import PlaceholderCharacterCard from 'common/components/CharacterCard/placeholder';
import Card from 'common/components/Card';
import styles from './styles.less';

const CharactersList = ({ characters = [] }) => {
  const content = characters.length ?
    characters.map((character) => <CharacterCard character={character} key={character.name} />) :
    [0, 0, 0, 0].map((data, index) => <PlaceholderCharacterCard key={index} />);

  return (
    <Card className={styles.container}>
      {content}
    </Card>
  );
};

CharactersList.propTypes = {
  characters: PropTypes.array,
};

export default CharactersList;
