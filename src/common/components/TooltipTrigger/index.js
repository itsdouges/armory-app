import { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { showTooltip } from 'features/Gw2/actions';
import debounce from 'lodash/debounce';

const TooltipTriggerDecorator = (ComposedComponent) => connect()(
  class TooltipTrigger extends Component {
    static propTypes = {
      data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      dispatch: PropTypes.func,
    };

    onMouseEnter = debounce(() => {
      this.props.dispatch(showTooltip(true));
    }, 50);

    onMouseLeave = debounce(() => {
      this.props.dispatch(showTooltip(false));
    }, 50);

    render () {
      return (
        <span onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <ComposedComponent {...this.props} />
        </span>
      );
    }
  }
);

export default TooltipTriggerDecorator;
