import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './characters.reducer';
import { fetchCharacter, selectCharacter } from './actions';

class Character extends Component {
  static propTypes = {
    character: PropTypes.object,
    dispatch: PropTypes.func,
    routeParams: PropTypes.object,
  };

  componentWillMount () {
    const name = this.props.routeParams.character;
    this.props.dispatch(selectCharacter(name));
    this.props.dispatch(fetchCharacter(name));
  }

  render () {
    return <div>hey</div>;
  }
}

export default connect(selector)(Character);
