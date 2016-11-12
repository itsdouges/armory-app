// @flow

import { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser, selectUser } from 'features/User/actions';
import { fetchCharacter, selectCharacter } from 'features/Character/actions';

type CustomProps = {
  user?: string,
  character?: string,
  dispatchFetchUser: Function,
  dispatchSelectUser: Function,
  dispatchFetchCharacter: Function,
  dispatchSelectCharacter: Function,
};

function mapStateToProps () {
  return {};
}

function mapDispatchToProps () {
  return {
    dispatchFetchUser: fetchUser,
    dispatchSelectUser: selectUser,
    dispatchFetchCharacter: fetchCharacter,
    dispatchSelectCharacter: selectCharacter,
  };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Custom extends Component {
  componentWillMount () {
    const {
      user,
      character,
      dispatchFetchUser,
      dispatchSelectUser,
      dispatchFetchCharacter,
      dispatchSelectCharacter,
    } = this.props;

    if (user) {
      dispatchFetchUser(user);
      dispatchSelectUser(user);
    }

    if (character) {
      dispatchFetchCharacter(character);
      dispatchSelectCharacter(character);
    }
  }

  props: CustomProps;

  render () {
    return (
      <div>
        hey
      </div>
    );
  }
}
