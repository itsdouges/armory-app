// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';

import styles from './styles.less';
import { fetchUser } from 'features/User/actions';
import { fetchCharacter } from 'features/Character/actions';
import componentsMap from './components';
import ArmoryBadge from 'common/components/ArmoryBadge';

type QuadrantComponentMap = {
  [key: string]: Array<string>,
};

type Props = {
  userName?: string,
  characterName?: string,
  components?: QuadrantComponentMap,
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

function generateCells ([x, y], { components, character, user, props }) {
  const rows = [];
  // const cellWidth = 1 / x * 100;
  // const rowHeight = 1 / y * 100;

  for (let i = 0; i < y; i++) {
    const cells = [];

    for (let n = 0; n < x; n++) {
      const key = `${i}${n}`;
      const componentNames = components[key] || [];

      cells.push(
        <div className={styles.cell} key={key}>
          {componentNames.map((name) => componentsMap[name]({ character, user, props }))}
        </div>
      );
    }

    rows.push(
      <div className={styles.row} key={i}>{cells}</div>
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

  props: Props;

  render () {
    const {
      character,
      user,
      height = 500,
      width = 500,
      quadrants = [1, 1],
      components = {},
      ...props,
    } = this.props;

    return (
      <div className={styles.root} style={{ height: `${height}px`, width: `${width}px` }}>
        <ArmoryBadge />

        {generateCells(quadrants, {
          user,
          props,
          character,
          components,
        })}
      </div>
    );
  }
}
