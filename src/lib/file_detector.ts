import { ExtType, MediaType, extentionMap } from "./extention_map";
import { check } from "./general";
import fs from "fs"

export type ResultType = { ext: ExtType, type: MediaType }
export const fileDetector = async (file: Buffer): Promise<ResultType> => {
  const buffers = fs.readFileSync(file);

  const maping = [...extentionMap];
  function checker(
    buff: Iterable<number>,
    maping: typeof extentionMap
  ): ResultType {
    const ext = maping.shift();
    if (!ext) return {
      ext: "unknown",
      type: "unknown"
    };

    const isMatch = check(ext.notation)(new Uint8Array(buff));
    if (isMatch) return {
      ext: ext.extention,
      type: ext.mediaType
    };

    return checker(buff, maping);
  }

  return checker(buffers, maping);
};