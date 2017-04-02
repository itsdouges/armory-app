// @flow

import type { Children } from 'react';

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';

type Props = {
  data?: string | Object,
  showTooltip?: Function,
  children?: Children,
  type?: string,
};

@connect(null, {
  showTooltip,
})
/**
 * Make sure when using this in children that you pass all
 * overflow props down to the DOM element, else this will
 * not work.
 */
export default class TooltipTrigger extends Component {
  props: Props;

  showTooltip = () => {
    if (!this.props.data) {
      return;
    }

    const data = {
      data: this.props.data,
      type: this.props.type,
    };

    this.props.showTooltip && this.props.showTooltip(true, data);
  };

  hideTooltip = () => {
    this.props.showTooltip && this.props.showTooltip(false);
  };

  render () {
    if (!this.props.children) {
      return null;
    }

    return cloneElement(this.props.children, {
      onMouseEnter: this.showTooltip,
      onMouseLeave: this.hideTooltip,
      onTouchEnd: this.showTooltip,
    });
  }
}
