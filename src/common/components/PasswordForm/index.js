// @flow

import T from 'i18n-react';

import Textbox from 'common/components/Textbox';

type PasswordFormProps = {
  onFieldChange?: Function,
  valid?: boolean,
  passwordValue: string,
  passwordConfirmValue: string,
  error?: string,
};

const PasswordForm = ({
  onFieldChange,
  valid,
  passwordValue,
  passwordConfirmValue,
  error,
}: PasswordFormProps) => (
  <span>
    <Textbox
      showStatus
      required
      id="password"
      label={T.translate('settings.changePassword.inputs.password')}
      placeholder={T.translate('settings.changePassword.inputs.password')}
      type="password"
      value={passwordValue}
      valid={valid}
      onChange={onFieldChange}
    />

    <Textbox
      showStatus
      required
      id="passwordConfirm"
      label={T.translate('settings.changePassword.inputs.confirm')}
      placeholder={T.translate('settings.changePassword.inputs.confirm')}
      type="password"
      value={passwordConfirmValue}
      error={error}
      valid={valid}
      onChange={onFieldChange}
    />
  </span>
);

export default PasswordForm;
