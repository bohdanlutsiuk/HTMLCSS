import { watchlist, notes } from './state.js';

/** @typedef {import('./state.js').Show} Show */

/**
 * C1. Показує серіали в списку #results — по картці з шаблону #show-card на кожен, у тому
 * самому порядку, — і оновлює рядок статусу #status. Специфікація — ТЗ, C1.
 *
 * @param {readonly Show[]} list серіали, які треба показати
 */
export function renderShows(list) {
  const resultsList = document.querySelector('#results');
  const statusEl = document.querySelector('#status');
  const template = document.querySelector('#show-card');

  if (!resultsList || !statusEl || !template) return;

  resultsList.innerHTML = '';

  for (const show of list) {
    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.card');

    card.dataset.id = show.id.toString();

    // Заповнення полів
    card.querySelectorAll('[data-field="name"]').forEach((el) => {
      el.textContent = show.name;
    });

    const yearEl = card.querySelector('[data-field="year"]');
    if (yearEl) yearEl.textContent = show.year?.toString() || '';

    const genresEl = card.querySelector('[data-field="genres"]');
    if (genresEl) genresEl.textContent = show.genres.join(', ');

    const ratingEl = card.querySelector('[data-field="rating"]');
    if (ratingEl) ratingEl.textContent = show.rating?.toString() || '—';

    // Врахування watchlist та нотаток (хоча кнопки працюють у C2, стан відображаємо тут)
    const toggleBtn = card.querySelector('[data-action="toggle"]');
    if (toggleBtn) {
      const isInWatchlist = watchlist.has(show.id);
      toggleBtn.setAttribute('aria-pressed', isInWatchlist.toString());
    }

    const myNote = notes.get(show.id);
    if (myNote) {
      const myRatingContainer = card.querySelector('.card__mine');
      const myRatingEl = card.querySelector('[data-field="my-rating"]');
      if (myRatingContainer && myRatingEl) {
        myRatingEl.textContent = myNote.rating.toString();
        myRatingContainer.hidden = false;
      }

      const noteEl = card.querySelector('.card__note');
      if (noteEl && myNote.text) {
        noteEl.textContent = myNote.text;
        noteEl.hidden = false;
      }
    }

    resultsList.appendChild(clone);
  }

  // Оновлення статусу
  const count = list.length;
  if (count === 0) {
    statusEl.textContent = 'Нічого не знайдено';
  } else {
    statusEl.textContent = `Знайдено: ${count} з ${count}`;
  }
}
