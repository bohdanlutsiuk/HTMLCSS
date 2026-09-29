# Automatic audit with axe-core browser extension

## Results
Full page scan highlighted 25 total problems and rated them as follows:
- 1 critical
- 22 serious
- 2 moderate

It has also categorized them by issues:
- 18 elements do not meet color contrast ratio thresholds
- 1 html lang attribute missing
- 1 image does not have alt text
- 3 links do not have discernible text
- 1 case where heading levels increase by more than one
- 1 case where page content is not contained by landmark

As I've checked, problems do exist and should be fixed.

## Quick manual audit
 
However, tool for automatic audit did not find all the problems, which is to be expected.
After a manual check I've additionally located:
- 2 buttons which are div
- 6 links which miss descriptive anchor text or aria-label
- 3 inputs which do not have labels
- 3 buttons that are way too small and do not have enough spacing

## Summary
So, that concludes that automating audit is indeed helpful and should be used by developers but it doesn't make manual auditing any less necessary.