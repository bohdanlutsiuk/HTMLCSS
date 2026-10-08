/** @typedef {import('./normalize.js').Show} Show */

/**
 * @typedef {object} GenreStats
 * @property {number} count скільки серіалів мають цей жанр
 * @property {number | null} averageRating середня оцінка цих серіалів
 */

/**
 * C4. Рахує статистику для кожного жанру.
 * Специфікація — ТЗ, C4.
 *
 * @param {Show[]} shows
 * @returns {Record<string, GenreStats>} ключ — назва жанру
 */
export function genreStats(shows) {
  if (shows.length === 0) return {};

  const stats = {};

  shows.forEach((show) => {
    show.genres.forEach((genre) => {
      if (!stats[genre]) {
        stats[genre] = { count: 1, ratings: [] };
        if (show.rating !== null) {
          stats[genre].ratings.push(show.rating);
        }
      } else {
        stats[genre].count++;
        if (show.rating !== null) {
          stats[genre].ratings.push(show.rating);
        }
      }
    });
  });

  const results = {};
  for (const genre in stats) {
    results[genre] = {
      count: stats[genre].count,
      averageRating:
        stats[genre].ratings.length !== 0
          ? Math.round(
              (stats[genre].ratings.reduce((a, b) => a + b, 0) / stats[genre].ratings.length) * 10,
            ) / 10
          : null,
    };
  }
  return results;
}
