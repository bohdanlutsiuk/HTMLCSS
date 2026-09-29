# Audit Changes

| Category | Problem | Changes Made | Verification |
| :--- | :--- | :--- | :--- |
| SEO | HTML lang attribute missing | Added `lang="en"` to the `<html>` tag in `index.html`. | Checked `index.html` source code. |
| SEO | Page title doesn't fully describe content | Updated `<title>` to "FlowTask — Project Management for Teams that Ship Every Week". | Verified title in `<head>`. |
| SEO | Missing meta description | Added `<meta name="description">` tag. | Verified tag in `<head>`. |
| SEO | No open graph meta tags | Added `og:title`, `og:description`, `og:image`, and `og:type` tags. | Verified tags in `<head>`. |
| Accessibility | Image missing alt text | Added descriptive `alt` text to the hero image and updated testimonial avatars. | Checked all `<img>` tags for `alt` attributes. |
| Accessibility | Links without discernible text | Added `aria-label` to social media links and "Sign in" link. | Verified `aria-label` presence. |
| Accessibility | Non-semantic navigation | Replaced `div.nav-item` with `<a>` tags inside a `<ul>` list. | Checked navigation structure and Tab focus. |
| Accessibility | Landmark issues | Ensured all content is contained within `<header>`, `<main>`, and `<footer>`. | Checked HTML structure. |
| Accessibility | Heading levels increase by more than one | Changed `<h4>` to `<h2>` in the features section to maintain proper hierarchy. | Verified heading sequence. |
| Accessibility | Focus is invisible | Removed `outline: none` and added visible `:focus-visible` styles in `css/styles.css`. | Verified focus visibility with Tab key. |
| Accessibility | Form inputs missing labels | Added `<label>` tags with `.sr-only` class for each form input. | Verified labels are present but visually hidden. |
| Accessibility | Poor form validation visibility | Implemented real-time validation in `js/main.js` and added an `.error-message` container. | Tested form submission without email. |
| Performance | Hero image not optimized | Added `width` and `height` attributes to the hero image to prevent layout shifts. | Verified `<img>` attributes. |
| Performance | Busy-wait script blocking | Removed artificial 300ms delay loop from `startSignup` function in `js/main.js`. | Checked `js/main.js` source code. |
| Code Quality | Use of legacy `var` syntax | Replaced all `var` declarations with `const` and `let` in `js/main.js`. | Checked `js/main.js` source code. |
| Code Quality | Magic numbers and hardcoded colors | Replaced hardcoded `#374151` with `var(--ink-soft)` variable in `css/styles.css`. | Checked `css/styles.css` for HEX codes. |
| Code Quality | Script style manipulation | Replaced direct `style.boxShadow` manipulation with `.is-invalid` class toggle. | Verified `js/main.js` and `css/styles.css`. |
| Schema.org | Unspecified priceSpecification | Added `priceSpecification` object to the JSON-LD structured data. | Verified JSON-LD content in `index.html`. |
| Design | Missing state styles for buttons | Added `:active` state with `translateY(1px)` and transitions for better feedback. | Tested button interaction. |
| Performance | Hero image not optimized (AI) | Added `fetchpriority="high"` and `loading="eager"` to the LCP hero image in `index.html`. | Verified `<img>` attributes. |
| Design | Enhanced button state styles (AI) | Added specific `:focus-visible` styles with increased offset and shadow, and `:active` brightness filter. | Tested button focus and click. |
| Code Quality | Hardcoded colors in SVG (AI) | Replaced hardcoded `#374151` with `currentColor` in footer social icons. | Verified SVG source code. |
| SEO (about) | HTML lang attribute missing | Added `lang="en"` to the `<html>` tag in `about.html`. | Checked `about.html` source code. |
| SEO (about) | Missing meta description and OG tags | Added `<meta name="description">` and Open Graph tags to `about.html`. | Verified tags in `<head>`. |
| Accessibility (about) | Non-semantic navigation | Replaced `div.nav-item` with semantic `ul > li > a` structure in `about.html`. | Checked navigation structure and Tab focus. |
| Layout (about) | Broken navigation styling | Restructured `nav` in `about.html` to match `index.html` (using `nav__list`), restoring intended CSS layout. | Verified visual appearance in browser. |
