import { extentionMap } from "./extention_map";
import { check, readBuffer } from "./general";

export const fileDetector = async (file: File | string) => {
  const buffers = (await readBuffer(file, 0, 8)) as Iterable<number>;

  const maping = [...extentionMap];
  function checker(
    buff: Iterable<number>,
    maping: typeof extentionMap
  ): string {
    const ext = maping.shift();
    if (!ext) return "unknown";

    const isMatch = check(ext.notation)(new Uint8Array(buff));
    if (isMatch) return ext.extention;

    return checker(buff, maping);
  }

  return checker(buffers, maping);
};
