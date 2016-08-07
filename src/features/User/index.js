import styles from './styles.less';
import CharactersList from 'common/components/CharactersList';
import Avatar from 'common/components/Avatar';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selector } from './users.reducer';

import {
  fetchUser,
  selectUser,
} from './actions';

class User extends Component {
  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    location: PropTypes.object,
  };

  static contextTypes = {
    userAlias: PropTypes.string,
  };

  static defaultProps = {
    user: {},
  };

  componentWillMount () {
    const route = this.props.location.pathname.replace('/', '');
    const user = route === 'me' ? this.context.userAlias : route;

    this.props.dispatch(fetchUser(user));
    this.props.dispatch(selectUser(user));
  }

  render () {
    return (
      <div className={styles.container}>
        <Avatar name={this.props.user.alias} />
        <CharactersList characters={this.props.user.characters} />
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
};

export default connect(selector)(User);
