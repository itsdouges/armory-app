export function isSmallScreen () {
  return window.innerWidth <= 480;
}

export default function addEvent (event, cb) {
  window.addEventListener(event, cb, false);
  return () => window.removeEventListener(event, cb, false);
}
