import { _union, _intersection, _difference, _symmetricDifference, _isSubsetOf, _isSupersetOf, _isDisjointFrom } from "./library.js";

//========== Types ==========

declare global {

  interface Set<T> {
    union: typeof _union;
    intersection: typeof _intersection;
    difference: typeof _difference;
    symmetricDifference: typeof _symmetricDifference;
    isSubsetOf: typeof _isSubsetOf;
    isSupersetOf: typeof _isSupersetOf;
    isDisjointFrom: typeof _isDisjointFrom;
  }

} // declare global

//========== Polyfill ==========

function installPolyfill() {
  const funcs = [
    _union,
    _intersection,
    _difference,
    _symmetricDifference,
    _isSubsetOf,
    _isSupersetOf,
    _isDisjointFrom,
  ];
  for (const func of funcs) {
    Object.defineProperty(
      Set.prototype, func.name.slice(1), // remove prefixed underscore
      {
        value: func,
        writable: true,
        enumerable: false,
        configurable: true
      }
    );
  }
}

installPolyfill();