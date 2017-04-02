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
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
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

  show = (e: SyntheticEvent) => {
    if (!this.props.data) {
      return;
    }

    const data = {
      data: this.props.data,
      type: this.props.type,
    };

    this.props.onMouseEnter && this.props.onMouseEnter(e);
    this.props.showTooltip && this.props.showTooltip(true, data);
  };

  hide = (e: SyntheticEvent) => {
    this.props.onMouseLeave && this.props.onMouseLeave(e);
    this.props.showTooltip && this.props.showTooltip(false);
  };

  render () {
    if (!this.props.children) {
      return null;
    }

    return cloneElement(this.props.children, {
      onTouchEnd: this.show,
      onMouseEnter: this.show,
      onMouseLeave: this.hide,
    });
  }
}
