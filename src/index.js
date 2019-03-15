/**
 * Copyright (C) 2019 The Trustees of Indiana University
 * SPDX-License-Identifier: BSD-3-Clause
 */

const whenCallbacks = new Set()
const mutationObserver = new window.MutationObserver(() => {
  whenCallbacks.forEach((callback) => callback())
})
mutationObserver.observe(document, {
  attributes: true,
  childList: true,
  subtree: true
})

export function whenAdded (selector, callback) {
  const addedElements = new Set()
  check()
  whenCallbacks.add(check)
  function check () {
    // `document.querySelectorAll` returns a NodeList, not an array.
    // It could be converted, but `Array.from` is not supported in IE,
    // a polyfill is too much, and a small utility to push items into
    // an array would only be used once. Since `Array.filter` is the
    // only operator needed, an `if` conditional will work fine instead.
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

// Alias
export const added = whenAdded
export const removed = whenRemoved
