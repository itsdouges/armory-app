import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';
import debounce from 'lodash/debounce';

class TooltipTrigger extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    dispatch: PropTypes.func,
    children: PropTypes.any,
  };

  onMouseEnter = debounce(() => {
    this.props.dispatch(showTooltip(true, this.props.data));
  }, 50);

  onMouseLeave = debounce(() => {
    this.props.dispatch(showTooltip(false));
  }, 50);

  render () {
    return (
      <span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        {this.props.children}
      </span>
    );
  }
}

export default connect()(TooltipTrigger);
