# Протокол експерименту

<table>
<thead>
<tr>
<th>#</th>
<th>Код</th>
<th>Мій прогноз</th>
<th>Прогноз AI</th>
<th>Фактичний результат</th>
<th>Пояснення</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>

```js
'5' + 1
```

</td>
<td>

```js
'51'
```

</td>
<td>

```js
'51'
```

</td>
<td>

```js
'51'
```

</td>
<td></td>
<td></td>
</tr>
<tr>
<td>2</td>
<td>

```js
0.1 + 0.2 === 0.3
```

</td>
<td>

```js
false
```

</td>
<td>

```js
false
```

</td>
<td>

```js
false
```

</td>
<td></td>
<td></td>
</tr>
<tr>
      <td>3</td>
      <td>

```js
[NaN === NaN, Number.isNaN(NaN), isNaN('abc'), Number.isNaN('abc')]
```

</td>
      <td>

```js
[false, true, false, false]
```

</td>
<td>

```js
[false, true, true, false]
```

</td>
<td>

```js
[false, true, true, false]
```

</td>
<td>
Я прогнозував що 3 елемент буде `false`, проте `isNaN()` оцінює рядки як `NaN`.
</td>
</tr>
<tr>
      <td>4</td>
      <td>

```js
[0 || 'немає', 0 ?? 'немає']
```

</td>
      <td>

```js
['немає', 0]
```

</td>
<td>

```js
['немає', 0]
```

</td>
<td>

```js
['немає', 0]
```

</td>
<td></td>
</tr>
    <tr>
      <td>5</td>
      <td>

```js
[null == undefined, null == 0, null >= 0]
```

</td>
      <td>

```js
[true, false, false]
```

</td>
<td>

```js
[true, false, true]
```

</td>
<td>

```js
[true, false, true]
```

</td>
<td>
Я прогнозував, що 3 елемент буде `false`, проте, очевидно, при порівнянні `>=` `null` перетворюється на `0`.
</td>
</tr>
    <tr>
      <td>6</td>
      <td>

```js
[10, 9, 1].sort()
```

</td>
      <td>

```js
[1, 9, 10]
```

</td>
<td>

```js
[1, 10, 9]
```

</td>
<td>

```js
[1, 10, 9]
```

</td>
<td>
Я подумав, що функція сортування поверне масив відсортований за `number`, проте, за природою JS, масиви з `number` зазвичай сортуються як рядки.
</td>
</tr>
    <tr>
      <td>7</td>
      <td>

```js
console.log(early);
var early = 1;
{
  console.log(late);
  let late = 1;
}
```

</td>
      <td>

```js
undefined
ReferenceError
```

</td>
<td>

```js
undefined
ReferenceError
```

</td>
<td>

```js
undefined
ReferenceError
```

</td>
<td></td>
</tr>
    <tr>
      <td>8</td>
      <td>

```js
const viaVar = [];
for (var i = 0; i < 3; i++) viaVar.push(() => i);
const viaLet = [];
for (let j = 0; j < 3; j++) viaLet.push(() => j);
[viaVar.map((f) => f()), viaLet.map((f) => f())];
```

</td>
      <td>

```js
[[3, 3, 3], [0, 1, 2]]
```

</td>
<td>

```js
[[3, 3, 3], [0, 1, 2]]
```

</td>
<td>

```js
[[3, 3, 3], [0, 1, 2]]
```

</td>
<td></td>
</tr>
    <tr>
      <td>9</td>
      <td>

```js
const config = { theme: 'light' };
config.theme = 'dark';
config;
config = {};
```

</td>
      <td>

```js
{ theme: 'dark'}
TypeError
```

</td>
<td>

```js
{ theme: 'dark' }
TypeError
```

</td>
<td>

```js
{ theme: 'dark' }
TypeError
```

</td>
<td></td>
</tr>
    <tr>
      <td>10</td>
      <td>

```js
const user = { name: 'Ann', address: { city: 'Kyiv' } };
const copy = { ...user };
copy.name = 'Bob';
copy.address.city = 'Lviv';
[user.name, user.address.city];
```

</td>
      <td>

```js
['Ann', 'Lviv']
```

</td>
<td>

```js
['Ann', 'Lviv']
```

</td>
<td>

```js
['Ann', 'Lviv']
```

</td>
<td></td>
</tr>
    <tr>
      <td>11</td>
      <td>

```js
const defaults = Object.freeze({ theme: 'light', limits: { perPage: 20 } });
defaults.theme = 'dark';
defaults.limits.perPage = 100;
defaults;
```

</td>
      <td>

```js
{
  theme: 'light',
  limits: { perPage: 100 }
}
```

</td>
<td>

```js
{
  theme: 'light',
  limits: { perPage: 100 }
}
```

</td>
<td>

```js
{
  theme: 'light',
  limits: { perPage: 100 }
}
```

</td>
<td></td>
</tr>
    <tr>
      <td>12</td>
      <td>

```js
const ratings = [8.2, 9.1, 7.5];
const sorted = ratings.sort();
[sorted === ratings, ratings];

const scores = [8.2, 9.1, 7.5];
const ranked = scores.toSorted();
[ranked === scores, scores];
```

</td>
      <td>

```js
[true, [7.5, 8.2, 9.1]]
[false, [8.2, 9.1, 7.5]]
```

</td>
<td>

```js
[true, [7.5, 8.2, 9.1]]
[false, [8.2, 9.1, 7.5]]
```

</td>
<td>

```js
[true, [7.5, 8.2, 9.1]]
[false, [8.2, 9.1, 7.5]]
```

</td>
<td></td>
</tr>
    <tr>
      <td>13</td>
      <td>

```js
function greet(name = 'гість') { return name; }
[greet(), greet(undefined), greet(null)];
```

</td>
      <td>

```js
['гість', 'гість', null]
```

</td>
<td>

```js
['гість', 'гість', null]
```

</td>
<td>

```js
['гість', 'гість', null]
```

</td>
<td></td>
</tr>
    <tr>
      <td>14</td>
      <td>

```js
console.log(declared());
console.log(arrow());
function declared() { return 'declaration'; }
const arrow = () => 'arrow';
```

</td>
      <td>

```js
declaration
ReferenceError
```

</td>
<td>

```js
declaration
ReferenceError
```

</td>
<td>

```js
declaration
ReferenceError
```

</td>
<td></td>
</tr>
    <tr>
      <td>15</td>
      <td>

```js
// main.js
var fromModule = 'module';
console.log('this:', this);
// browser console
var fromConsole = 'console';
[window.fromModule, window.fromConsole];
```

</td>
      <td>

```js
['module', 'console']
```

</td>
<td>

```js
[undefined, 'console']
```

</td>
<td>

```js
[undefined, 'console']
```

</td>
<td>
    Я припустив, що зміна `fromModule` буде доступна з консолі бразуера, проте змінні `var` у модулях не стають властивостями `window`.
</td>
</tr>
  </tbody>
</table>