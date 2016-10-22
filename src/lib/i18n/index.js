import T from 'i18n-react';
import * as ls from 'lib/local-storage';

const LANGUAGE_KEY = 'LANGUAGE_LS_KEY';
const DEFAULT_LANGUAGE = 'en';

export function set (language) {
  ls.set(LANGUAGE_KEY, language);
  T.setTexts(require(`./texts/${language}.json`));
}

set(ls.get(LANGUAGE_KEY) || DEFAULT_LANGUAGE);
