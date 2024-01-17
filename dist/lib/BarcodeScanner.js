"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanIt = void 0;
const child_process_1 = require("child_process");
async function scanIt(filepath) {
    const exe = './ext/BarcodeReaderCLI';
    const args = [filepath];
    const proc = (0, child_process_1.spawn)(exe, args);
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
exports.scanIt = scanIt;
