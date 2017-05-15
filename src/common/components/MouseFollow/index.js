// @flow

import { Component } from 'react';

import { isSmallScreen, addEvent } from 'lib/dom';
import { prefix } from 'lib/css';

function calculateStyle ({ pin, mouse, tooltip }: Object) {
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

function calculatePin ({ tooltip, mouse }: Object) {
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

export default class MouseFollow extends Component {
  _tooltip: Element;
  removeEvent: Function;
  finished: boolean;
  props: { children?: any };
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
    this.finished = true;

    if (isSmallScreen()) {
      return;
    }

    this.removeEvent();
  }

  onMouseMove = (event: MouseEvent) => {
    // eslint-disable-next-line
    const tooltip = this._tooltip;

    window.requestAnimationFrame(() => {
      if (this.finished) {
        return;
      }

      const pin = calculatePin({ tooltip, mouse: event });
      const style = calculateStyle({
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
    });
  };

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
