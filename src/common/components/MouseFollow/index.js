import { Component, PropTypes } from 'react';

export default class MouseFollow extends Component {
  static propTypes = {
    children: PropTypes.any,
  };

  state = {
    style: {
      position: 'fixed',
      top: 10,
      left: 10,
      zIndex: 999,
    },
  };

  componentDidMount () {
    window.addEventListener('mousemove', this.onMouseMove, false);
  }

  componentWillUnmount () {
    window.addEventListener('mousemove', this.onMouseMove, false);
  }

  onMouseMove = (event) => {
    const tooltip = this.refs.tooltip;

    const flip = this.calculateFlip(tooltip);
    const style = this.calculateStyle({
      tooltip,
      flip,
      mouse: event,
    });

    this.setState({
      style: {
        ...this.state.style,
        ...style,
      },
    });
  };

  calculateStyle ({ flip, mouse, tooltip }) {
    let x = mouse.x;
    let y = mouse.y;

    if (flip.flipRight) {
      x -= tooltip.offsetWidth;
    }

    if (flip.flipTop) {
      y -= tooltip.offsetHeight;
    }

    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
    };
  }

  calculateFlip (tooltip) {
    // const width = tooltip.offsetWidth;
    // const height = tooltip.offsetHeight;
    const elementRelativeToWindowPosition = tooltip.getBoundingClientRect();

    let flipRight = false;
    let flipTop = false;

    if (elementRelativeToWindowPosition.right > window.innerWidth / 2) {
      flipRight = true;
    } else {
      flipRight = false;
    }

    if (elementRelativeToWindowPosition.bottom > window.innerHeight / 2) {
      flipTop = true;
    } else {
      flipTop = false;
    }

    return {
      flipTop,
      flipRight,
    };
  }

  render () {
    return <div ref="tooltip" style={this.state.style}>{this.props.children}</div>;
  }
}
