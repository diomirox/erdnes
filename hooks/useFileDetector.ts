export const useFileDetector = () => {
  function readBuffer(file: File, start = 0, end = 2) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file.slice(start, end));
    });
  }

  function check(headers: any) {
    return (buffers: any, options = { offset: 0 }) =>
      headers.every(
        (header: any, index: any) => header === buffers[options.offset + index]
      );
  }

  function stringToBytes(string: string) {
    return [...string].map((character) => character.charCodeAt(0));
  }

  const checkResult = async (file: File) => {
    const buffers = (await readBuffer(file, 0, 8)) as any;

    const isPDF = check(stringToBytes("%PDF"))(new Uint8Array(buffers));
    if (isPDF) return "pdf";
    const isJPG = check([0xff, 0xd8, 0xff])(new Uint8Array(buffers));
    if (isJPG) return "jpg";
    const isPNG = check([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])(
      new Uint8Array(buffers)
    ); //.PNG
    if (isPNG) return "png";
    const isWEBP = check([0x52, 0x49, 0x46, 0x46])(new Uint8Array(buffers)); // RIFF
    if (isWEBP) return "webp";

    return "unknown";
  };

  return checkResult;
};
