"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extentionMap = void 0;
const general_1 = require("./general");
exports.extentionMap = [
    {
        notation: (0, general_1.stringToBytes)("%PDF"),
        extention: "pdf",
        mediaType: "document"
    },
    {
        notation: [0xff, 0xd8, 0xff],
        extention: "jpg",
        mediaType: "image"
    },
    {
        notation: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
        extention: "png",
        mediaType: "image"
    },
    {
        notation: [0x52, 0x49, 0x46, 0x46],
        extention: "webp",
        mediaType: "image"
    },
    {
        notation: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61],
        extention: "gif",
        mediaType: "image"
    },
    {
        notation: [0x49, 0x44, 0x33],
        extention: "mp3",
        mediaType: "audio"
    },
    {
        notation: [0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D],
        extention: "mp4",
        mediaType: "video"
    },
    {
        notation: [0x66, 0x74, 0x79, 0x70, 0x4D, 0x53, 0x4E, 0x56],
        extention: "mp4",
        mediaType: "video"
    }
];
