/// <reference types="node" />
import { Readable } from "stream";
export declare class QueueRunner<T, R> {
    private readonly data;
    private readonly func;
    private readonly concurrency;
    private readonly result;
    private readonly pending;
    private isRunning;
    private resolve?;
    private reject?;
    private readable;
    constructor(data: T[], func: (props: T) => any, concurrency?: number);
    private runner;
    private emit;
    private run;
    start(): Readable;
    stop(): void;
    getResults(): Promise<R[]>;
}
