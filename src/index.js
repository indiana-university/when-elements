/**
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

//
// `whenAdded()` and `whenRemoved()`
//
// Behavior:
// 1. Add when element exists in the DOM before define() and the element matches selector.
// 2. Add when element is added to the DOM and matches selector.
// 3. Add when element attributes change to match selector.
// 4. Remove when element is removed from the DOM.
// 5. Remove when element no longer matches selector.
// 6. Does not protect against duplicate selector definitions.
//
// `regularElements.define()` only does 1, 2, and 4.
// Its `onconnect` behavior may call more than once per element.
// Use `wickedElements.define()` with `init` to guarantee one call per element.
//
// Note:
// 1. The use of Set and Array.from() may require polyfills to support IE11.
// 2. Maybe this could be rewritten to support IE11 without polyfills?
// 3. MutationObserver is already supported by IE11.
// 4. This could expand to support other features inspired by the custom elements spec.
//    https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry
// 5. A third `options` argument could allow for changes in the default behavior.
// 6. `define()` could return an object of methods:
//    `stop()`: Stop watching for matches. Call the remove callback for any initialized elements.
//    `start()`: Start watching for matches. Useful after a `stop()` call.
//    `get()`: Get an array of initialized elements.
const whenCallbacks = new Set()
const mutationObserver = new window.MutationObserver(() => {
  whenCallbacks.forEach((callback) => callback())
})
mutationObserver.observe(document, { attributes: true, childList: true, subtree: true })

// Backlog:
// 1. Return a method to cancel `whenAdded()`.
// 2. An optional `options` argument could allow for changes in the default behavior.
// 3. Option: Cancel after first match.
// 4. Option: Cancel after N matches.
export function whenAdded (selector, callback) {
  const addedElements = new Set()
  check()
  whenCallbacks.add(check)
  function check () {
    // `document.querySelectorAll` returns a NodeList, not an array.
    // It could be converted, but `Array.from` is not supported in IE,
    // a polyfill is too much, and a small utility to push items into
    // an array would only be used once. Since `Array.filter` is the
    // only operator needed, an `if` conditional will work fine.
    document.querySelectorAll(selector)
      .forEach((element) => {
        if (addedElements.has(element)) {
          return
        }
        addedElements.add(element)
        const returnValue = callback(element)
        const removedCallback = typeof returnValue === 'function'
          ? returnValue
          : () => {}
        whenRemoved(selector, element, () => {
          addedElements.delete(element)
          removedCallback()
        })
      })
  }
}

export const added = whenAdded

// Backlog:
// 1. Make selector optional and target required.
// 2. Make target optional and selector required.
// 3. Return a function to cancel `whenRemoved()`.
export function whenRemoved (selector, target, callback) {
  check()
  whenCallbacks.add(check)
  function check () {
    if (target && document.contains(target) && target.matches(selector)) {
      return
    }
    whenCallbacks.delete(check)
    callback()
  }
}

export const removed = whenRemoved
