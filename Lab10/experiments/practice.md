# Practice

## 5.3 Scenario A - Console and Stack Trace

### Issue 1: ReferenceError during booking

**1. Steps to reproduce:**
1. Open the page `index.html`.
2. Click the **"Забронювати"** (Book) button on any venue card.
3. In the dialog that opens, click the **"Підтвердити"** (Confirm) button.
4. Observe the developer console.

**2. Console Message:**
```
Uncaught ReferenceError: renderBookingsCount is not defined
    at HTMLFormElement.confirmBooking (booking.js:67:3)
confirmBooking	@	booking.js:67
```

**3. Stack Trace:**
*   `confirmBooking` - `booking.js` at line 67

**4. Value at breakpoint and source:**
*   **Scope:** The function `confirmBooking` attempts to call `renderBookingsCount()`.
*   **Value:** `renderBookingsCount` is `undefined`.
*   **Source:** In `booking.js` at line 39, the function is defined as `renderBookingCount`, but at line 67, it is called as `renderBookingsCount`.

**5. Hypotheses:**
*   **Hypothesis 1 (Self):** There is a typo in the function call in `booking.js`.
    *   **Verified:** Searching `booking.js` confirmed that `renderBookingCount` is declared while `renderBookingsCount` is called.
*   **Hypothesis 2 (AI):** Function Name Mismatch (Typo).  
    *   **Verified:** Looking at lines 39 and 67 uncovered that names do indeed differ.
*   **Hypothesis 3 (AI):** Scope or Hoisting Issue.
    *   **Denied:** Function and its call are located in the same file which is `booking.js`. Hoisting is also verified not to be the culprit. 

**6. Patch:**
```
// booking.js:67
-  renderBookingsCount();
+  renderBookingCount();
```

**7. Verification**
There are no console errors anymore. Application works as intended.

### Issue 2: TypeError during search results rendering

**1. Steps to reproduce:**
1. Open the page `index.html`.
2. Click the **"Знайти"** (Find) button without changing any inputs.
3. Observe the developer console.

**2. Console Message:**
```
Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'toLocaleString')
    at formatPrice (format.js:5:19)
    at createCard (render.js:19:42)
    at Array.map (<anonymous>)
    at renderResults (render.js:29:32)
    at HTMLFormElement.handleSearch (main.js:40:3)
```

**3. Stack Trace:**
*   `formatPrice` - `format.js` at line 5
*   `createCard` - `render.js` at line 19
*   `renderResults` - `render.js` at line 29
*   `handleSearch` (async) - `main.js` at line 40

**4. Value at breakpoint and source:**
*   **Breakpoint:** `formatPrice` function in `format.js`.
*   **Value:** The argument `value` is `undefined`.
*   **Source:** In `data/venues.json`, the venue with `id: "royal-court"` has a typo in its property name: `"pricePerhour": 1200` (line 84) instead of `"pricePerHour"`. When `renderResults` tries to format the price for this venue, it accesses a non-existent property. This venue was not visible initially because it wasn't in the top 6 "popular" venues, but it appears when a full search is performed.

**5. Hypotheses:**
*   **Hypothesis 1 (Self):** There is a data integrity issue in the JSON file.
    *   *Verification:* Inspecting `data/venues.json` confirmed that one entry has `pricePerhour` while all others use `pricePerHour`.
*   **Hypothesis 2 (AI):** Data Inconsistency (Typo in JSON property name).
    *   **Verified:** After inspecting `data/venues.json` it was confirmed that one entry has `pricePerhour` instead of `pricePerHour`.
*   **Hypothesis 3 (AI):** API Filter returning Malformed Objects.
    *   **Verified:** It was verified that `fetchVenues` does return array where one object misses `pricePerHour` attribute.

**6. Patch:**
```
// data/venues.json:84
-    "pricePerhour": 1200,
+    "pricePerHour": 1200,
```

**7. Verification**
There are no console errors anymore. Application works as intended.

## 5.4. Scenario B - DOM

### Issue 1: Incorrect selector for mobile menu toggle and double event handlers

**1. Expected vs Actual behavior:**
*   **Expected:** The mobile menu toggle button (`.menu-toggle`) should open the navigation menu. The "My bookings" button (`.bookings-toggle`) should only open the bookings dialog.
*   **Actual:** The mobile menu toggle button does not work at all. Instead, clicking the "My bookings" button triggers both the navigation menu (on mobile) and the bookings dialog.
*   **Specific Defect:** In `main.js` (line 17), the code uses `document.querySelector('.site-header button')`. This selector picks the *first* button found in the header, which is `.bookings-toggle`. As a result, the menu toggle logic is incorrectly attached to the bookings button, while the actual menu button is left without a listener. Furthermore, `booking.js` (line 76) also attaches a listener to `.bookings-toggle`, leading to two handlers on one button.

**2. Elements in DevTools:**
*   **Element:** `button.menu-toggle`
    *   **Event Listeners:** Empty (no listeners attached).
*   **Element:** `button.bookings-toggle`
    *   **Attributes:** Incorrectly receives `aria-expanded` attributes during interaction due to `main.js`.
    *   **Event Listeners:** Contains two `click` listeners (one from `main.js` and one from `booking.js`).

**3. Console verification:**
*   `document.querySelector('.site-header button') === document.querySelector('.bookings-toggle')` returns `true`.
*   `getEventListeners(document.querySelector('.menu-toggle'))` shows no `click` handlers.
*   `getEventListeners(document.querySelector('.bookings-toggle'))` shows an array of 2 `click` handlers.

**4. Discrepancy:**
The code expects `menuToggle` to refer to the menu button, but the CSS selector `.site-header button` is too broad and hits the bookings button first in the DOM order. This causes a functional collision where one button performs two unrelated actions while the other button is dead.

**5. DOM Breakpoint:**
Setting a "Subtree modifications" breakpoint on `.site-header` shows that clicking `.bookings-toggle` triggers class changes on `#site-nav`, confirming the listener is misbound.

**6. AI Analysis & Patch:**
The selector in `main.js` should be more specific, targeting `.menu-toggle` instead of any button in the header.

```
// main.js:17
- const menuToggle = document.querySelector('.site-header button');
+ const menuToggle = document.querySelector('.menu-toggle');
```

### Issue 2: Incorrect status message update (Race condition in UI)

**1. Expected vs Actual behavior:**
*   **Expected:** After clicking "Find", the status line (`#status`) should show "Шукаємо…" (Searching...) and then update to "Знайдено: X" once results are loaded.
*   **Actual:** Because there are two separate `submit` listeners on the same form in `main.js`, they run almost simultaneously. The first one (line 34) is `async` and awaits `fetchVenues`. The second one (line 48) is synchronous and immediately checks `results.children.length`.
*   **Result:** The status message flashes "Шукаємо…", but then *immediately* changes to "Популярні майданчики: 6" (or whatever was there before) because the second listener finishes before the first one's `await` completes. The actual search results count only appears if the first listener wins the race or after the `fetch` finishes, but the second listener effectively overwrites "Шукаємо…" with the *old* count immediately.

**2. Elements in DevTools:**
*   **Element:** `p#status`
*   **Role:** `status`.
*   **Event Listeners:** Two `submit` listeners on `#search-form`.

**3. Console verification:**
*   `getEventListeners(document.getElementById('search-form')).submit` returns an array of 2 functions.
*   Executing the search and checking `document.getElementById('status').textContent` quickly shows it doesn't stay on "Шукаємо…" as long as the latency (400ms-1200ms) would suggest.

**4. Discrepancy:**
Code in `main.js:36` sets `status.textContent = 'Шукаємо…'`, but `main.js:50` (in a different listener for the same event) immediately sets it based on `results.children.length` *before* the new results are rendered.

**5. DOM Breakpoint:**
"Break on subtree modifications" on `#status` shows two consecutive changes immediately after clicking "Submit".

**6. AI Analysis & Patch:**
The status update logic should be unified within the `async` handler to ensure it reflects the state *after* the results are rendered.

## 5.5 Scenario C - Event Loop

### Issue 1: UI State Overwrite due to overlapping async operations

**1. Steps to reproduce:**
1. Open the page `index.html`.
2. Very quickly (within the first 400ms of loading) click the **"Знайти"** (Find) button.
3. Observe the status message (`#status`).

**Actual order of messages in UI:**
- "Завантаження…" (Initial HTML)
- "Шукаємо…" (Triggered by manual search)
- "Популярні майданчики: 6" (WRONG - Initial load finished and overwrote the search status)
- "Знайдено: 12" (Search results finally arrived)

**Logs for verification:**
```
registering submit listener
started fetchVenues(popular: true)
user clicked Find
status = 'Шукаємо…', started fetchVenues(city: '')
resolved!
status = 'Популярні майданчики: 6'
resolved!
status = 'Знайдено: 12'
```

**2. Explanation of the order:**
- **Synchronous start:** `main.js` runs as a module. It registers the `submit` listener and starts the initial `fetchVenues`. Then it hits a top-level `await` at line 63. This **suspends** the module evaluation.
- **Task Queue (User Interaction):** While the module is suspended, the user interacts with the page. Since the listener was already registered (synchronously, before the `await`), the `handleSearch` function is called.
- **Async Split:** `handleSearch` is also `async`. It updates the UI to "Шукаємо…", starts its own fetch, and **suspends** at its `await`.
- **Microtask Queue (Resumption):** When the initial fetch timer expires (Web API), its promise resolves. The continuation of the `main.js` module (lines 64-67) is pushed to the **Microtask Queue**.
- **The Defect:** Even though the user has already started a search, the module's initial flow is still "alive" and resumes as soon as its promise resolves. It unconditionally updates `status.textContent` to reflect the popular venues, ignoring the fact that a more recent asynchronous operation (the search) is in progress.
- **Final Microtask:** Eventually, the search fetch resolves, and its microtask updates the UI correctly.

**3. Execution Scheme:**

```
Call Stack -> fetchVenues(popular) -> Web API (Timer 400ms)
Call Stack -> await (main.js suspended)
... User Interaction ...
Call Stack -> handleSearch() -> status = 'Шукаємо…'
Call Stack -> fetchVenues(search) -> Web API (Timer 400ms+)
Call Stack -> await (handleSearch suspended)
... Timer 1 expires ...
Task Queue -> setTimeout callback -> Resolve Promise 1
Microtask Queue -> [main.js continuation] -> status = 'Популярні майданчики: 6' (OVERWRITE)
... Timer 2 expires ...
Task Queue -> setTimeout callback -> Resolve Promise 2
Microtask Queue -> [handleSearch continuation] -> status = 'Знайдено: X'
```

**4. The Fix:**
One must avoid global state updates from initial loads if a newer interaction has started. A common fix is to use a "loading" flag or a "request ID" to check if the result is still relevant. Another fix is to move the initial load logic into a function that checks if the user has already interacted with the form.
*Note: Using `setTimeout(..., 500)` would only hide the symptom (race condition) and might fail if the network is slower, whereas properly managing async state resolves the root cause.*

