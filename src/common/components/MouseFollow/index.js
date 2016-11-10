// @flow

import { Component } from 'react';

import { isSmallScreen, addEvent } from 'lib/dom';
import { prefix } from 'lib/css';

export default class MouseFollow extends Component {
  state = {
    style: {
      position: 'fixed',
      top: 10,
      left: 10,
      zIndex: 999,
      opacity: 0,
      pointerEvents: 'none',
    },
  };

  componentDidMount () {
    if (isSmallScreen()) {
      // eslint-disable-next-line
      this.setState({
        style: {
          ...this.state.style,
          opacity: 1,
          right: 10,
          bottom: 10,
          pointerEvents: 'inherit',
        },
      });

      return;
    }

    this.removeEvent = addEvent('mousemove', this.onMouseMove);
  }

  componentWillUnmount () {
    if (isSmallScreen()) {
      return;
    }

    this.removeEvent();
  }

  onMouseMove = (event: MouseEvent) => {
    // eslint-disable-next-line
    const tooltip = this._tooltip;

    const pin = this.calculatePin({ tooltip, mouse: event });
    const style = this.calculateStyle({
      tooltip,
      pin,
      mouse: event,
    });

    this.setState({
      style: {
        ...this.state.style,
        ...style,
        opacity: 1,
      },
    });
  };

  _tooltip: Element;
  removeEvent: Function;
  props: { children?: any };

  calculateStyle ({ pin, mouse, tooltip }: Object) {
    let { clientX: x, clientY: y } = mouse;

    if (pin.pinRight) {
      x = window.innerWidth - tooltip.offsetWidth - 19;
    }

    if (pin.pinBottom) {
      y = window.innerHeight - tooltip.offsetHeight - 9;
    }

    const transform = `translate3d(${x}px, ${y}px, 0)`;

    return prefix('transform', transform);
  }

  calculatePin ({ tooltip, mouse }: Object) {
    const { clientX: x, clientY: y } = mouse;

    let pinRight = false;
    let pinBottom = false;

    if ((x + tooltip.offsetWidth + 10) > window.innerWidth) {
      pinRight = true;
    }

    if ((y + tooltip.offsetHeight + 10) > window.innerHeight) {
      pinBottom = true;
    }

    return {
      pinRight,
      pinBottom,
    };
  }

  render () {
    const { children, ...props } = this.props;

    return (
      // eslint-disable-next-line
      <div ref={(c) => this._tooltip = c} style={this.state.style} {...props}>
        {children}
      </div>
    );
  }
}
