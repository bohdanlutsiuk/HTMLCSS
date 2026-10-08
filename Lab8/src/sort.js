/** @typedef {import('./normalize.js').Show} Show */

/**
 * C3. Повертає новий масив серіалів, відсортований за полем `key`.
 * Специфікація — ТЗ, C3.
 *
 * @param {Show[]} shows
 * @param {'name' | 'year' | 'rating'} key
 * @param {'asc' | 'desc'} [direction]
 * @returns {Show[]}
 */
export function sortShows(shows, key, direction = 'asc') {
  return shows.toSorted((a, b) => {
    const reverse = direction === 'asc' ? 1 : -1;
    let aVal = a[key];
    let bVal = b[key];

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal === null) return 1;
    if (bVal === null) return -1;

    if (aVal > bVal) return reverse;
    if (aVal < bVal) return -reverse;
    return 0;
  });
}
