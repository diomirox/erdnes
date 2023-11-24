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
    {
      notation: [0x49, 0x44, 0x33],
      extention: "mp3"
    },
    {
      notation: [0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D],
      extention: "mp4"
    },
    {
      notation: [0x66, 0x74, 0x79, 0x70, 0x4D, 0x53, 0x4E, 0x56],
      extention: "mp4"
    }
  ];

export type ExtType = "jpg" | "png" | "webp" | "gif" | "pdf" | "mp3" | "mp4" | "unknown";
