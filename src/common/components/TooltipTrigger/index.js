// @flow

import type { Children } from 'react';

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { showTooltip } from 'features/Gw2/actions';

type Props = {
  data?: string | Object,
  showTooltip?: Function,
  children?: Children,
  type?: string,
  onMouseEnter?: (SyntheticEvent) => void,
  onMouseLeave?: (SyntheticEvent) => void,
};

const HIDE_TOOLTIP_TIMEOUT = 150;
let canHide;

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
  canHide: boolean;

  show = (e: SyntheticEvent) => {
    if (!this.props.data) {
      return;
    }

    this.props.onMouseEnter && this.props.onMouseEnter(e);

    this.props.showTooltip && this.props.showTooltip(true, {
      data: this.props.data,
      type: this.props.type,
    });

    canHide = false;
    this.debouncedHide.cancel();
  };

  hide = (e: SyntheticEvent) => {
    canHide = true;
    this.debouncedHide(e);
  };

  debouncedHide = debounce((e: SyntheticEvent) => {
    if (canHide) {
      this.props.onMouseLeave && this.props.onMouseLeave(e);
      this.props.showTooltip && this.props.showTooltip(false);
    }
  }, HIDE_TOOLTIP_TIMEOUT);

  render () {
    const { children } = this.props;
    if (!children) {
      return null;
    }

    return cloneElement(children, {
      onTouchEnd: this.show,
      onMouseEnter: this.show,
      onMouseLeave: this.hide,
    });
  }
}
