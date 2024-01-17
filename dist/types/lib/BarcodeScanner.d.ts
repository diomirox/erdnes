export type Barcodes = {
    length: number;
    text: string;
    type: 'code128' | 'qr' | 'code39';
};
export declare function scanIt(filepath: string): Promise<Barcodes[]>;
//# sourceMappingURL=BarcodeScanner.d.ts.map