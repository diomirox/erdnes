"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFileDetector = void 0;
const lib_1 = require("../lib");
/**
 * Generates the function comment for the useFileDetector function.
 *
 * @return {function} The checkResult function that detects the file type based on the provided buffers.
 */
function useFileDetector() {
    return (file) => (0, lib_1.fileDetector)(file);
}
exports.useFileDetector = useFileDetector;
