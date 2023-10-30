/**
 * Retrieves the value of a cookie with the specified name.
 *
 * @param {string} name - The name of the cookie.
 * @return {Promise<string | null>} The value of the cookie.
 */
export declare function getCookie(name: string): Promise<string | null>;
/**
 * Sets a cookie with the given name and value.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @return {boolean} - Returns true if the cookie was set successfully, otherwise false.
 */
export declare function setCookie(name: string, value: string | null): Promise<boolean>;
