/**
 * Checks if all elements in the headers array are equal to the corresponding elements in the buffers array.
 *
 * @param {number[]} headers - The array of headers to compare.
 * @return {boolean} Returns true if all elements in the headers array are equal to the corresponding elements in the buffers array, otherwise returns false.
 */
export function check(
  headers: number[]
): (buffers: Iterable<number>, options?: { offset: number }) => boolean {
  return (buffers: Iterable<number>, options = { offset: 0 }) =>
    headers.every(
      (header, index) =>
        header === (buffers as number[])[options.offset + index]
    );
}

/**
 * Converts a string to an array of character codes.
 *
 * @param {string} string - The string to convert.
 * @return {number[]} An array of character codes.
 */
export function stringToBytes(string: string): number[] {
  return [...string].map((character) => character.charCodeAt(0));
}
