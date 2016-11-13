// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import styles from './styles.less';
import { fetchUser } from 'features/User/actions';
import { fetchCharacter } from 'features/Character/actions';
import characterComponentsMap from './characterComponents';

type CustomProps = {
  user: {},
  userName?: string,
  userComponents?: Array<string>,
  character: {},
  characterName?: string,
  characterComponents?: Array<string>,
  dispatchFetchUser: Function,
  dispatchFetchCharacter: Function,
  mode?: string,
  items: {},
  skins: {},
  amulets: {},
  skills: {},
};

function mapStateToProps (state, props) {
  return {
    character: state.characters.data[props.characterName],
    user: state.users.data[props.userName],
    items: state.items,
    skins: state.skins,
    amulets: state.amulets,
    skills: state.skills,
    specializations: state.specializations,
    traits: state.traits,
  };
}

@connect(mapStateToProps, {
  dispatchFetchUser: fetchUser,
  dispatchFetchCharacter: fetchCharacter,
})
export default class CustomEmbed extends Component {
  componentWillMount () {
    const {
      userName,
      characterName,
      dispatchFetchUser,
      dispatchFetchCharacter,
    } = this.props;

    userName && dispatchFetchUser(userName, {
      redirect404: false,
      ignoreAuth: true,
    });

    characterName && dispatchFetchCharacter(characterName, {
      redirect404: false,
      ignoreAuth: true,
    });
  }

  props: CustomProps;

  render () {
    const {
      character,
      characterComponents,
      ...props,
    } = this.props;

    return (
      <div className={styles.root}>
        {characterComponents &&
          characterComponents.map(
            (component) => characterComponentsMap[component](character, props)
        )}
      </div>
    );
  }
}
