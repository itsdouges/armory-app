// @flow

import { Component } from 'react';
import { connect } from 'react-redux';
import times from 'lodash/times';

import CharacterContentCard from 'common/components/ContentCard/Character';
import PaginatorGrid from 'common/layouts/PaginatorGrid';
import { fetchUserCharacters } from 'features/User/actions';

const CHARACTERS_PER_PAGE = 50;
const STUB_CHARACTERS = { rows: times(CHARACTERS_PER_PAGE, () => undefined), count: 9999 };

function mapStateToProps (state) {
  return {
    characters: (state.users.data[state.users.selected] || {}).characters,
  };
}

@connect(mapStateToProps, {
  fetchCharacters: fetchUserCharacters,
})
export default class UserCharacters extends Component {
  props: {
    characters?: Object,
    fetchCharacters: (string, number, number) => Promise<>,
    alias: string,
  };

  static defaultProps = {
    fetchCharacters: () => Promise.resolve(),
  };

  render () {
    const { characters = STUB_CHARACTERS, fetchCharacters, alias } = this.props;

    return (
      <PaginatorGrid
        key="characters"
        rows={characters.rows}
        limit={CHARACTERS_PER_PAGE}
        count={characters.count}
        action={(limit, offset) => fetchCharacters(alias, limit, offset)}
      >
        {(content) => <CharacterContentCard aliasOverride={alias} content={content} />}
      </PaginatorGrid>
    );
  }
}
