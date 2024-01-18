/// <reference types="node" />
import { ExtType, MediaType } from "./extention_map";
export type ResultType = {
    ext: ExtType;
    type: MediaType;
} | "unknown";
export declare const fileDetector: (file: Buffer) => Promise<ResultType>;
//# sourceMappingURL=file_detector.d.ts.map