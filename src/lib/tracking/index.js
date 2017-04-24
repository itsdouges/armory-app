// @flow

export function pageView () {
  if (!window.ga || window.location.hostname.indexOf('localhost') >= 0) {
    if (__DEVELOPMENT__) {
      // eslint-disable-next-line
      console.log('localhost -> NO TRACK');
    }

    return;
  }

  window.ga('set', 'page', window.location.pathname);
  window.ga('set', 'title', document.title);
  window.ga('set', 'location', window.location.href);
  window.ga('send', 'pageview');
}

export function conversion () {
  window.google_trackConversion && window.google_trackConversion({
    google_conversion_id: 864486098,
    google_conversion_language: 'en',
    google_conversion_format: '3',
    google_conversion_label: '4P8dCMaGnW0Q0oWcnAM',
    google_conversion_color: 'ffffff',
    google_remarketing_only: false,
  });
}
