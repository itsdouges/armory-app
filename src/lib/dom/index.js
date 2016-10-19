export function isSmallScreen () {
  return window.innerWidth <= 480;
}

export function addEvent (event, cb) {
  window.addEventListener(event, cb, false);
  return () => window.removeEventListener(event, cb, false);
}

export function isDescendant (parent, child) {
  let node = child.parentNode;

  while (node != null) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}
