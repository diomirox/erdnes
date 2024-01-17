import { spawn } from 'child_process';

export type Barcodes = {
  length: number;
  text: string;
  type: 'code128' | 'qr' | 'code39';
};

export async function scanIt(filepath: string) {
  const exe = './ext/BarcodeReaderCLI';
  const args: string[] = [filepath];

  const proc = spawn(exe, args);
  const barcodes = await new Promise((resolve, reject) => {
    proc.stdout.on('data', (data: any) => {
      resolve(JSON.parse(data.toString()).sessions[0].barcodes);
    });
    proc.stdout.on('error', (data: any) => {
      reject(JSON.parse(data.toString()).sessions[0].barcodes);
    });
    proc.stderr.on('data', (data: any) => {
      reject(data.toString());
    });
    proc.stderr.on('error', (data: any) => {
      reject(data.toString());
    });
  });

  return barcodes as Barcodes[];
}
