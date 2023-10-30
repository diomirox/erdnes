"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extentionMap = void 0;
const general_1 = require("./general");
exports.extentionMap = [
    {
        extention: "pdf",
        notation: (0, general_1.stringToBytes)("%PDF"),
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
];
