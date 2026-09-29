# Audit

## Automatic audit with axe-core 

- 18 elements do not meet color contrast ratio thresholds
- 1 html lang attribute missing
- 1 image does not have alt text
- 3 links do not have discernible text
- 1 case where heading levels increase by more than one
- 1 case where page content is not contained by landmark

## Manual audit

- Page title doesn't fully describe the content of the page.
- Many div elements should be buttons or links. That's why many interactable elements are not accessible with keyboard.
- Focus is invisible on elements because of `outline: none;` applied globally.
- Images do not have alt text.
- Form inputs do not have labels.
- There are no form validation as well as errors. Only pink outline when email is absent which is barely visible.
- Social links at the bottom do not have any aria-text labels or text at all.
- No meta description present
- No open graph meta tags.
- Unspecified priceSpecification in schema.org
- Bad performance metrics because of reasons highlighted above.

## AI assisted audit

AI-agent used: JetBrains Junie v3123.7.0
Time and date: 29/09/2026 18:11

| Category | Problem | Evidence | Severity | Recommendation | Verification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| SEO | Page hidden from indexing | Meta tag `<meta name="robots" content="noindex">` in head | High | Remove the tag or change it to `index, follow` | Check page source code or Google Search Console |
| Accessibility | Non-semantic navigation elements | Menu items implemented via `div.nav-item` instead of `a` or `button` | Medium | Replace `div` with `a` links inside a `ul > li` list | Check focusability and keyboard navigation (Tab) |
| Accessibility | Missing labels for form fields | `input` tags in `trial__form` only have a `placeholder` | Medium | Add `label` tags for each field or use `aria-label` | Check with a Screen Reader if the field's purpose is announced |
| SEO | Missing meta description | `<meta name="description">` tag is missing | Medium | Add a meta tag with a short description (up to 160 characters) | Check for the tag presence in the `<head>` section |
| Performance | Hero image not optimized | `img.hero__image` tag lacks `width`, `height`, and `loading` attributes | Low | Add explicit dimensions and `fetchpriority="high"` for the LCP element | Check LCP metrics in Lighthouse |
| Performance | Modern image formats not used | Images are loaded in `.jpg` and `.png` formats | Low | Use WebP or Avif formats with a fallback | Check the Network tab in DevTools for WebP presence |
| Styles | Global focus outline suppression | Selector `:focus { outline: none; }` in `styles.css` (line 40) | High | Remove the rule or replace it with `:focus-visible` and a clear style | Check focus visibility when navigating with the Tab key |
| Styles | Magic numbers and hardcoded colors | Use of `#374151` (lines 142, 158) instead of CSS variables | Low | Move all colors to `:root` variables to ensure consistency | Check CSS file for HEX codes outside the `:root` block |
| Styles | Missing state styles for buttons | Missing `:active` and `:focus-visible` descriptions for `.btn` and `.button` classes | Medium | Add visual feedback (e.g., small offset or shadow change) for click states | Test interaction with buttons (click and hold) |
| Script | Main thread blocking (Busy-wait) | `while` loop in `startSignup` function (line 22) blocks UI for 300ms | High | Remove artificial delay; move heavy computations to a Web Worker or optimize | Check for UI freezes when clicking CTA buttons |
| Script | Direct style manipulation from JavaScript | `email.style.boxShadow = ...` in form handler (line 53) | Low | Use classes (e.g., `.is-invalid`) to change element appearance via CSS | Check if styling changes by adding a class in DevTools |
| Script | Use of legacy `var` syntax | Variable declarations via `var` throughout `main.js` | Low | Replace `var` with `const` and `let` for better scoping and safety | Perform code linting or check the code manually |

## AI accessibility report checks

### Page hidden from indexing
- Problem is showing
- Can be checked with devtools or Google Console url inspection
- Source: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- This suggestion will be implemented

### Non-semantic navigation elements
- Yes, it is there
- Can be checked with Lighthouse, axe-core or manually with a keyboard
- Source: https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html
- This suggestion will be implemented

### Missing meta description
- Yeah, seeing it
- Can be checked with Lighthouse, axe-core or manually with devtools
- Source: https://developers.google.com/search/docs/appearance/snippet
- This suggestion will be implemented

### Hero image not optimized
- Yeah, it does have problems
- Can be checked with page performance insights
- Source: https://web.dev/articles/lcp
- This suggestion will be implemented

### Use of legacy `var` syntax
- Yep, although it doesn't break the code, it should be changed to modern `let`
- Can be checked with ESLint or manual source code reading
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
- This suggestion will be implemented

## Denied suggestions

### Modern image formats not used
Does affect performance a little, but isn't breaking accessibility or doing any other evil 

