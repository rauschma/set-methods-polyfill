interface SetReadOperations<T> {
  size: number;
  has(key: T): boolean;
  keys(): IterableIterator<T>;
}

export function _union<T>(this: Set<T>, other: SetReadOperations<T>): Set<T> {
  CheckSetRecord(other);
  const result = new Set<T>(this);
  for (const elem of other.keys()) {
    result.add(elem);
  }
  return result;
}

export function _intersection<T>(this: Set<T>, other: SetReadOperations<T>): Set<T> {
  CheckSetRecord(other);
  let smallerElems;
  let largerHas;
  if (this.size <= other.size) {
    smallerElems = this;
    largerHas = other;
  } else {
    smallerElems = other.keys();
    largerHas = this;
  }
  const result = new Set<T>();
  for (const elem of smallerElems) {
    if (largerHas.has(elem)) {
      result.add(elem);
    }
  }
  return result;
}

/* this − other */
export function _difference<T>(this: Set<T>, other: SetReadOperations<T>): Set<T> {
  CheckSetRecord(other);
  const result = new Set<T>(this);
  if (this.size <= other.size) {
    for (const elem of this) {
      if (other.has(elem)) {
        result.delete(elem);
      }
    }
  } else {
    for (const elem of other.keys()) {
      if (result.has(elem)) {
        result.delete(elem);
      }
    }
  }
  return result;
}

/**
 * - this − other ∪ other − this
 * - xor
 * - the union minus the intersection
 * - all elements that don’t exist in both Sets
 */
export function _symmetricDifference<T>(this: Set<T>, other: SetReadOperations<T>): Set<T> {
  CheckSetRecord(other);
  const result = new Set<T>(this);
  for (const elem of other.keys()) {
    if (this.has(elem)) {
      // Delete elements of `this` that also exist in `other`
      result.delete(elem);
    } else {
      // Add elements of `other` that don’t exist in `this`
      result.add(elem);
    }
  }
  return result;
}

export function _isSubsetOf<T>(this: Set<T>, other: SetReadOperations<T>): boolean {
  CheckSetRecord(other);
  for (const elem of this) {
    if (!other.has(elem)) return false;
  }
  return true;
}

export function _isSupersetOf<T>(this: Set<T>, other: SetReadOperations<T>): boolean {
  CheckSetRecord(other);
  for (const elem of other.keys()) {
    if (!this.has(elem)) return false;
  }
  return true;
}

export function _isDisjointFrom<T>(this: Set<T>, other: SetReadOperations<T>): boolean {
  CheckSetRecord(other);
  if (this.size <= other.size) {
    for (const elem of this) {
      if (other.has(elem)) return false;
    }
  } else {
    for (const elem of other.keys()) {
      if (this.has(elem)) return false;
    }
  }
  return true;
}

/**
 * A simpler version of GetSetRecord that only performs checks.
 */
function CheckSetRecord<T>(obj: SetReadOperations<T>): void {
  if (!isObject(obj)) {
    throw new TypeError();
  }
  const rawSize = obj.size;
  const numSize = Number(rawSize);
    // NaN if rawSize is `undefined`
  if (Number.isNaN(numSize)) {
    throw new TypeError();
  }
  // const intSize = ToIntegerOrInfinity(numSize);
  const has = obj.has;
  if (typeof has !== 'function') {
    throw new TypeError();
  }
  const keys = obj.keys;
  if (typeof keys !== 'function') {
    throw new TypeError();
  }
  // return {Set: obj, Size: intSize, Has: has, Keys: keys};
}

function isObject(value: unknown) {
  if (value === null) return false;
  const t = typeof value;
  return t === 'object' || t === 'function';
}

export const union = uncurryThisForSetResult(_union);
export const intersection = uncurryThisForSetResult(_intersection);
export const difference = uncurryThisForSetResult(_difference);
export const symmetricDifference = uncurryThisForSetResult(_symmetricDifference);

export const isSubsetOf = uncurryThisForNonSetResult(_isSubsetOf);
export const isSupersetOf = uncurryThisForNonSetResult(_isSupersetOf);
export const isDisjointFrom = uncurryThisForNonSetResult(_isDisjointFrom);

function uncurryThisForSetResult<T>(func: (this: Set<T>, other: SetReadOperations<T>) => Set<T>): <X>(arg: Set<X>, other: SetReadOperations<X>) => Set<X> {
  return Function.prototype.call.bind(func as any) as any;
}
function uncurryThisForNonSetResult<Func, T>(func: Func): Func extends (this: Set<T>, other: SetReadOperations<T>) => infer Result ? <X>(arg: Set<X>, other: SetReadOperations<X>) => Result : never {
  return Function.prototype.call.bind(func as any) as any;
}

// function uncurryThis<F>(func: F): F extends (this: infer This, ...args: infer Args) => infer Result ? (arg: This, ...restArgs: Args) => Result : never {
//   return Function.prototype.call.bind(func as any) as any;
// }