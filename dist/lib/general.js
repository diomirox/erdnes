"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBuffer = exports.stringToBytes = exports.check = void 0;
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
function readBuffer(file, start = 0, end = 2) {
    return new Promise((resolve, reject) => {
        try {
            let fs = require("fs");
            fs.readFile(file, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        }
        catch (e) {
            if (typeof file === "string")
                file = new File([file], "filename", { type: "text/plain" });
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file.slice(start, end));
        }
    });
}
exports.readBuffer = readBuffer;
