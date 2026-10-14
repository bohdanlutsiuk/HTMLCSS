/** @typedef {import('./state.js').Filters} Filters */

/**
 * C3. Повертає поточні значення форми фільтрів #filters. Поки C3 не виконано, фільтрів немає,
 * і список показує всі серіали. Специфікація — ТЗ, C3.
 *
 * @returns {Filters}
 */
export function readFilters() {
  const form = document.querySelector('#filters');
  if (!form) return {};

  const formData = new FormData(form);
  return {
    query: formData.get('query')?.toString() || '',
    genre: formData.get('genre')?.toString() || '',
    mine: formData.get('mine') === 'on',
  };
}

/**
 * C3. Підключає форму фільтрів: після кожної зміни — refresh(). main.js викликає цю функцію
 * один раз. Специфікація — ТЗ, C3.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initFilters(refresh) {
  const form = document.querySelector('#filters');
  if (!form) return;

  form.addEventListener('input', () => refresh());
  form.addEventListener('change', () => refresh());
  form.addEventListener('reset', () => {
    // reset подія спрацьовує до очищення форми, тому чекаємо наступного тіку
    setTimeout(refresh, 0);
  });
}
