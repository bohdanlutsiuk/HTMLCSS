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
