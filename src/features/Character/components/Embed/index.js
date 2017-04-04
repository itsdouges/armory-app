// @flow

import { Component } from 'react';
import cx from 'classnames';

import T from 'i18n-react';
import SvgIcon from 'common/components/Icon/Svg';
import TooltipTrigger from 'common/components/TooltipTrigger';
import Textbox from 'common/components/Textbox';

import styles from './styles.less';

const buildEmbedScript = (name) => (`
<div data-armory-embed="character" data-armory-name="${name}"></div>
<script async type="text/javascript" src="${window.location.origin}/gw2aEmbeds.js"></script>
`);

type Props = {
  name: string,
  className?: string,
};

type State = {
  shown: boolean,
};

export default class Embed extends Component {
  props: Props;
  state: State = {
    shown: false,
  };

  componentWillReceiveProps (nextProps: Props) {
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
          {T.translate('characters.embedCta')}
        </button>

        {shown && (
          <div className={styles.input}>
            <Textbox
              id="character-embed"
              value={buildEmbedScript(name)}
              readOnly
              autoSelect
              singleClickSelect
              label={T.translate('characters.embedTooltip')}
              containerClassName={styles.textboxContainer}
              iconRight={(
                <TooltipTrigger data={T.translate('characters.embedTooltip')}>
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
