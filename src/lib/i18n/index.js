import T from 'i18n-react';
import * as ls from 'lib/local-storage';

const LANGUAGE_KEY = 'LANGUAGE_LS_KEY';
const DEFAULT_LANGUAGE = 'en';

export const languages = ['en', 'fr', 'de', 'es', 'zh', 'ru'];

export function set (lang) {
  ls.set(LANGUAGE_KEY, lang);

  T.setTexts(require(`./texts/${lang}.json`));
}

export function get () {
  return ls.get(LANGUAGE_KEY);
}

set(ls.get(LANGUAGE_KEY) || DEFAULT_LANGUAGE);
