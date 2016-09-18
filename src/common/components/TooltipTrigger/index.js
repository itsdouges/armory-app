import { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';
import { isSmallScreen } from 'lib/dom';

class TooltipTrigger extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    dispatch: PropTypes.func,
    children: PropTypes.any,
    type: PropTypes.string,
  };

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
