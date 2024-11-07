# vite-plugin-generate-app
Package your program into an app.js file and use your website on another website. bring your website into the DOM using app.js instead of `index.html`


## Why?
You will only need 1 .html file to load 1 of your website.

when you need to inject your website into an `index.html`

When your source code needs to be approved every time you edit it, you just need to send your partner the html file, and if you edit, you don't need to edit your partner's file, you just need to edit your source code.


## Installation
```
npm install vite-plugin-generate-app -D
```

## How to use?
Suppose you have 2 source codes and deploy them in 2 places

- Source code 1 used vite
```js
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { loadApp } from 'vite-plugin-generate-app'

export default defineConfig({
	plugins: [vue(), loadApp({
        externalSrc: "https://mydomain.com", // domain current
        // fileName: "app.js", // name file
        // crossorigin: false, // boolean
        // crossoriginVal = "" // string
    })]
})
```

- Source code 2 is only index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MY APP</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      var script = document.createElement('script');
      script.src = "https://mydomain.com/app.js";
      document.head.appendChild(script);
    </script>
  </body>
</html>
```
node 18-20

## License
MIT