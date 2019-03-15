# WhenElements

Callbacks for when elements are added or removed from the DOM.

- No polyfills needed.
- Works down to IE11 (cerca 2013).
- Lightweight (~0.8kb min, ~0.5kb min+gzip).
- Register start up and shut down callbacks for elements, based on CSS selectors.
- Define multiple behaviors (different callbacks) for the same element.
- Browser dependencies: [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## Install and import

Use WhenElements however you'd like.

1. Global `WhenElements`, via CDN.

```html
<script src="https://unpkg.com/when-elements"></script>
```

```js
const { whenAdded, whenRemoved } = WhenElements
```

2. ESM, via CDN.

```js
import { whenAdded, whenRemoved } from 'https://unpkg.com/when-elements?module'
```

3. ESM bundler.

```
npm install when-elements
```

```js
import { whenAdded, whenRemoved } from 'when-elements'
```

4. CJS module.

```
npm install when-elements
```

```js
const { whenAdded, whenRemoved } = require('when-elements')
```

## API

### whenAdded

Call a function when any new or existing DOM elements match the CSS selector. It will be called only once per element. Any number of `whenAdded()` declarations could include the same selector or involve the same element.

```
whenAdded(selector: String, callback: Function)
```

```js
whenAdded(selector, (element) => {
  // Initialize.

  // Optional: Return a function to be called when
  // the element no longer matches the selector or
  // is removed from the DOM. This is the same as:
  // `whenRemoved(selector, element, () => { ... })`
  return () => {
    // Clean up.
  }
})
```

`added()` is an alias to `whenAdded()`, primarily to make it easier to read if the global is not deconstructed.

```js
WhenElements.added()
```

### whenRemoved

Call a function when the element is removed from the DOM or no longer matches the CSS selector. It will be called only once per element.

```
whenRemoved(selector: String, element: HTMLElement, callback: Function)
```

```js
whenRemoved(selector, element, () => {
  // Clean up.
})
```

`removed()` is an alias to `whenRemoved()`, primarily to make it easier to read if the global is not deconstructed.

```js
WhenElements.removed()
```

## Inspiration

This library is inspired by [`wickedElements`](https://github.com/WebReflection/wicked-elements), which is an enhancement of [`regularElements`](https://github.com/WebReflection/regular-elements), which is inspired by [`window.customElements`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry). Notable differences:

1. `regularElements` tries to adhere closely to the `customElements` spec, so it looks familiar. `WhenElements` provides a simple API, without trying to adhere to the `customElements` spec.
2. `onconnected()` can be called multiple times per element with `regularElements`. `wickedElements` adds `init()` to `regularElements`, to guarantee a single initialization per element. `whenAdded()` behaves this way by default.
3. `ondisconnected()` is called when the element is removed from the DOM, but not when the element no longer matches the selector provided in `define()`. This could be limiting, depending on the use case. `whenRemoved()` solves this.
4. `regularElements` protects against multiple definitions using the same selector. `whenAdded()` does not check this. That way, multiple behaviors could be defined in different places, even if they affect the same set of elements.

## Backlog

`whenAdded()`:
1. Return a function to cancel `whenAdded()`.
2. An optional `options` argument could allow for changes in the default behavior.
3. Option: Cancel after first match.
4. Option: Cancel after N matches.
5. Demonstrate how to bundle multiple `whenRemoved()` calls in the single return function.
6. Add tests.

`whenRemoved()`:
1. Return a function to cancel `whenRemoved()`.
2. Make selector optional and target required.
3. Make target optional and selector required.
4. Add tests.

Other potential methods:
1. `register()`: Define other methods to hook into the same DOM mutation callback that `whenAdded()` and `whenRemoved()` uses. Confirm if there's any performance penalty to having multiple duplicate `MutationObserver` declarations.
2. `get()`: Get an array of initialized elements.
