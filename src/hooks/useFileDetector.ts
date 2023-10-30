import { fileDetector } from "../lib";

/**
 * Generates the function comment for the useFileDetector function.
 *
 * @return {function} The checkResult function that detects the file type based on the provided buffers.
 */
export function useFileDetector(): (file: File) => Promise<string> {
  return (file: File) => fileDetector(file);
}
