import { PropTypes } from 'react';

const CharacterCard = ({ character }) => (
  <div>
    {character}
  </div>
);

CharacterCard.propTypes = {
  character: PropTypes.object,
};

export default CharacterCard;
