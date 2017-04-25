// @flow

import type { Guild as GuildType } from 'flowTypes';

import { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import times from 'lodash/times';

import CharacterContentCard from 'common/components/ContentCard/Character';
import PaginatorGrid from 'common/layouts/PaginatorGrid';
import { selector } from 'features/Guild/guilds.reducer';
import { fetchGuildCharacters } from 'features/Guild/actions';

const CHARACTERS_PER_PAGE = 50;
const STUB_CHARACTERS = { rows: times(CHARACTERS_PER_PAGE, () => undefined), count: 9999 };

const makeKey = (content, index) => (content ? content.name : index);

@connect(selector, {
  fetchCharacters: fetchGuildCharacters,
})
export default class GuildCharacters extends Component {
  props: {
    guild?: GuildType,
    fetchCharacters: (string, number, number) => Promise<>,
    name: string,
  };

  static defaultProps = {
    fetchCharacters: () => Promise.resolve(),
  };

  render () {
    const { guild = {}, fetchCharacters, name } = this.props;
    const users = get(guild, 'characters', STUB_CHARACTERS);

    return (
      <PaginatorGrid
        key="characters"
        rows={users.rows}
        limit={CHARACTERS_PER_PAGE}
        count={users.count}
        action={(limit, offset) => fetchCharacters(name, limit, offset)}
      >
        {(content, index) => <CharacterContentCard key={makeKey(content, index)} content={content} />}
      </PaginatorGrid>
    );
  }
}
