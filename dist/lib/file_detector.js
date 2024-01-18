"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDetector = void 0;
const extention_map_1 = require("./extention_map");
const general_1 = require("./general");
const fs_1 = __importDefault(require("fs"));
const fileDetector = async (file) => {
    const buffers = fs_1.default.readFileSync(file);
    const maping = [...extention_map_1.extentionMap];
    function checker(buff, maping) {
        const ext = maping.shift();
        if (!ext)
            return "unknown";
        const isMatch = (0, general_1.check)(ext.notation)(new Uint8Array(buff));
        if (isMatch)
            return {
                ext: ext.extention,
                type: ext.mediaType
            };
        return checker(buff, maping);
    }
    return checker(buffers, maping);
};
exports.fileDetector = fileDetector;
