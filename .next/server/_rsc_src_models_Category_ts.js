"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_src_models_Category_ts";
exports.ids = ["_rsc_src_models_Category_ts"];
exports.modules = {

/***/ "(rsc)/./src/models/Category.ts":
/*!********************************!*\
  !*** ./src/models/Category.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CategorySchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true,\n        trim: true,\n        maxlength: 100,\n        unique: true\n    },\n    slug: {\n        type: String,\n        required: true,\n        unique: true,\n        lowercase: true,\n        trim: true\n    },\n    icon: {\n        type: String,\n        trim: true,\n        default: \"\\uD83C\\uDFF7️\"\n    }\n}, {\n    timestamps: true\n});\nconst Category = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Category || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model(\"Category\", CategorySchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Category);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbW9kZWxzL0NhdGVnb3J5LnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2RDtBQVU3RCxNQUFNRSxpQkFBaUIsSUFBSUQsNENBQU1BLENBQy9CO0lBQ0VFLE1BQU07UUFBRUMsTUFBTUM7UUFBUUMsVUFBVTtRQUFNQyxNQUFNO1FBQU1DLFdBQVc7UUFBS0MsUUFBUTtJQUFLO0lBQy9FQyxNQUFNO1FBQUVOLE1BQU1DO1FBQVFDLFVBQVU7UUFBTUcsUUFBUTtRQUFNRSxXQUFXO1FBQU1KLE1BQU07SUFBSztJQUNoRkssTUFBTTtRQUFFUixNQUFNQztRQUFRRSxNQUFNO1FBQU1NLFNBQVM7SUFBTTtBQUNuRCxHQUNBO0lBQUVDLFlBQVk7QUFBSztBQUdyQixNQUFNQyxXQUNKZix3REFBZSxDQUFDZSxRQUFRLElBQUlmLHFEQUFjLENBQVksWUFBWUU7QUFFcEUsaUVBQWVhLFFBQVFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yYXZvLy4vc3JjL21vZGVscy9DYXRlZ29yeS50cz8zYWRiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSwgeyBTY2hlbWEsIERvY3VtZW50LCBNb2RlbCB9IGZyb20gJ21vbmdvb3NlJztcblxuZXhwb3J0IGludGVyZmFjZSBJQ2F0ZWdvcnkgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIG5hbWU6IHN0cmluZztcbiAgc2x1Zzogc3RyaW5nO1xuICBpY29uPzogc3RyaW5nO1xuICBjcmVhdGVkQXQ6IERhdGU7XG4gIHVwZGF0ZWRBdDogRGF0ZTtcbn1cblxuY29uc3QgQ2F0ZWdvcnlTY2hlbWEgPSBuZXcgU2NoZW1hPElDYXRlZ29yeT4oXG4gIHtcbiAgICBuYW1lOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHRyaW06IHRydWUsIG1heGxlbmd0aDogMTAwLCB1bmlxdWU6IHRydWUgfSxcbiAgICBzbHVnOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUsIHVuaXF1ZTogdHJ1ZSwgbG93ZXJjYXNlOiB0cnVlLCB0cmltOiB0cnVlIH0sXG4gICAgaWNvbjogeyB0eXBlOiBTdHJpbmcsIHRyaW06IHRydWUsIGRlZmF1bHQ6ICfwn4+377iPJyB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKTtcblxuY29uc3QgQ2F0ZWdvcnk6IE1vZGVsPElDYXRlZ29yeT4gPVxuICBtb25nb29zZS5tb2RlbHMuQ2F0ZWdvcnkgfHwgbW9uZ29vc2UubW9kZWw8SUNhdGVnb3J5PignQ2F0ZWdvcnknLCBDYXRlZ29yeVNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IENhdGVnb3J5O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiU2NoZW1hIiwiQ2F0ZWdvcnlTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwidHJpbSIsIm1heGxlbmd0aCIsInVuaXF1ZSIsInNsdWciLCJsb3dlcmNhc2UiLCJpY29uIiwiZGVmYXVsdCIsInRpbWVzdGFtcHMiLCJDYXRlZ29yeSIsIm1vZGVscyIsIm1vZGVsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/models/Category.ts\n");

/***/ })

};
;