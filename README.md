# Set methods polyfill

A polyfill for [the ECMAScript proposal “Set Methods for JavaScript”](https://github.com/tc39/proposal-set-methods) ([documentation for this proposal](https://2ality.com/2022/12/set-methods.html)).

## Warning

**Don’t trust this code:**

* It’s mostly untested.

Caveats:

* The focus is on simple code, not on spec compliance.

Functionality:

* This polyfill implements all methods specified in the proposal.
* This polyfill deliberately does not provide any additional functionality.

## Installation

```js
npm install @rauschma/set-methods-polyfill
```

## Examples

### Polyfill

```js
import '@rauschma/set-methods-polyfill/install';
import assert from 'node:assert/strict';

assert.deepEqual(
  new Set(['a', 'b', 'c']).union(new Set(['c', 'd'])),
  new Set(['a', 'b', 'c', 'd'])
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).intersection(new Set(['c', 'd'])),
  new Set(['c'])
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).difference(new Set(['c', 'd'])),
  new Set(['a', 'b'])
);

assert.deepEqual(
  new Set(['a', 'b', 'c']).isSubsetOf(new Set(['a'])),
  false
);
assert.deepEqual(
  new Set(['a', 'b', 'c']).isSupersetOf(new Set(['a'])),
  true
);
```

### Library (doesn’t change JavaScript’s globals)

```js
import {union, intersection, difference, isSubsetOf, isSupersetOf} from '@rauschma/set-methods-polyfill';
import assert from 'node:assert/strict';

assert.deepEqual(
  union(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
  new Set(['a', 'b', 'c', 'd'])
);
assert.deepEqual(
  intersection(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
  new Set(['c'])
);
assert.deepEqual(
  difference(new Set(['a', 'b', 'c']), new Set(['c', 'd'])),
  new Set(['a', 'b'])
);

assert.deepEqual(
  isSubsetOf(new Set(['a', 'b', 'c']), new Set(['a'])),
  false
);
assert.deepEqual(
  isSupersetOf(new Set(['a', 'b', 'c']), new Set(['a'])),
  true
);
```

### More examples

* [`src/api_test.ts`](https://github.com/rauschma/set-methods-polyfill/blob/main/src/api_test.ts)

## Material on iterator helpers

* ECMAScript proposal “Set Methods for JavaScript”: https://github.com/tc39/proposal-set-methods
* Blog post: https://2ality.com/2022/12/set-methods.html
