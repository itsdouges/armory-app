import T from 'i18n-react';
import * as ls from 'lib/local-storage';
import merge from 'lodash/merge';

const LANGUAGE_KEY = 'LANGUAGE_LS_KEY';
const DEFAULT_LANGUAGE = 'en';

export const languages = ['en', 'fr', 'de', 'es', 'ru'];

export function set (lang) {
  ls.set(LANGUAGE_KEY, lang);

  const text = require(`./texts/${lang}.json`);

  T.setTexts(merge(
    lang !== 'en' && require('./texts/en.json'),
    text,
  ));
}

export function get () {
  return ls.get(LANGUAGE_KEY);
}

set(ls.get(LANGUAGE_KEY) || DEFAULT_LANGUAGE);
