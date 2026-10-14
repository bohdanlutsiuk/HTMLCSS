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
  if (summary) {
    summary.textContent = show.summary.replace(/<[^>]*>/g, '');
  }

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
    if (ratingInput) {
      ratingInput.setAttribute('aria-invalid', 'false');
      ratingInput.removeAttribute('aria-describedby');
    }

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
  const ratingInput = dialog.querySelector('#note-rating');
  const noteTextarea = dialog.querySelector('#note-text');
  const errorMsg = dialog.querySelector('#note-rating-error');
  const statusEl = document.querySelector('#status');

  const closeDialog = () => {
    dialog.close();
      dialog._trigger.focus();
  };

  cancelBtn?.addEventListener('click', closeDialog);
  dialog.addEventListener('close', () => {
    dialog._trigger.focus();
  });

  const validateRating = () => {
    const ratingValue = ratingInput.value;
    const rating = parseInt(ratingValue, 10);
    const isValid = rating >= 1 && rating <= 10 && Number.isInteger(Number(ratingValue));

    if (!isValid) {
      if (errorMsg) {
        errorMsg.id = errorMsg.id || 'note-rating-error';
        errorMsg.textContent = 'Оцінка має бути цілим числом від 1 до 10';
        ratingInput.setAttribute('aria-invalid', 'true');
        ratingInput.setAttribute('aria-describedby', errorMsg.id);
      }
    } else {
      ratingInput.setAttribute('aria-invalid', 'false');
      ratingInput.removeAttribute('aria-describedby');
      if (errorMsg) errorMsg.textContent = '';
    }
    return isValid;
  };

  ratingInput?.addEventListener('input', validateRating);

  form?.addEventListener('submit', (event) => {
    event.preventDefault();

    const showId = parseInt(form.dataset.id, 10);
    if (!validateRating()) {
      ratingInput?.focus();
      return;
    }

    const ratingValue = ratingInput.value;
    const rating = parseInt(ratingValue, 10);
    const text = noteTextarea.value.trim();

    try {
      saveNote(showId, { rating, text });
      refresh();

      const results = document.querySelector('#results');
      const newCard = results?.querySelector(`[data-id="${showId}"]`);
      const newBtn = newCard?.querySelector('[data-action="details"]');
      if (newBtn instanceof HTMLElement) {
        dialog._trigger = newBtn;
      }
      console.log(newCard);

      const show = getShow(showId);
      if (statusEl) {
        statusEl.textContent = `Нотатку до ${show.name} збережено`;
      }

      closeDialog();
    } catch (e) {
      if (errorMsg) errorMsg.textContent = e.message;
    }
  });
}
