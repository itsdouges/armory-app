// @flow

import T from 'i18n-react';
import * as ls from 'lib/local-storage';

const LANGUAGE_KEY = 'LANGUAGE_LS_KEY';
const DEFAULT_LANGUAGE = 'en';

export const languages = [
  { short: 'en', long: 'English' },
  { short: 'fr', long: 'Le Français' },
  { short: 'de', long: 'Deutsch' },
  { short: 'es', long: 'Español' },
  { short: 'zh', long: '汉语/漢語' },
  { short: 'ru', long: 'Pу́сский язы́к' },
];

export function set (lang: string) {
  ls.set(LANGUAGE_KEY, lang);

  T.setTexts(require(`./texts/${lang}.json`));
}

export function get (): string {
  return ls.get(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
}

set(get());
