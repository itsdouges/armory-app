/* eslint no-return-assign:0 */
import { PropTypes, Component } from 'react';
import styles from './styles.less';
import { get, put } from 'axios';
import config from 'config';
import ProgressIcon from '../Icon/Progress';
import Message from 'common/components/Message';

const FILE_SIZE_LIMIT = 1000000;
const ALLOWED_FILE_TYPES = ['image/x-png', 'image/jpeg', 'image/png', 'image/jpg'];

export default class ImageUpload extends Component {
  static propTypes = {
    children: PropTypes.any,
    disabled: PropTypes.bool,
    onUploadComplete: PropTypes.func,
    hintText: PropTypes.any,
    forceShow: PropTypes.bool,
    uploadName: PropTypes.string,
  };

  static defaultProps = {
    onUploadComplete: () => {},
  };

  state = {
    hovering: false,
    uploading: false,
    error: '',
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

    if (!file) {
      return;
    }

    if (ALLOWED_FILE_TYPES.indexOf(file.type) === -1) {
      this.setState({
        error: 'Image should be PNG or JPEG, click to choose another.',
      });

      return;
    }

    if (file.size > FILE_SIZE_LIMIT) {
      this.setState({
        error: 'Image should be less than 1MB, click to choose another.',
      });

      return;
    }

    this.setState({
      uploading: true,
      error: '',
    });

    const { uploadName } = this.props;

    get(`${config.api.endpoint}sign-upload?contentType=${file.type}&fileName=${uploadName}`)
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

            this.fileInput.value = '';
            this.props.onUploadComplete();
          }, () => {
            this.setState({
              error: 'error :-(',
            });
          }));
  };

  render () {
    if (this.props.disabled) {
      return this.props.children;
    }

    const { hovering, uploading, error } = this.state;

    const showOverlay = this.props.forceShow || hovering || uploading || error;
    const overlayContent = (error && <Message type="error">{error}</Message>) ||
      (uploading && <ProgressIcon />) ||
      <span className={styles.hintText}>{this.props.hintText || 'UPLOAD IMAGE'}</span>;

    return (
      <div
        onMouseLeave={this.hide}
        onMouseEnter={this.show}
        className={styles.root}
      >
        {showOverlay && (
          <div className={styles.uploadOverlay}>
            {overlayContent}
          </div>
        )}

        {uploading || <input
          accept="image/x-png,image/jpeg"
          className={styles.fileUpload}
          onChange={this.upload}
          ref={(ref) => this.fileInput = ref}
          type="file"
        />}

        {this.props.children}
      </div>
    );
  }
}
