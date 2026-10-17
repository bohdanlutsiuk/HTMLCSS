/* Courtly Booking — entry point */

import { fetchVenues } from './api.js';
import { renderResults } from './render.js';
import { openBooking } from './booking.js';
import { toISODate } from './format.js';

const form = document.getElementById('search-form');
const results = document.getElementById('results');
const status = document.getElementById('status');

// Venues currently on screen
let venues = [];
let isSearchStarted = false;

/* Mobile menu */

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('is-open', !isOpen);
});

/* Search */

form.date.value = toISODate(new Date());

function readFilters() {
  return { city: form.city.value, sport: form.sport.value };
}

async function handleSearch(event) {
  event.preventDefault();
  isSearchStarted = true;
  status.textContent = 'Шукаємо…';
  results.setAttribute('aria-busy', 'true');

  const found = await fetchVenues(readFilters());
  renderResults(results, found);
  venues = found;
  results.setAttribute('aria-busy', 'false');

  const count = results.children.length;
  status.textContent = count ? `Знайдено: ${count}` : 'Нічого не знайдено';
}

form.addEventListener('submit', handleSearch);

/* Booking */

function bindBookButtons() {
  document.querySelectorAll('.venue-card__book').forEach((button) => {
    button.addEventListener('click', () => {
      const venue = venues.find((item) => item.id === button.dataset.id);
      openBooking(venue, form.date.value || toISODate(new Date()));
    });
  });
}

/* Initial state: popular venues */

const initialVenues = await fetchVenues({ popular: true });

if (!isSearchStarted) {
  venues = initialVenues;
  renderResults(results, venues);
  results.setAttribute('aria-busy', 'false');
  status.textContent = `Популярні майданчики: ${venues.length}`;
  bindBookButtons();
}
