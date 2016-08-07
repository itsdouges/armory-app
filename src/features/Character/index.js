import { Component, PropTypes } from 'react';

class Character extends Component {
  static propTypes = {
    character: PropTypes.object,
  };

  componentWillMount () {

  }

  render () {
    return <div>hey</div>;
  }
}

export default Character;
