/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} FilterOptions
 * @property {string | null} [query] частина назви
 * @property {string | null} [genre] жанр
 * @property {number | null} [minRating] мінімальна оцінка
 */

/**
 * C2. Повертає серіали, які відповідають усім заданим фільтрам.
 * Специфікація — ТЗ, C2.
 *
 * @param {Show[]} shows
 * @param {FilterOptions} [options]
 * @returns {Show[]}
 */
export function filterShows(shows, options) {
  if (!options) {
    return [...shows];
  }
  return shows.filter((show) => {
    if (options.query && !show.name.toLowerCase().includes(options.query.trim().toLowerCase())) {
      return false;
    }
    if (options.genre && !show.genres.includes(options.genre)) {
      return false;
    }
    if (options.minRating && show.rating < options.minRating) {
      return false;
    }
    return true;
  });
}
