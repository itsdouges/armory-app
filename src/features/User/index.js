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
    const alias = this.alias;

    this.props.dispatch(fetchUser(alias));
    this.props.dispatch(selectUser(alias));
  }

  get alias () {
    const route = this.props.location.pathname.replace('/', '');
    const alias = route === 'me' ? this.context.userAlias : route;
    return alias;
  }

  render () {
    return (
      <div className={styles.container}>
        <Avatar name={this.props.user.alias} />
        <CharactersList
          type="grid"
          alias={this.alias}
          characters={this.props.user.characters}
        />
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
};

export default connect(selector)(User);
