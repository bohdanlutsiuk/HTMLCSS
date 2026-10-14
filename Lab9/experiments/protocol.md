# Experiment protocol

<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Що досліджено</th>
            <th>Мій аналіз</th>
            <th>Фактичний результат</th>
            <th>Пояснення</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Live і static колекції</td>
            <td>

```js
0
```

</td>
            <td>

```js
3
```

</td>
            <td><code>getElementsByClassName</code> повертає "живу" колекцію, тому зміни в класах елементів відразу відображаються в довжині колекції <code>items</code>. <code>querySelectorAll</code> повертає статичну колекцію.</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Рядок із HTML чотирма способами</td>
            <td>

```js
onerror: innerHTML
onerror: div
// on the page
textContent: <img src="x" onerror="console.log('onerror: textContent')">
innerHtml: //broken image icon
```

</td>
            <td>

```js
onerror: div
onerror: innerHTML
// on the page
textContent: <img src="x" onerror="console.log('onerror: textContent')">
innerHtml: //broken image icon
```

</td>
            <td>Черговість виклику <code>onerror</code> залежить від швидкості обробки браузером вставки HTML. В обох випадках <code>textContent</code> не виконує скрипти, а <code>innerHTML</code> — виконує.</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Значення з <code>dataset</code></td>
            <td>

```js
['82', 'string', false, true]
```

</td>
            <td>

```js
['82', 'string', false, true]
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>4</td>
            <td><code>innerHTML +=</code> і обробники</td>
            <td>

```js
клік
клік
```

</td>
            <td>

```js
клік
```

</td>
            <td>Використання <code>innerHTML +=</code> призводить до перепаршування всього вмісту контейнера, через що старі DOM-вузли видаляються (разом з обробниками подій) і створюються нові.</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Фази поширення події</td>
            <td>

```js
ul capture
li capture
button capture
button bubble
li bubble
ul bubble
```

</td>
            <td>

```js
ul capture
li capture
button capture
button bubble
li bubble
ul bubble
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>6</td>
            <td><code>target</code>, <code>currentTarget</code> і <code>this</code></td>
            <td>

```js
// click 1
function: path button button
arrow: path true false
closest: <button type="button">...</button>
// click 2
function: button button button
arrow: button true false
closest: <button type="button">...</button>
// click 3
closest: null
```

</td>
            <td>

```js
// click 1
function: path button button
arrow: path true true
closest: <button type="button">...</button>
// click 2
function: button button button
arrow: button true true
closest: <button type="button">...</button>
// click 3
closest: null
```

</td>
            <td>В стрілочних функціях <code>this</code> визначається контекстом оголошення (лексично), у цьому випадку — глобальним об'єктом <code>window</code>.</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Той самий обробник двічі</td>
            <td>

```js
3
```

</td>
            <td>

```js
3
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>8</td>
            <td><code>&lt;div&gt;</code> чи <code>&lt;button&gt;</code></td>
            <td>

```js
div: true
button: true
//div cannot be targeted with `tab`
div: false
button: false
```

</td>
            <td>

```js
div: true
button: true
//div cannot be targeted with `tab`
div: false
button: false
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>9</td>
            <td>Enter у формі</td>
            <td>

```js
click true
submit
```

</td>
            <td>

```js
click true
submit
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>10</td>
            <td><code>value</code> і <code>valueAsNumber</code></td>
            <td>

```js
[['71', 8], ['1', NaN]]
```

</td>
            <td>

```js
[['71', 8], ['1', NaN]]
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>11</td>
            <td><code>setCustomValidity</code></td>
            <td>

```js
[false, true, false, 'Не більше 10']
```

</td>
            <td>

```js
[false, true, false, 'Не більше 10']
```

</td>
            <td></td>
        </tr>   
        <tr>
            <td>12</td>
            <td>Подія <code>reset</code></td>
            <td>

```js
у reset: 'drama'
після reset(): ''
```

</td>
            <td>

```js
у reset: "drama"
після reset(): ""
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>13</td>
            <td>Видалення елемента з фокусом</td>
            <td>

```js
[true, body]
```

</td>
            <td>

```js
[true, body]
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>14</td>
            <td><code>focus()</code> і <code>tabindex</code></td>
            <td>

```js
[true, true]
```

</td>
            <td>

```js
[false, true]
```

</td>
            <td>Звичайний <code>&lt;div&gt;</code> не є фокусованим елементом за замовчуванням. Щоб він міг отримати фокус програмно через <code>focus()</code>, йому потрібно задати <code>tabindex</code>.</td>
        </tr>
        <tr>
            <td>15</td>
            <td>Модальний діалог і фокус</td>
            <td>

```js
після outside.focus(): Кнопка поза діалогом
після close(): Відкрити діалог
// after dialog.close(); focus will move to body 
```

</td>
            <td>

```js
після outside.focus(): Кнопка в діалозі
після close(): Відкрити діалог
// after dialog.close(); focus will move to body 
```

</td>
            <td>Метод <code>showModal()</code> активує режим захоплення фокусу (focus trap), який не дозволяє перемістити фокус на елементи поза діалогом, доки його не буде закрито.</td>
        </tr>
    </tbody>
</table>