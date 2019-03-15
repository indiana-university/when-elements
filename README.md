# WhenElements

Callbacks for when elements are added or removed from the DOM.

- No polyfills needed.
- Works down to IE 11 (cerca 2013).
- Lightweight (~0.8kb min, ~0.5kb min+gzip).
- Register start up and shut down callbacks for elements, based on CSS selectors.
- Define multiple behaviors (different callbacks) for the same element.
- Browser dependencies: [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver), [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## Install and import

Use WhenElements however you'd like.

1. Global `WhenElements`, via CDN.

```
<script src="https://unpkg.com/when-elements"></script>

const { whenAdded, whenRemoved } = WhenElements
```

2. ESM, via CDN.

```
import { whenAdded, whenRemoved } from 'https://unpkg.com/when-elements?module'
```

3. ESM bundler.

```
npm install when-elements

import { whenAdded, whenRemoved } from 'when-elements'
```

4. CJS module.

```
npm install when-elements

const { whenAdded, whenRemoved } = require('when-elements')
```

