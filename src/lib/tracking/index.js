export function pageView () {
  if (!window.ga || window.location.hostname.indexOf('localhost') >= 0) {
    if (__DEVELOPMENT__) console.log('localhost -> NO TRACK');

    return;
  }

  window.ga('send', 'pageview', {
    page: window.location.pathname,
  });
}
