// @flow

export function pageView () {
  if (!window.ga || window.location.hostname.indexOf('localhost') >= 0) {
    if (__DEVELOPMENT__) {
      console.log('localhost -> NO TRACK');
    }

    return;
  }

  window.ga('send', 'pageview', {
    title: document.title,
    location: window.location.href,
    page: window.location.pathname,
  });
}
