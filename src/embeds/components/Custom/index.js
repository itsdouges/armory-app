// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';

import styles from './styles.less';
import { fetchUser } from 'features/User/actions';
import { fetchCharacter } from 'features/Character/actions';
import characterComponentsMap from './characterComponents';

type CustomProps = {
  userName?: string,
  userComponents?: Array<string>,
  characterName?: string,
  characterComponents?: Array<string>,
  mode?: string,
  height?: number,
  width?: number,
  quadrants?: [number, number],

  // === Redux props ===
  dispatchFetchUser?: Function,
  dispatchFetchCharacter?: Function,
  user?: {},
  character?: {},
  items?: {},
  skins?: {},
  amulets?: {},
  skills?: {},
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

function generateCells ([x, y] = [1, 1]) {
  const rows = [];
  const cellWidth = 1 / x * 100;
  const rowHeight = 1 / y * 100;

  for (let i = 0; i < y; i++) {
    const cells = [];

    for (let n = 0; n < x; n++) {
      cells.push(
        <div style={{ width: `${cellWidth}%` }} className={styles.cell} key={`${i}${n}`}>
          {x}{y}
        </div>
      );
    }

    rows.push(
      <div style={{ height: `${rowHeight}%` }} className={styles.row} key={i}>{cells}</div>
    );
  }

  return rows;
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
      dispatchFetchUser = noop,
      dispatchFetchCharacter = noop,
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
      height = 500,
      width = 500,
      quadrants,
      ...props,
    } = this.props;

    return (
      <div className={styles.root} style={{ height: `${height}px`, width: `${width}px` }}>
        {generateCells(quadrants)}

        {characterComponents &&
          characterComponents.map(
            (component) => characterComponentsMap[component](character, props)
        )}
      </div>
    );
  }
}
