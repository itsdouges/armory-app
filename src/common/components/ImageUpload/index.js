import { PropTypes, Component } from 'react';
import styles from './styles.less';

export default class ImageUpload extends Component {
  static propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
  };

  state = {
    hovering: false,
  };

  show = () => {
    this.setState({
      hovering: true,
    });
  };

  hide = () => {
    this.setState({
      hovering: false,
    });
  };

  render () {
    if (this.props.disabled) {
      return this.props.children;
    }

    return (
      <div
        onMouseLeave={this.hide}
        onMouseEnter={this.show}
        className={styles.root}
      >
        {this.state.hovering && <div className={styles.uploadOverlay}>UPLOAD IMAGE</div>}

        {this.props.children}
      </div>
    );
  }
}
