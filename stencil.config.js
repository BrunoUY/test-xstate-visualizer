"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// https://stenciljs.com/docs/config
exports.config = {
    globalScript: 'src/global/app.ts',
    globalStyle: 'src/global/app.css',
    taskQueue: 'async',
    outputTargets: [{
            type: 'www',
            serviceWorker: null
        }],
};
