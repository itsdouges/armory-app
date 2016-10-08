import { PropTypes, Component } from 'react';
import cx from 'classnames';

import config from 'config';
import SvgIcon from 'common/components/Icon/Svg';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Textbox from 'common/components/Textbox';

import styles from './styles.less';

const buildEmbedScript = (name) => (
  // eslint-disable-next-line
  `<iframe margin="0" frameBorder="0" width="500" height="192" src="${window.location.origin}/${config.embeds.character}/index.html?name=${name}" />`
);

export default class Embed extends Component {
  static propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
  };

  state = {
    shown: false,
  };

  toggle = () => {
    this.setState({
      shown: !this.state.shown,
    });
  };

  render () {
    const { name, className } = this.props;
    const { shown } = this.state;

    return (
      <div className={cx(styles.root, className)}>
        <TooltipTrigger data={shown ? 'Hide Embed Markup' : 'Show Embed Markup'}>
          <SvgIcon
            size="medium"
            name="code"
            onClick={this.toggle}
            className={styles.icon}
          />
        </TooltipTrigger>

        {shown && (
          <div className={styles.input}>
            <TooltipTrigger data="Copy and paste this markup onto your website.">
              <SvgIcon name="help" />
            </TooltipTrigger>

            <Textbox value={buildEmbedScript(name)} readOnly />
          </div>
        )}
      </div>
    );
  }
}
