// @flow

import type { Children } from 'react';
import type { InjectedProps } from 'common/decorators/tooltipDebounce';

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';

import { showTooltip } from 'features/Gw2/actions';
import tooltipDebounce from 'common/decorators/tooltipDebounce';

type Props = {
  data?: string | Object,
  showTooltip?: Function,
  children?: Children,
  type?: string,
  onMouseEnter?: (SyntheticEvent) => void,
  onMouseLeave?: (SyntheticEvent) => void,
} & InjectedProps;

@connect(null, {
  showTooltip,
})
/**
 * Make sure when using this in children that you pass all
 * overflow props down to the DOM element, else this will
 * not work.
 */
@tooltipDebounce()
export default class TooltipTrigger extends Component {
  props: Props;

  show = (e: SyntheticEvent) => {
    const { data, show, onMouseEnter, showTooltip: displayTooltip } = this.props;
    if (!data) {
      return;
    }

    show(() => {
      onMouseEnter && onMouseEnter(e);
      displayTooltip && displayTooltip(true, {
        data: this.props.data,
        type: this.props.type,
      });
    });
  };

  hide = (e: SyntheticEvent) => {
    const { hide, onMouseLeave, showTooltip: displayTooltip } = this.props;

    hide(() => {
      onMouseLeave && onMouseLeave(e);
      displayTooltip && displayTooltip(false);
    });
  };

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
