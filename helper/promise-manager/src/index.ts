export class PromiseManager {
  private _promises: Map<string, { resolve: (value: unknown) => void }> = new Map();

  add(id: string): Promise<unknown> {
    if (this._promises.has(id)) {
      throw new Error(`Promise with id "${id}" already exists!`);
    }

    return new Promise<unknown>(resolve => {
      this._promises.set(id, {
        resolve,
      });
    });
  }

  resolve(id: string, value: unknown) {
    const promise = this._promises.get(id);

    if (!promise) {
      throw new Error(`Promise with id "${id}" does not exists!`);
    }

    this._promises.delete(id);

    promise.resolve(value);
  }
}
