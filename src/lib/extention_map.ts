import { stringToBytes } from "./general";

export const extentionMap: {
  extention: ExtType;
  notation: number[];
}[] = [
  {
    extention: "pdf",
    notation: stringToBytes("%PDF"),
  },
  {
    notation: [0xff, 0xd8, 0xff],
    extention: "jpg",
  },
  {
    notation: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
    extention: "png",
  },
  {
    notation: [0x52, 0x49, 0x46, 0x46],
    extention: "webp",
  },
  {
    notation: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
    extention: "gif",
  },
];

export type ExtType = "jpg" | "png" | "webp" | "gif" | "pdf" | "unknown";
