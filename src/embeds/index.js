// @flow

const init = () => {
  import('./bootstrap').then((module) => module.default());
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 1);
}
