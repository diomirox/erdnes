(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('next/headers'), require('stream')) :
    typeof define === 'function' && define.amd ? define(['exports', 'next/headers', 'stream'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Zod = {}, global.headers, global.stream));
})(this, (function (exports, headers, stream) { 'use strict';

    /**
     * Retrieves the value of a cookie with the specified name.
     *
     * @param {string} name - The name of the cookie.
     * @return {Promise<string | null>} The value of the cookie.
     */
    async function getCookie(name) {
        const cookie = headers.cookies();
        const data = cookie.get(name);
        if (!data)
            return null;
        return (data === null || data === void 0 ? void 0 : data.value) || null;
    }
    /**
     * Sets a cookie with the given name and value.
     *
     * @param {string} name - The name of the cookie.
     * @param {string} value - The value of the cookie.
     * @return {boolean} - Returns true if the cookie was set successfully, otherwise false.
     */
    async function setCookie(name, value) {
        const cookie = headers.cookies();
        if (!value) {
            cookie.delete(name);
            return true;
        }
        cookie.set(name, value);
        return true;
    }

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
            var _a, _b;
            if (this.isRunning)
                return;
            this.isRunning = true;
            const promises = this.pending.concat(Array(this.concurrency - this.pending.length)
                .fill(null)
                .map(() => this.runner()));
            try {
                await Promise.all(promises);
                this.emit({ type: "end", data: this.result });
                (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, this.readable);
            }
            catch (error) {
                (_b = this.reject) === null || _b === void 0 ? void 0 : _b.call(this, error);
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
    exports.getCookie = getCookie;
    exports.readBuffer = readBuffer;
    exports.setCookie = setCookie;
    exports.stringToBytes = stringToBytes;
    exports.useFileDetector = useFileDetector;

}));
