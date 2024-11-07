"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  loadApp: () => loadApp
});
module.exports = __toCommonJS(src_exports);
function loadApp({
  externalSrc,
  fileName = "app.js",
  crossorigin = false,
  crossoriginVal = ""
} = {}) {
  return {
    name: "vite-plugin-generate-app",
    apply: "build",
    generateBundle(_, bundle) {
      const newScript = generateLoadingScript(
        bundle,
        externalSrc,
        crossorigin,
        crossoriginVal
      );
      this.emitFile({
        type: "asset",
        fileName: `${fileName}`,
        source: newScript
      });
    }
  };
}
var generateLoadingScript = (bundle, externalSource, crossorigin, crossoriginVal) => {
  let scriptCode = "(function () {let scriptTag = document.getElementsByTagName('script');scriptTag = scriptTag[scriptTag.length - 1];const parent = scriptTag.parentNode;";
  let counter = 0;
  for (const key in bundle) {
    const filename = externalSource ? externalSource + "/" + bundle[key].fileName : bundle[key].fileName;
    const varName = `file${counter}`;
    if (bundle[key].type === "chunk") {
      const chunk = bundle[key];
      if (chunk.isEntry) {
        scriptCode += `const ${varName} = document.createElement('script');`;
        scriptCode += `${varName}.setAttribute('src', '${filename}');`;
        scriptCode += `${varName}.setAttribute('type', 'module');`;
        if (crossorigin) {
          scriptCode += `${varName}.setAttribute('crossorigin', '${crossoriginVal}');`;
        }
      } else {
        scriptCode += `const ${varName} = document.createElement('link');`;
        scriptCode += `${varName}.setAttribute('href', '${filename}');`;
        scriptCode += `${varName}.setAttribute('rel', 'modulepreload');`;
      }
    } else if (bundle[key].type === "asset" && bundle[key].fileName.endsWith(".css")) {
      scriptCode += `const ${varName} = document.createElement('link');`;
      scriptCode += `${varName}.setAttribute('href', '${filename}');`;
      scriptCode += `${varName}.setAttribute('rel', 'stylesheet');`;
    } else {
      continue;
    }
    scriptCode += `parent.appendChild(${varName});`;
    counter++;
  }
  scriptCode += "})()";
  return scriptCode;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadApp
});
