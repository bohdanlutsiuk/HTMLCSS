# Practice

## 5.3 Scenario A - Console and Stack Trace

### Issue

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
```javascript
// booking.js:67
-  renderBookingsCount();
+  renderBookingCount();
```

**7. Verification**
There are no console errors anymore. Application works as intended.