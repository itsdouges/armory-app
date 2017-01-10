// @flow

function loadScript (url) {
  const script = document.createElement('script');
  script.src = url;
  document.head.appendChild(script);
}

export function pageView () {
  if (!window.ga || window.location.hostname.indexOf('localhost') >= 0) {
    if (__DEVELOPMENT__) {
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
  window.google_conversion_id = 864486098;
  window.google_conversion_language = 'en';
  window.google_conversion_format = '3';
  window.google_conversion_color = 'ffffff';
  window.google_conversion_label = '4P8dCMaGnW0Q0oWcnAM';
  window.google_remarketing_only = false;
  loadScript('//www.googleadservices.com/pagead/conversion.js');
}
