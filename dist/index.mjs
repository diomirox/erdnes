import { Readable } from 'stream';
import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';

class QueueRunner {
    constructor(data, func, concurrency = 1) {
        this.result = [];
        this.pending = [];
        this.isRunning = false;
        this.readable = new Readable();
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

const extentionMap = [
    {
        notation: stringToBytes("%PDF"),
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

const fileDetector = async (file) => {
    const buffers = fs.readFileSync(file);
    const maping = [...extentionMap];
    function checker(buff, maping) {
        const ext = maping.shift();
        if (!ext)
            return "unknown";
        const isMatch = check(ext.notation)(new Uint8Array(buff));
        if (isMatch)
            return {
                ext: ext.extention,
                type: ext.mediaType
            };
        return checker(buff, maping);
    }
    return checker(buffers, maping);
};

async function scanIt(filepath) {
    const exe = path.join(__dirname, '../../ext/BarcodeReaderCLI');
    const args = [filepath];
    const proc = spawn(exe, args);
    const barcodes = await new Promise((resolve, reject) => {
        proc.stdout.on('data', (data) => {
            resolve(JSON.parse(data.toString()).sessions[0].barcodes);
        });
        proc.stdout.on('error', (data) => {
            reject(JSON.parse(data.toString()).sessions[0].barcodes);
        });
        proc.stderr.on('data', (data) => {
            reject(data.toString());
        });
        proc.stderr.on('error', (data) => {
            reject(data.toString());
        });
    });
    return barcodes;
}

export { QueueRunner, check, fileDetector, scanIt, stringToBytes };
