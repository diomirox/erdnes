(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('stream')) :
    typeof define === 'function' && define.amd ? define(['exports', 'stream'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Zod = {}, global.stream));
})(this, (function (exports, stream) { 'use strict';

    class QueueRunner {
        constructor(data, func, concurrency = 1) {
            this.result = [];
            this.pending = [];
            this.isRunning = false;
            this.readable = new stream.Readable();
            this.data = data;
            this.func = func;
            this.concurrency = concurrency;
        }
        async runner() {
            const data = this.data.shift();
            if (!data)
                return;
            const task = this.func(data)
                .then((result) => {
                this.result.push(result);
                this.emit({ type: "progress", data: result });
            })
                .catch((e) => console.log(e));
            this.pending.push(task);
            await task;
            await this.runner();
        }
        emit(event) {
            this.readable.emit(event.type, event);
        }
        async run() {
            if (this.isRunning)
                return;
            this.isRunning = true;
            const promises = this.pending.concat(Array(this.concurrency - this.pending.length)
                .fill(null)
                .map(() => this.runner()));
            try {
                await Promise.all(promises);
                this.emit({ type: "end", data: this.result });
            }
            catch (error) {
                this.emit({ type: "end", data: this.result, haveError: true });
            }
            finally {
                this.isRunning = false;
            }
        }
        start() {
            this.readable._read = () => { };
            this.run();
            return this.readable;
        }
        stop() {
            this.pending.splice(0);
        }
        async getResults() {
            return this.result;
        }
    }

    /**
     * Checks if all elements in the headers array are equal to the corresponding elements in the buffers array.
     *
     * @param {number[]} headers - The array of headers to compare.
     * @return {boolean} Returns true if all elements in the headers array are equal to the corresponding elements in the buffers array, otherwise returns false.
     */
    function check(headers) {
        return (buffers, options = { offset: 0 }) => headers.every((header, index) => header === buffers[options.offset + index]);
    }
    /**
     * Converts a string to an array of character codes.
     *
     * @param {string} string - The string to convert.
     * @return {number[]} An array of character codes.
     */
    function stringToBytes(string) {
        return [...string].map((character) => character.charCodeAt(0));
    }
    function readBuffer(file, start = 0, end = 2) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file.slice(start, end));
        });
    }

    const extentionMap = [
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
    ];

    const fileDetector = async (file) => {
        const buffers = (await readBuffer(file, 0, 8));
        const maping = [...extentionMap];
        function checker(buff, maping) {
            const ext = maping.shift();
            if (!ext)
                return "unknown";
            const isMatch = check(ext.notation)(new Uint8Array(buff));
            if (isMatch)
                return ext.extention;
            return checker(buff, maping);
        }
        return checker(buffers, maping);
    };

    /**
     * Generates the function comment for the useFileDetector function.
     *
     * @return {function} The checkResult function that detects the file type based on the provided buffers.
     */
    function useFileDetector() {
        return (file) => fileDetector(file);
    }

    exports.QueueRunner = QueueRunner;
    exports.check = check;
    exports.fileDetector = fileDetector;
    exports.readBuffer = readBuffer;
    exports.stringToBytes = stringToBytes;
    exports.useFileDetector = useFileDetector;

}));
