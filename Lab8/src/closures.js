/**
 * @typedef {object} Counter
 * @property {() => number} increment збільшує значення на 1 і повертає нове
 * @property {() => number} reset повертає значення до початкового і повертає його
 * @property {() => number} value поточне значення
 */

/**
 * C5.1. Створює лічильник.
 * Специфікація — ТЗ, C5.
 *
 * @param {number} [start]
 * @returns {Counter}
 */
export function createCounter(start = 0) {
  let count = start;
  return {
    increment() {
      return ++count;
    },
    reset() {
      count = start;
      return count;
    },
    value() {
      return count;
    },
  };
}

/**
 * C5.2. Обгортає `fn` так, що вона виконується щонайбільше один раз.
 * Специфікація — ТЗ, C5.
 *
 * @template {(...args: any[]) => any} F
 * @param {F} fn
 * @returns {F}
 */
export function once(fn) {
  let isRun = false;
  let result;

  return (...args) => {
    if (!isRun) {
      result = fn(...args);
      isRun = true;
    }

    return result;
  };
}

/**
 * C5.3. Запам'ятовує результати `fn` для кожного значення її єдиного аргументу.
 * Специфікація — ТЗ, C5.
 *
 * @template T, R
 * @param {(arg: T) => R} fn
 * @returns {(arg: T) => R}
 */
export function memoize(fn) {
  const map = new Map();

  return (T) => {
    if (map.has(T)) {
      return map.get(T);
    }

    map.set(T, fn(T));
    return map.get(T);
  };
}
