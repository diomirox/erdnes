"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBytes = exports.check = void 0;
/**
 * Checks if all elements in the headers array are equal to the corresponding elements in the buffers array.
 *
 * @param {number[]} headers - The array of headers to compare.
 * @return {boolean} Returns true if all elements in the headers array are equal to the corresponding elements in the buffers array, otherwise returns false.
 */
function check(headers) {
    return (buffers, options = { offset: 0 }) => headers.every((header, index) => header === buffers[options.offset + index]);
}
exports.check = check;
/**
 * Converts a string to an array of character codes.
 *
 * @param {string} string - The string to convert.
 * @return {number[]} An array of character codes.
 */
function stringToBytes(string) {
    return [...string].map((character) => character.charCodeAt(0));
}
exports.stringToBytes = stringToBytes;
