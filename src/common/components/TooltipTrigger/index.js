// @flow

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';

type Props = {
  data: string | Object,
  dispatch: Function,
  children: React$Element<*>,
  type: string,
};

@connect()
export default class TooltipTrigger extends Component {
  props: Props;

  showTooltip = () => {
    const data = {
      data: this.props.data,
      type: this.props.type,
    };

    this.props.dispatch(showTooltip(true, data));
  };

  hideTooltip = () => {
    this.props.dispatch(showTooltip(false));
  };

  render () {
    return cloneElement(this.props.children, {
      onMouseEnter: this.showTooltip,
      onMouseLeave: this.hideTooltip,
      onTouchEnd: this.showTooltip,
    });
  }
}
