import { PropTypes, Component, cloneElement } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';

class TooltipTrigger extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    dispatch: PropTypes.func,
    children: PropTypes.any,
    type: PropTypes.string,
  };

  onMouseEnter = () => {
    this.props.dispatch(showTooltip(true, {
      data: this.props.data,
      type: this.props.type,
    }));
  };

  onMouseLeave = () => {
    this.props.dispatch(showTooltip(false));
  };

  render () {
    return cloneElement(this.props.children, {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
    });
  }
}

export default connect()(TooltipTrigger);
