// @flow

import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import times from 'lodash/times';

import CharacterContentCard from 'common/components/ContentCard/Character';
import PaginatorGrid from 'common/layouts/PaginatorGrid';
import { fetchUserCharacters } from 'features/User/actions';

const CHARACTERS_PER_PAGE = 50;
const STUB_CHARACTERS = { rows: times(CHARACTERS_PER_PAGE, () => undefined), count: 9999 };

const makeKey = (content, index) => (content ? content.name : index);

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

  static contextTypes = {
    _userAlias: PropTypes.string,
  };

  static defaultProps = {
    fetchCharacters: () => Promise.resolve(),
  };

  fetchCharacters = (limit: number, offset: number) => {
    const { alias, fetchCharacters } = this.props;
    return fetchCharacters(alias, limit, offset, { ignoreAuth: this.context._userAlias !== alias });
  };

  renderCard = (content: Object, index: number) => {
    const { alias } = this.props;
    return <CharacterContentCard key={makeKey(content, index)} aliasOverride={alias} content={content} />;
  };

  render () {
    const { characters = STUB_CHARACTERS } = this.props;

    return (
      <PaginatorGrid
        key="characters"
        rows={characters.rows}
        limit={CHARACTERS_PER_PAGE}
        count={-1}
        action={this.fetchCharacters}
      >
        {this.renderCard}
      </PaginatorGrid>
    );
  }
}
