import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './characters.reducer';
import { fetchCharacter, selectCharacter } from './actions';
import { fetchUserCharacters, selectUser } from 'features/User/actions';
import CharactersList from 'common/components/CharactersList';
import CharacterCard from 'common/components/CharacterCard';
import styles from './styles.less';

class Character extends Component {
  static propTypes = {
    character: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
    characters: PropTypes.array,
  };

  componentWillMount () {
    const { character, alias } = this.props.routeParams;

    this.props.dispatch(fetchCharacter(character));
    this.props.dispatch(fetchUserCharacters(alias));
    this.props.dispatch(selectCharacter(character));
    this.props.dispatch(selectUser(alias));
  }

  render () {
    const { routeParams: { alias }, characters, character } = this.props;
    return (
      <div className={styles.root}>
        <CharacterCard character={character} size="big" />

        <CharactersList alias={alias} characters={characters} />
      </div>
    );
  }
}

export default connect(selector)(Character);
