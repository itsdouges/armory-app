// @flow

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';

type Props = {
  data?: string | Object,
  showTooltip?: Function,
  children?: React$Element<*>,
  type?: string,
};

@connect(null, {
  showTooltip,
})
export default class TooltipTrigger extends Component {
  props: Props;

  showTooltip = () => {
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
