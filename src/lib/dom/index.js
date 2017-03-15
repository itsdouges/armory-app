// @flow

export function isSmallScreen (): boolean {
  return window.innerWidth <= 480;
}

export function addEvent (event: string, cb: Function) {
  window.addEventListener(event, cb, false);
  return () => window.removeEventListener(event, cb, false);
}

export function isDescendant (parent: Element, child: Element): boolean {
  let node = child.parentNode;

  while (node != null) {
    if (node === parent) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

export function addScript (src: string) {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  window.document.head.appendChild(script);
}

export function addStyleSheet (src: string) {
  const style = document.createElement('link');
  style.href = src;
  style.setAttribute('rel', 'stylesheet');
  style.setAttribute('type', 'text/css');
  document.head && document.head.appendChild(style);
}
