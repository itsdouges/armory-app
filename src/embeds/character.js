// @flow

import ReactDOM from 'react-dom';

import Base from '../base';
import Character from './components/Character';
import qs from 'lib/qs';
import { pageView } from 'lib/tracking';
import Head from 'common/components/Head';

const characterName = qs('name');

ReactDOM.render(
  <Base>
    <div>
      <Head title={`Character Embed | ${characterName}`} />
      <Character name={characterName} />
    </div>
  </Base>,
  document.getElementById('root')
);

pageView();
