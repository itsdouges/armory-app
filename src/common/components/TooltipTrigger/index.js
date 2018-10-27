// @flow

import type { InjectedProps } from 'react-debounce-decorator';

import { Component, cloneElement } from 'react';
import { connect } from 'react-redux';

import { showTooltip } from 'features/Gw2/actions';
import tooltipDebounce from 'react-debounce-decorator';

type Props = {
  data?: string | Object,
  showTooltip?: Function,
  children: React.ComponentType<*>,
  type?: string,
  onMouseEnter?: (SyntheticEvent<*>) => void,
  onMouseLeave?: (SyntheticEvent<*>) => void,
} & InjectedProps;

/**
 * Ensure the props passed down from <TooltipTrigger /> make their
 * way to the actual dom elements! Else this won't work ;-).
 */
export default connect(
  null,
  {
    showTooltip,
  }
)(
  tooltipDebounce()(
    class TooltipTrigger extends Component<Props> {
      props: Props;

      show = (e: SyntheticEvent<*>) => {
        const { data, type, show, onMouseEnter, showTooltip: displayTooltip } = this.props;
        if (!data) {
          return;
        }

        show(() => {
          onMouseEnter && onMouseEnter(e);
          displayTooltip &&
            displayTooltip(true, {
              data,
              type,
            });
        });
      };

      hide = (e: SyntheticEvent<*>) => {
        const { hide, onMouseLeave, showTooltip: displayTooltip } = this.props;

        hide(() => {
          onMouseLeave && onMouseLeave(e);
          displayTooltip && displayTooltip(false);
        });
      };

      render() {
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
  )
);
