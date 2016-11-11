// @flow

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';
import { isSmallScreen } from 'lib/dom';

type Props = {
  data: string | Object,
  dispatch: Function,
  children: React$Element<*>,
  type: string,
};

class TooltipTrigger extends Component {
  props: Props;

  showTooltip = () => {
    this.props.dispatch(showTooltip(true, {
      data: this.props.data,
      type: this.props.type,
    }));
  };

  hideTooltip = () => {
    if (isSmallScreen()) {
      return;
    }

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

export default connect()(TooltipTrigger);
