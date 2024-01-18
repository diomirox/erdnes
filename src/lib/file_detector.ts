import { ExtType, extentionMap } from "./extention_map";
import { check } from "./general";
import fs from "fs"

export const fileDetector = async (file: Buffer): Promise<ExtType> => {
  const buffers = fs.readFileSync(file);

  const maping = [...extentionMap];
  function checker(
    buff: Iterable<number>,
    maping: typeof extentionMap
  ): ExtType {
    const ext = maping.shift();
    if (!ext) return "unknown";

    const isMatch = check(ext.notation)(new Uint8Array(buff));
    if (isMatch) return ext.extention;

    return checker(buff, maping);
  }

  return checker(buffers, maping);
};
