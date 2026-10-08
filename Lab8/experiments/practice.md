# Practice

## 5.1 Preparations 
The module loading was blocked by CORS policy which allows only http and https protocols. In an example of opening document as a file I used file protocol.

## 5.2 Rules of using AI-agents
AI-agent was used to make the assumptions and some other changes in protocol.md (file containing experiment protocol).
Agent: JetBrains Junie (Gemini 3 Flash)
Version: 3419.24.0
Date of use: 08/10/2026 

## 5.3 Challenge 1 — `normalizeShow`
This challenge was pretty simple. The only problem I had with it was dealing with `null` values.  
The quirks probably were dealing with `null` values and finding a way not to get any reference values on the way.

## 5.4 Challenge 2 — `filterShows` 
This challenge also wasn't too hard. Although I did have problems with copying arrays and validating query. That was probably due to little experience I had beforehand.  
The quirks were dealing with `null` values once again and comparing values.

## 5.5. Challenge 3 — `sortShows`
This part took quite a bit of time. I struggled with deviding strings from numbers and managing reference values. Also getting the direction right was problematic, but I figured it out in the end.  
The quirks were not changing input array, not changing any input reference values accidentally and working with `sort()`.

## 5.6. Challenge 4 — `genreStats`
There I took some time trying to understand how do `groupBy()` and `reduce()` work. I ended up not using them in the end. The `Record` also didn't have `map()` which disappointed me a little.  
The quirks were aggregating input data counting `0` but not `null` ones. I also got caught at `Math.round()` not understanding why can't I set how many values after the dot to leave in parameter.   

## 5.7. Challenge 5 — `createCounter`, `once`, `memoize`
This one does seem really simple at first, but it got me in the worst moment of the day when by brain doesn't really function right, so it was hard. I spent some time at `once()` trying to figure out why it returns `NaN`. It was fixed of `...args` in return function parameters.  
The quirks were getting count `variable` at `counter` to not be accessible from outside, not activating `fn()` second time at `once()` and getting `memoize()` to work with different types including `undefined`, `false`, `0`.

## Summary
Before that I knew that JavaScript was just different. But during the period of doing the research part I found out I didn't know anything. When doing the challenges I practiced the knowledge acquired and solved 5 tasks making sure the tests pass smoothly. I can surely say that I understood many JavaScript's specialties and will use them going forward. 