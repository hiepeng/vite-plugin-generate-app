import { Plugin } from 'vite';

declare function loadApp({ externalSrc, fileName, crossorigin, crossoriginVal, }?: {
    externalSrc?: string;
    fileName?: string;
    crossorigin?: boolean;
    crossoriginVal?: string;
}): Plugin;

export { loadApp };
