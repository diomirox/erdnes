import { Readable } from "stream";

type QueueEvent<R> =
  | { type: "progress"; data: R; haveError?: boolean }
  | { type: "end"; data: R[]; haveError?: boolean };

export class QueueRunner<T, R> {
  private readonly data: T[];
  private readonly func: (props: T) => Promise<R>;
  private readonly concurrency: number;
  private readonly result: R[] = [];
  private readonly pending: Promise<any>[] = [];
  private isRunning = false;
  private readable = new Readable();

  constructor(data: T[], func: (props: T) => any, concurrency = 1) {
    this.data = data;
    this.func = func;
    this.concurrency = concurrency;
  }

  private async runner() {
    const data = this.data.shift();
    if (!data) return;

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

  private emit(event: QueueEvent<R>) {
    this.readable.emit(event.type, event);
  }

  private async run() {
    if (this.isRunning) return;
    this.isRunning = true;

    const promises = this.pending.concat(
      Array(this.concurrency - this.pending.length)
        .fill(null)
        .map(() => this.runner())
    );

    try {
      await Promise.all(promises);
      this.emit({ type: "end", data: this.result });
    } catch (error) {
      this.emit({ type: "end", data: this.result, haveError: true });
    } finally {
      this.isRunning = false;
    }
  }

  start() {
    this.readable._read = () => {};
    this.run();
    return this.readable;
  }

  stop() {
    this.pending.splice(0);
  }

  async getResults(): Promise<R[]> {
    return this.result;
  }
}
