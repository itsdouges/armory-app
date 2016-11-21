// @flow

export default function getParameterByName (
  name: string,
  url: string = window.location.href
): string {
  const normalisedName = name.replace(/[[\]]/g, '\\$&');

  const regex = new RegExp(`[?&]${normalisedName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);

  if (!results || !results[2]) return '';

  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
