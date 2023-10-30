"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileDetector = void 0;
const extention_map_1 = require("./extention_map");
const general_1 = require("./general");
const fileDetector = async (file) => {
    const buffers = (await (0, general_1.readBuffer)(file, 0, 8));
    const maping = [...extention_map_1.extentionMap];
    function checker(buff, maping) {
        const ext = maping.shift();
        if (!ext)
            return "unknown";
        const isMatch = (0, general_1.check)(ext.notation)(new Uint8Array(buff));
        if (isMatch)
            return ext.extention;
        return checker(buff, maping);
    }
    return checker(buffers, maping);
};
exports.fileDetector = fileDetector;
