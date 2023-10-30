"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueRunner = void 0;
const stream_1 = require("stream");
class QueueRunner {
    constructor(data, func, concurrency = 1) {
        this.result = [];
        this.pending = [];
        this.isRunning = false;
        this.readable = new stream_1.Readable();
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
exports.QueueRunner = QueueRunner;
