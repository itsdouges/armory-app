// @flow

import T from 'i18n-react';
import { Link } from 'react-router';

export default [{
  id: 'newBags',
  message: <Link to="/banghead/c/Useless%20Charrcharr/bags">{T.translate('messages.newBags')}</Link>,
  options: {
    showOnce: true,
    type: 'info',
    iconName: 'new',
  },
}];
