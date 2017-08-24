// @flow

import type { Node } from 'react';
import React, { Component } from 'react';

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

type Props = {
  children: Node,
};

type State = {
  style: {
    [string]: any,
  },
};

export default class MouseFollow extends Component<Props, State> {
  _tooltip: ?HTMLElement;
  removeEvent: Function;
  finished: boolean;
  props: Props;
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
    const tooltip = this._tooltip;
    if (!tooltip) {
      return;
    }

    window.requestAnimationFrame(() => {
      if (this.finished || !tooltip) {
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

  setRef = (ref: ?HTMLElement) => {
    this._tooltip = ref;
  };

  render () {
    const { children, ...props } = this.props;

    return (
      <div ref={this.setRef} style={this.state.style} {...props}>
        {children}
      </div>
    );
  }
}
