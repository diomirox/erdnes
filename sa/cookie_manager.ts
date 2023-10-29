"use server";
import { cookies } from "next/headers";

/**
 * Retrieves the value of a cookie with the specified name.
 *
 * @param {string} name - The name of the cookie.
 * @return {Promise<string | null>} The value of the cookie.
 */
export async function getCookie(name: string): Promise<string | null> {
  const cookie = cookies();
  const data = cookie.get(name);
  if (!data) return null;
  return data?.value || null;
}

/**
 * Sets a cookie with the given name and value.
 *
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @return {boolean} - Returns true if the cookie was set successfully, otherwise false.
 */
export async function setCookie(name: string, value: string): Promise<boolean> {
  const cookie = cookies();
  cookie.set(name, value);
  return true;
}
