import { PropTypes, Component, cloneElement } from 'react';

import { addEvent } from 'lib/dom';

export default class ScrollAssist extends Component {
  static propTypes = {
    children: PropTypes.any,
    target: PropTypes.string,
  };

  state = {
    pastTarget: false,
  };

  componentDidMount () {
    this.detatch = addEvent('scroll', this.onScroll);
  }

  componentWillUnmount () {
    this.detatch();
  }

  onScroll = () => {
    if (!this.target) {
      this.target = document.querySelector(this.props.target);
    }

    console.log('yo', this.target);
  };

  render () {
    return cloneElement(this.props.children, {
      pastTarget: this.state.pastTarget,
    });
  }
}
