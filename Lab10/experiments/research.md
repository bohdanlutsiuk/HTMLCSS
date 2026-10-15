# Research 

## 4.1 Console and error types

### ReferenceError
To trigger this error I run this code in the browser console.
```js
Math.cos(undefinedValue);
```
This error did contain a Stack Trace.

### TypeError
To trigger this error I run this code in the browser console.
```js
console.define();
```
This error also included Stack Trace.

### SyntaxError
To trigger this error I run this code in the browser console.
```js
let name =;
```
This error did not have a Stack Trace. That is because this error is triggered before execution takes place.

### Rejected Promise
To trigger this error I run this code in the browser console.
```js
Promise.reject(new Error('test'));
```
This error did include Stack Trace.

### SyntaxError but during execution
To trigger this error I run this code in the browser console.
```js
JSON.parse('{');
```
This error now did have a Stack Trace. That is because the error is called with throw. Function syntax is correct after all. 

### Why is the first error most important
Because all the later ones can simply be a consequence of the first one. And thus fixing that error automatically prevents other from throwing in most cases.

## 4.2. Stack Trace і панель Sources
After executing a() -> b() -> c() chain inside setTimeout() in browser console. I received that stack trace:
```text
Uncaught TypeError: can't access property "profile", user is undefined
    ...
    c debugger eval code:2
    b debugger eval code:2
    a debugger eval code:2
    execute debugger eval code:3
    (Async: setTimeout handler)
    execute debugger eval code:2
    <anonymous> debugger eval code:1
```
Asynchronous part here begins with `(Async: setTimeout handler)` and follows upwards.
After executing the same `execute()` function with flagged "Pause on uncaught exceptions" it pointed me to the exact spot where error had occurred. It was presented inside the whole c() function body. 



## 4.3 DOM у DevTools
I've checked event listeners using both methods and they shown the same result.

## 4.4 Event Loop
My guess is `1 5 7 3 4 6 2`.  
It matched, the output was:
```js
1
5
7
3
4
6
2
```
