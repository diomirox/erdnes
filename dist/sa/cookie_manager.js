"use strict";
"use server";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = exports.getCookie = void 0;
const headers_1 = require("next/headers");
/**
 * Retrieves the value of a cookie with the specified name.
 *
 * @param {string} name - The name of the cookie.
 * @return {Promise<string | null>} The value of the cookie.
 */
async function getCookie(name) {
    const cookie = (0, headers_1.cookies)();
    const data = cookie.get(name);
    if (!data)
        return null;
    return (data === null || data === void 0 ? void 0 : data.value) || null;
}
exports.getCookie = getCookie;
/**
 * Sets a cookie with the given name and value.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @return {boolean} - Returns true if the cookie was set successfully, otherwise false.
 */
async function setCookie(name, value) {
    const cookie = (0, headers_1.cookies)();
    if (!value) {
        cookie.delete(name);
        return true;
    }
    cookie.set(name, value);
    return true;
}
exports.setCookie = setCookie;
