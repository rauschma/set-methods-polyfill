import * as assert from 'node:assert/strict';
import test from 'node:test';
import './install.js';
import { intersection, difference, symmetricDifference, isSubsetOf, isSupersetOf, isDisjointFrom, union } from './library.js';

// The API often checks which of the two operands have the larger size.
// Therefore – test both:
// - (larger Set, smaller Set) and
// - (smaller Set, larger Set)

//========== Polyfill ==========

test('Polyfill: union', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).union(new Set(['c', 'd'])),
    new Set(['a', 'b', 'c', 'd'])
  );
  assert.deepEqual(
    new Set(['c', 'd']).union(new Set(['a', 'b', 'c'])),
    new Set(['a', 'b', 'c', 'd'])
  );

  assert.deepEqual(
    new Set(['a', 'b', 'c']).union(new Set([])),
    new Set(['a', 'b', 'c'])
  );
  assert.deepEqual(
    new Set([]).union(new Set(['a', 'b', 'c'])),
    new Set(['a', 'b', 'c'])
  );
});

test('Polyfill: intersection', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).intersection(new Set(['c', 'd'])),
    new Set(['c'])
  );
  assert.deepEqual(
    new Set(['c', 'd']).intersection(new Set(['a', 'b', 'c'])),
    new Set(['c'])
  );

  assert.deepEqual(
    new Set(['a', 'b']).intersection(new Set(['c', 'd'])),
    new Set([])
  );
  assert.deepEqual(
    new Set(['c', 'd']).intersection(new Set(['a', 'b'])),
    new Set([])
  );
});

test('Polyfill: difference', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).difference(new Set(['c', 'd'])),
    new Set(['a', 'b'])
  );
  assert.deepEqual(
    new Set(['c', 'd']).difference(new Set(['a', 'b', 'c'])),
    new Set(['d'])
  );

  assert.deepEqual(
    new Set(['a', 'b', 'c']).difference(new Set([])),
    new Set(['a', 'b', 'c'])
  );
  assert.deepEqual(
    new Set([]).difference(new Set(['a', 'b', 'c'])),
    new Set([])
  );
});

test('Polyfill: symmetricDifference', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).symmetricDifference(new Set(['c', 'd'])),
    new Set(['a', 'b', 'd'])
  );
  assert.deepEqual(
    new Set(['c', 'd']).symmetricDifference(new Set(['a', 'b', 'c'])),
    new Set(['a', 'b', 'd'])
  );

  assert.deepEqual(
    new Set(['a', 'b']).symmetricDifference(new Set(['c', 'd'])),
    new Set(['a', 'b', 'c', 'd'])
  );
  assert.deepEqual(
    new Set(['c', 'd']).symmetricDifference(new Set(['a', 'b'])),
    new Set(['a', 'b', 'c', 'd'])
  );
});

test('Polyfill: isSubsetOf', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).isSubsetOf(new Set(['c', 'd'])),
    false
  );
  assert.deepEqual(
    new Set(['c', 'd']).isSubsetOf(new Set(['a', 'b', 'c'])),
    false
  );
  assert.deepEqual(
    new Set(['a', 'b', 'c']).isSubsetOf(new Set(['a'])),
    false
  );
  assert.deepEqual(
    new Set(['a']).isSubsetOf(new Set(['a', 'b', 'c'])),
    true
  );
});

test('Polyfill: isSupersetOf', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).isSupersetOf(new Set(['c', 'd'])),
    false
  );
  assert.deepEqual(
    new Set(['c', 'd']).isSupersetOf(new Set(['a', 'b', 'c'])),
    false
  );
  assert.deepEqual(
    new Set(['a', 'b', 'c']).isSupersetOf(new Set(['a'])),
    true
  );
  assert.deepEqual(
    new Set(['a']).isSupersetOf(new Set(['a', 'b', 'c'])),
    false
  );
});

test('Polyfill: isDisjointFrom', (t) => {
  assert.deepEqual(
    new Set(['a', 'b', 'c']).isDisjointFrom(new Set(['c', 'd'])),
    false
  );
  assert.deepEqual(
    new Set(['c', 'd']).isDisjointFrom(new Set(['a', 'b', 'c'])),
    false
  );
  assert.deepEqual(
    new Set(['a', 'b', 'c']).isDisjointFrom(new Set(['x'])),
    true
  );
  assert.deepEqual(
    new Set(['x']).isDisjointFrom(new Set(['a', 'b', 'c'])),
    true
  );
});

test('Polyfill: Infinity', (t) => {
  const evenNumbers = {
    has(elem: number) {
      return (elem % 2) === 0;
    },
    size: Infinity,
    keys() {
      throw new TypeError();
    }
  };
  assert.deepEqual(
    new Set([0, 1, 2, 3]).difference(evenNumbers),
    new Set([1, 3])
  );
  assert.deepEqual(
    new Set([0, 1, 2, 3]).intersection(evenNumbers),
    new Set([0, 2])
  );
});

//========== Library ==========

test('Library: union', (t) => {
  assert.deepEqual(
    union(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    new Set(['a', 'b', 'c', 'd'])
  );
  assert.deepEqual(
    union(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    new Set(['a', 'b', 'c', 'd'])
  );

  assert.deepEqual(
    union(new Set(['a', 'b', 'c']), new Set([])),
    new Set(['a', 'b', 'c'])
  );
  assert.deepEqual(
    union(new Set([]), new Set(['a', 'b', 'c'])),
    new Set(['a', 'b', 'c'])
  );
});

test('Library: intersection', (t) => {
  assert.deepEqual(
    intersection(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    new Set(['c'])
  );
  assert.deepEqual(
    intersection(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    new Set(['c'])
  );

  assert.deepEqual(
    intersection(new Set(['a', 'b']), new Set(['c', 'd'])),
    new Set([])
  );
  assert.deepEqual(
    intersection(new Set(['c', 'd']), new Set(['a', 'b'])),
    new Set([])
  );
});

test('Library: difference', (t) => {
  assert.deepEqual(
    difference(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    new Set(['a', 'b'])
  );
  assert.deepEqual(
    difference(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    new Set(['d'])
  );

  assert.deepEqual(
    difference(new Set(['a', 'b', 'c']), new Set([])),
    new Set(['a', 'b', 'c'])
  );
  assert.deepEqual(
    difference(new Set([]), new Set(['a', 'b', 'c'])),
    new Set([])
  );
});

test('Library: symmetricDifference', (t) => {
  assert.deepEqual(
    symmetricDifference(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    new Set(['a', 'b', 'd'])
  );
  assert.deepEqual(
    symmetricDifference(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    new Set(['a', 'b', 'd'])
  );

  assert.deepEqual(
    symmetricDifference(new Set(['a', 'b']), new Set(['c', 'd'])),
    new Set(['a', 'c', 'b', 'd'])
  );
  assert.deepEqual(
    symmetricDifference(new Set(['c', 'd']), new Set(['a', 'b'])),
    new Set(['a', 'c', 'b', 'd'])
  );
});

test('Library: isSubsetOf', (t) => {
  assert.deepEqual(
    isSubsetOf(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    false
  );
  assert.deepEqual(
    isSubsetOf(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    false
  );
  assert.deepEqual(
    isSubsetOf(new Set(['a', 'b', 'c']), new Set(['a'])),
    false
  );
  assert.deepEqual(
    isSubsetOf(new Set(['a']), new Set(['a', 'b', 'c'])),
    true
  );
});

test('Library: isSupersetOf', (t) => {
  assert.deepEqual(
    isSupersetOf(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    false
  );
  assert.deepEqual(
    isSupersetOf(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    false
  );
  assert.deepEqual(
    isSupersetOf(new Set(['a', 'b', 'c']), new Set(['a'])),
    true
  );
  assert.deepEqual(
    isSupersetOf(new Set(['a']), new Set(['a', 'b', 'c'])),
    false
  );
});

test('Library: isDisjointFrom', (t) => {
  assert.deepEqual(
    isDisjointFrom(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
    false
  );
  assert.deepEqual(
    isDisjointFrom(new Set(['c', 'd']), new Set(['a', 'b', 'c'])),
    false
  );
  assert.deepEqual(
    isDisjointFrom(new Set(['a', 'b', 'c']), new Set(['x'])),
    true
  );
  assert.deepEqual(
    isDisjointFrom(new Set(['x']), new Set(['a', 'b', 'c'])),
    true
  );
});

test('Library: Infinity', (t) => {
  const evenNumbers = {
    has(elem: number) {
      return (elem % 2) === 0;
    },
    size: Infinity,
    keys() {
      throw new TypeError();
    }
  };
  assert.deepEqual(
    difference(new Set([0, 1, 2, 3]), evenNumbers),
    new Set([1, 3])
  );
  assert.deepEqual(
    intersection(new Set([0, 1, 2, 3]), evenNumbers),
    new Set([0, 2])
  );
});
