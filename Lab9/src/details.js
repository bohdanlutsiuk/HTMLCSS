import { getShow, notes, saveNote } from './state.js';

/**
 * C4. Відкриває діалог #details для серіалу: назва, опис, посилання на сторінку TVmaze і форма
 * з моєю оцінкою й нотаткою. Специфікація — ТЗ, C4.
 *
 * @param {number} id
 */
export function openDetails(id) {
  const show = getShow(id);
  const dialog = document.querySelector('#details');
  if (!dialog) return;

  // Заповнення інформації про серіал
  const title = dialog.querySelector('#details-title');
  if (title) title.textContent = show.name;

  const summary = dialog.querySelector('#details-summary');
  if (summary) summary.innerHTML = show.summary;

  const link = dialog.querySelector('#details-link');
  if (link) link.href = show.url;

  // Підготовка форми
  const form = dialog.querySelector('#note-form');
  if (form) {
    form.dataset.id = id.toString();
    const ratingInput = form.querySelector('#note-rating');
    const noteTextarea = form.querySelector('#note-text');
    const errorMsg = form.querySelector('#note-rating-error');

    if (errorMsg) errorMsg.textContent = '';

    const existingNote = notes.get(id);
    if (ratingInput instanceof HTMLInputElement) {
      ratingInput.value = existingNote ? existingNote.rating.toString() : '';
    }
    if (noteTextarea instanceof HTMLTextAreaElement) {
      noteTextarea.value = existingNote ? existingNote.text : '';
    }
  }

  dialog.showModal();
}

/**
 * C4. Підключає діалог #details: закриття й форму «Моя оцінка й нотатка». main.js викликає цю
 * функцію один раз. Специфікація — ТЗ, C4.
 *
 * @param {() => void} refresh перемальовує список для поточних фільтрів
 */
export function initDetails(refresh) {
  const dialog = document.querySelector('#details');
  if (!dialog) return;

  const form = dialog.querySelector('#note-form');
  const cancelBtn = dialog.querySelector('button[type="button"]');

  cancelBtn?.addEventListener('click', () => {
    dialog.close();
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const showId = parseInt(form.dataset.id, 10);
    const ratingInput = form.querySelector('#note-rating');
    const noteTextarea = form.querySelector('#note-text');
    const errorMsg = form.querySelector('#note-rating-error');

    if (errorMsg) errorMsg.textContent = '';

    const rating = parseInt(ratingInput.value, 10);
    const text = noteTextarea.value.trim();

    // Валідація
    if (isNaN(rating) || rating < 1 || rating > 10) {
      if (errorMsg) errorMsg.textContent = 'Оцінка має бути цілим числом від 1 до 10';
      return;
    }

    try {
      saveNote(showId, { rating, text });
      refresh();
      dialog.close();
    } catch (e) {
      if (errorMsg) errorMsg.textContent = e.message;
    }
  });
}
