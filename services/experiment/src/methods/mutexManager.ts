import { ErrorWithStatus } from '@crosslab/service-common';
import { Mutex, MutexInterface, withTimeout } from 'async-mutex';

export class MutexAcquisitionError extends ErrorWithStatus {
  constructor(message: string) {
    super(message, 409);
    this.name = 'MutexAcquisitionError';
  }
}

class MutexManager {
  private timelimit = 3000;
  private mutex = new Mutex();
  private mutexMap: Map<string, MutexInterface> = new Map();

  public async acquire(id: string) {
    const release = await this.mutex.acquire();
    try {
      const mutex =
        this.mutexMap.get(id) ??
        withTimeout(
          new Mutex(),
          this.timelimit,
          new MutexAcquisitionError(
            `Timeout: Could not acquire the Mutex for "${id}" within the timelimit of ${this.timelimit}ms, please try again later`,
          ),
        );
      if (!this.mutexMap.has(id)) this.mutexMap.set(id, mutex);
      return await mutex.acquire();
    } finally {
      release();
    }
  }
}

export const mutexManager = new MutexManager();
