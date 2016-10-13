import ReactDOM from 'react-dom';

import Base from './base';
import CharacterLite from 'features/Character/Lite';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';

pageView();

ReactDOM.render(
  <Base>
    <CharacterLite name={qs('name')} />
  </Base>,
  document.getElementById('root')
);
