import { PropTypes, Component } from 'react';
import cx from 'classnames';

import SvgIcon from 'common/components/Icon/Svg';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Textbox from 'common/components/Textbox';

import styles from './styles.less';

const buildEmbedScript = (name) => (`
<div data-armory-embed="character" data-armory-name="${name}"></div>
<script async type="text/javascript" src="${window.location.origin}/gw2aEmbeds.js"></script>
`);

export default class Embed extends Component {
  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    shown: false,
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        shown: false,
      });
    }
  }

  show = () => {
    this.setState({
      shown: true,
    });
  };

  render () {
    const { name, className } = this.props;
    const { shown } = this.state;

    return (
      <div className={cx(styles.root, className)}>
        <button
          onClick={this.show}
          className={styles.embedText}
        >
          Embed
        </button>

        {shown && (
          <div className={styles.input}>
            <Textbox
              value={buildEmbedScript(name)}
              readOnly
              autoSelect
              singleClickSelect
              containerClassName={styles.textboxContainer}
              iconRight={(
                <TooltipTrigger data="Copy and paste this markup onto your website.">
                  <SvgIcon name="help-black" />
                </TooltipTrigger>
              )}
            />
          </div>
        )}
      </div>
    );
  }
}
