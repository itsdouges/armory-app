// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import cx from 'classnames';

import styles from './styles.less';
import { fetchUser } from 'features/User/actions';
import { fetchCharacter } from 'features/Character/actions';
import componentsMap from './components';
import config from 'config';

type QuadrantComponentMap = {
  [key: any]: Array<string>,
};

type Props = {
  userName?: string,
  characterName?: string,
  components?: QuadrantComponentMap,
  mode?: string,
  height?: string,
  width?: string,
  cells?: [number, number],
  autoUpdate?: boolean,
  className?: string,

  // === Redux props ===
  dispatchFetchUser?: Function,
  dispatchFetchCharacter?: Function,
  user?: {},
  character?: {},
  items?: {},
  skins?: {},
  amulets?: {},
  skills?: {},
  professions?: {},
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
    professions: state.professions,
  };
}

function generateCells ([x, y], { components, character, user, props }) {
  const rows = [];

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
  props: Props;

  componentWillMount () {
    const {
      userName,
      characterName,
      autoUpdate,
    } = this.props;

    if (userName) {
      this.fetchUser();
      autoUpdate && setInterval(this.fetchUser, config.refreshDelay);
    }

    if (characterName) {
      this.fetchCharacter();
      autoUpdate && setInterval(this.fetchCharacter, config.refreshDelay);
    }
  }

  fetchUser = () => {
    const {
      userName,
      dispatchFetchUser = noop,
    } = this.props;

    dispatchFetchUser(userName, {
      redirect404: false,
    });
  };

  fetchCharacter = () => {
    const {
      characterName,
      dispatchFetchCharacter = noop,
    } = this.props;

    dispatchFetchCharacter(characterName, {
      redirect404: false,
    });
  };

  render () {
    const {
      character,
      user,
      height = 500,
      width = 500,
      cells = [1, 1],
      components = {},
      className,
      ...props
    } = this.props;

    return (
      <div className={cx(styles.root, className)} style={{ height, width }}>
        {generateCells(cells, {
          user,
          props,
          character,
          components,
        })}
      </div>
    );
  }
}
