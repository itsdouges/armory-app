import { PropTypes } from 'react';
import Textbox from 'common/components/Textbox';

const PasswordForm = ({ onFieldChange, valid, passwordValue, passwordConfirmValue, error }) => (
  <span>
    <Textbox
      showStatus
      required
      id="password"
      placeholder="Password"
      type="password"
      value={passwordValue}
      valid={valid}
      onChange={onFieldChange}
    />

    <Textbox
      showStatus
      required
      id="passwordConfirm"
      placeholder="Confirm password"
      type="password"
      value={passwordConfirmValue}
      error={error}
      valid={valid}
      onChange={onFieldChange}
    />
  </span>
);

PasswordForm.propTypes = {
  onFieldChange: PropTypes.func,
  valid: PropTypes.bool,
  passwordValue: PropTypes.string,
  passwordConfirmValue: PropTypes.string,
  error: PropTypes.any,
};

export default PasswordForm;
