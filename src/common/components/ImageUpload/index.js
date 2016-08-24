/* eslint no-return-assign:0 */
import { PropTypes, Component } from 'react';
import styles from './styles.less';
import { get, put } from 'axios';
import config from 'env';
import ProgressIcon from '../Icon/Progress';

export default class ImageUpload extends Component {
  static propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onUploadComplete: PropTypes.func,
  };

  static defaultProps = {
    onUploadComplete: () => {},
  };

  state = {
    hovering: false,
    uploading: false,
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

  upload = (e) => {
    const [file] = e.target.files;

    this.setState({
      uploading: true,
    });

    return get(`${config.api.endpoint}sign-upload?contentType=${file.type}&fileName=avatar`)
      .then(({ data: { signedRequest } }) =>
          put(signedRequest, file, {
            headers: {
              Accept: '*/*',
              'Content-Type': file.type,
            },
          })
          .then(() => {
            this.setState({
              uploading: false,
            });

            this.fileInput.files = undefined;
            this.props.onUploadComplete();
          }));
  };

  render () {
    if (this.props.disabled) {
      return this.props.children;
    }

    const { hovering, uploading } = this.state;

    return (
      <div
        onMouseLeave={this.hide}
        onMouseEnter={this.show}
        className={styles.root}
      >
        {(uploading || hovering) && (
          <div className={styles.uploadOverlay}>
            {uploading ? <ProgressIcon /> : <span>UPLOAD IMAGE</span>}
          </div>
        )}

        <input
          accept="image/x-png,image/jpeg"
          className={styles.fileUpload}
          onChange={this.upload}
          ref={(ref) => this.fileInput = ref}
          type="file"
        />

        {this.props.children}
      </div>
    );
  }
}
