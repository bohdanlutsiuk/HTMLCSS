import { toggle, watchlist } from './state.js';
import { openDetails } from './details.js';

/**
 * C2. Підключає кнопки карток у списку #results: «До списку» додає серіал до мого списку або
 * прибирає з нього, «Детальніше» відкриває діалог (openDetails з details.js). main.js викликає
 * цю функцію один раз, після першого показу списку. Специфікація — ТЗ, C2.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initList(refresh) {
  const results = document.querySelector('#results');
  if (!results) return;

  results.addEventListener('click', (event) => {
    const target = event.target;
    const card = target.closest('.card');
    if (!card) return;

    const showId = parseInt(card.dataset.id, 10);
    if (isNaN(showId)) return;

    const actionBtn = target.closest('[data-action]');
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;

    if (action === 'toggle') {
      const cardsBefore = Array.from(results.querySelectorAll('.card'));
      const index = cardsBefore.indexOf(card);

      toggle(showId);
      refresh();

      const newCard = results.querySelector(`[data-id="${showId}"]`);
      if (newCard) {
        const newBtn = newCard.querySelector('[data-action="toggle"]');
        if (newBtn instanceof HTMLElement) newBtn.focus();
      } else {
        const cardsAfter = Array.from(results.querySelectorAll('.card'));
        const targetCard = cardsAfter[index] || cardsAfter[index - 1];

        if (targetCard) {
          const targetBtn = targetCard.querySelector('[data-action="toggle"]');
          if (targetBtn instanceof HTMLElement) targetBtn.focus();
        } else {
          const heading = document.querySelector('#results-heading');
          if (heading instanceof HTMLElement) heading.focus();
        }
      }
    } else if (action === 'details') {
      openDetails(showId);
    }
  });
}
