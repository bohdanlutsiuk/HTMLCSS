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
            <td>fetch і статус 404</td>
            <td>

`Promise` не буде відхилений
```js
false 404
Object { ... } // valid response
```
В консолі також з'явиться помилка про те, що запит був невдалим. Додаток при цьому не зламається.

</td>
            <td>

`Promise` не був відхиленим
```js
false 404
Object { ... } // valid response 
```
В консолі з'явилась помилка, що показала невдалий запит, проте ніяких ознак "впавшого коду" немає.

</td>
            <td></td>
        </tr>
        <tr>
            <td>2</td>
            <td>Тіло відповіді читається один раз</td>
            <td>

```js
// name of the show
вдруге: TypeError
HTML: SyntaxError invalid JSON
```
Вдруге `response.json()` нічого не повертає, так як є `stream` і може бути прочитаний лише один раз.
HTML дасть помилку `SyntaxError` так як HTML не є валідним JSON.

</td>
            <td>

```js
Game of Thrones
вдруге: TypeError
HTML: SyntaxError JSON.parse: unexpected character at line 1 column 1 of the JSON data
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>3</td>
            <td><code>forEach</code>, <code>for…of</code> і <code>Promise.all</code></td>
            <td>

```js
forEach: 0
через 2 с: 3
// другий спосіб буде в 2-3 рази швидше  
```

</td>
            <td>

```js
forEach: 0
через 2 с: 3
for…of: 277 мс
Promise.all: 221 мс
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>4</td>
            <td><code>return</code> і <code>return await</code> у <code>try</code></td>
            <td>

```js
поза load: TypeError
```
Because fetch is not awaited, inner catch just cannot be triggered. 
Only the inner catch will run if you add `await` before `fetch`. 

</td>
            <td>

```js
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://api.tvmaze.invalid/shows/82. (Reason: CORS request did not succeed). Status code: (null). 
поза load: TypeError
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>5</td>
            <td><code>Promise.all</code> і <code>Promise.allSettled</code></td>
            <td>

```js
all: TypeError
allSettled: [ "fulfilled", "rejected", "fulfilled" ]
```
They were all rejected.

</td>
            <td>

```js
all: TypeError
allSettled: [ "fulfilled", "rejected", "fulfilled" ]
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>6</td>
            <td><code>AbortController</code></td>
            <td>

```js
до відповіді: AbortError
після відповіді: 200
json(): AbortError
```
It will show `Aborted`.

</td>
            <td>

```js
до відповіді: AbortError
після відповіді: 200
json(): AbortError
```
It was showing `Blocked`, close enough.

</td>
            <td></td>
        </tr>
        <tr>
            <td>7</td>
            <td>Заголовки відповіді</td>
            <td>

```js
application/json
public, max-age=60 //or any other value
2026-10-19
["content-type", "cache-control"]
```
JavaScript gets only safe-listed headers if none others are exposed by the server.  

</td>
            <td>

```js
application/json; charset=UTF-8
public, max-age=3600
null
[ "cache-control", "content-type" ]
```

</td>
            <td></td>
        </tr>
        <tr>
            <td>8</td>
            <td>HTTP-кеш</td>
            <td>

Only 1 and 3 request will go into the network. The second will be read from the cache. Size will be the same for each one but the transferred column will show 0 for cached requests. Cache duration and availability are defined by `cache-control` header. If experiment is repeated, first request will also be read from cache.

</td>
            <td>

Indeed, only 1 and 3 request was fetched from network and the second was read from cache. Size was the same for each one and transferred column has `cached` entries. When repeated, first request data was read from cache.  

</td>
            <td></td>
        </tr>
        <tr>
            <td>9</td>
            <td>Переадресація</td>
            <td>

```js
200 true "https://api.tvmaze.com/lookup/shows/1" // 1 here is internal tvmaze's show id
// actual show's name received from tvmaze's db
```
2 will appear. One would move return redirect, and the other will be a request of that redirect.

</td>
            <td>

```js
200 true https://api.tvmaze.com/shows/82
Game of Thrones
```
One was indeed a redirect (`301`) and the other has status `200 OK` which returned the shows data.

</td>
            <td></td>
        </tr>
        <tr>
            <td>10</td>
            <td>Рядок запиту</td>
            <td>

```js
Law [ "q", "Order"]
Law+%26+Order ?q=Law+%26+Order
```
There will be two parameters in the first URL.

</td>
            <td>

```js
Law [ "q", "Order"]
Law & Order ?q=Law+%26+Order
```
There indeed was two parameters in the url but second one was invalid.

</td>
            <td></td>
        </tr>
        <tr>
            <td>11</td>
            <td>Два домени TVmaze</td>
            <td>

```js
api: 200
www: 200
```
The request to `www.tvmaze.com` will be fetched successfully but the reading will be blocked by cors policy.

</td>
            <td>

```js
api: 200
www: TypeError NetworkError when attempting to fetch resource.
```
The request to `www.tvmaze.com` was indeed fetched but cors policy blocked the reading of the request. 

</td>
            <td></td>
        </tr>
        <tr>
            <td>12</td>
            <td>Preflight</td>
            <td>

```js
Content-Type: TypeError NetworkError when attempting to fetch resource
Accept: 200
```
For the first request, two requests would appear in network tab: `OPTIONS` and `GET`. The first request will fail because the `Content-Type` header is not safe-listed.

</td>
            <td>

```js
Content-Type: TypeError NetworkError when attempting to fetch resource
Accept: 200
```
Two requests appeared after making the first request in code. That request was blocked by cors policy.

</td>
            <td></td>
        </tr>
        <tr>
            <td>13</td>
            <td><code>mode: no-cors</code></td>
            <td>

```js
opaque 0 false
""
```
There will be no error because the request will be successful and `JSON.stringify()` allows null.

</td>
            <td>

```js
opaque 0 false
""
```
There was no error.

</td>
            <td></td>
        </tr>
</tbody>
</table>