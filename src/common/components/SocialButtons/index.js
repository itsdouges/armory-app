import styles from './styles.less';
import Message from 'common/components/Message';

function onClick (e) {
  const textbox = e.target;
  textbox.setSelectionRange(0, textbox.value.length);
}

const SocialButtons = () => (
  <div className={styles.root}>
    <Message>
      Like what you see? <strong>Share it!</strong>
    </Message>

    <div className={styles.buttons}>
      <input onClick={onClick} className={styles.textbox} readOnly value={window.location.href} />
    </div>
  </div>
);

export default SocialButtons;
