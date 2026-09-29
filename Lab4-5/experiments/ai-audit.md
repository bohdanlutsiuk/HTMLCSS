# AI-assisted accessibility audit

This audit evaluates the website against **WCAG 2.2** standards. The page was analyzed based on its HTML structure, CSS styling, and JavaScript behavior.

---

## 1. Automated Checkable Issues
These issues can typically be detected by tools like Lighthouse, Axe, or WAVE.

| Element | Problem | WCAG 2.2 Criterion | Check Method | Recommended Fix |
| :--- | :--- | :--- | :--- | :--- |
| `html` tag | Missing `lang` attribute. | [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Techniques/general/G103) (Level A) | Inspect `<html` tag; Automated audit (Axe/Lighthouse). | Add `lang="en"` (or appropriate language) to the `<html>` tag. |
| Hero Image (`.hero__image`) | Missing `alt` attribute entirely. | [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Techniques/general/G94) (Level A) | Check for `alt` attribute in `<img>` tag. | Add descriptive `alt` text (e.g., `alt="FlowTask dashboard interface"`) or `alt=""` if decorative. |
| Feature Icons (`.card__icon`) | Generic `alt="icon"` or empty `alt=""` for meaningful content. | [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Techniques/general/G94) (Level A) | Inspect `alt` values of icons. | Provide descriptive text if the icon adds meaning, or keep `alt=""` if the heading next to it covers the meaning. |
| Trial Form Inputs | Missing `<label>` elements; relies on `placeholder`. | [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Techniques/general/G131) (Level A) | Check for `<label>` tags linked via `for` attribute to inputs. | Add visible `<label>` elements for "Name", "Email", and "Company". |
| Sign-in Link | Uses `aria-label="Sign in"` on text that already says "Sign in". | [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA14) (Level A) | Inspect ARIA attributes. | Remove redundant `aria-label` as the link text is sufficient. |

---

## 2. Manual Verification Required Issues
These issues require human judgement, keyboard testing, or screen reader verification.

| Element | Problem | WCAG 2.2 Criterion | Check Method | Recommended Fix |
| :--- | :--- | :--- | :--- | :--- |
| Navigation Items (`.nav-item`) | Defined as `<div>` instead of `<a>` or `<button>`; not focusable. | [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Techniques/general/G21) (Level A) | Try to navigate the menu using the `Tab` key. | Use `<a>` or `<button>` elements. Ensure they are contained in a `<ul>` for proper list semantics. |
| Global Focus Style (`:focus`) | `outline: none;` applied globally without a custom focus indicator. | [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Techniques/general/G149) (Level AA) | Tab through the page and check if you can see which element is active. | Remove `outline: none;` or provide a high-contrast custom focus ring. |
| Section Headings | Incorrect heading hierarchy: `<h4>` used before `<h2>` in features section. | [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Techniques/general/G141) (Level A) | Inspect heading levels (h1-h6) sequence. | Use `<h2>` for "Why FlowTask?" to maintain logical structure. |
| Hero CTA & Trial Submit | Using `<div>` for buttons. | [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Techniques/general/G21) (Level A) | Verify if the "buttons" can be activated with the `Enter` key. | Replace `<div>` with `<button>` or `<a>`. |
| FAQ Accordion | `aria-expanded="true"` is hardcoded and doesn't change when clicked. | [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA16) (Level A) | Inspect accessibility tree state while interacting. | Update JavaScript to toggle `aria-expanded` between `true` and `false`. |
| Muted Text (`.muted`, `.soft`) | Colors like `#939ba7` and `#717985` on white may fail contrast. | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Techniques/general/G18) (Level AA) | Use a color contrast checker (e.g., WebAIM). | Darken the muted text colors to reach at least 4.5:1 ratio. |
| Signup Flow Delay | JavaScript includes a 300ms artificial blocking loop. | [2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Techniques/general/G198) (Level A) | Observe interaction responsiveness. | Remove the `while` loop delay in `js/main.js`. |
| Social Links | Empty links with `aria-hidden="true"` on SVGs; no text labels. | [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Techniques/general/G91) (Level A) | Check if screen reader announces the destination of social links. | Add `aria-label` to the `<a>` tag (e.g., `aria-label="Twitter"`) or hidden screen reader text. |
