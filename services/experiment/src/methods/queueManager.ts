import { logger } from '@crosslab/service-common';
import { Mutex } from 'async-mutex';
import Queue from 'queue';

class SimpleQueueManager {
  private mutex = new Mutex();
  private queueMap: Map<string, Queue> = new Map();

  private createQueue(id: string) {
    const queue = new Queue({
      concurrency: 1,
      autostart: true,
    });

    queue.addEventListener('error', error => {
      if (error)
        logger.log(
          'error',
          `An error occurred while processing a job in the queue for ${id}`,
        );
      else {
        this.mutex.acquire().then(internalRelease => {
          try {
            if (queue.length === 0) this.queueMap.delete(id);
          } finally {
            internalRelease();
          }
        });
      }
    });

    return queue;
  }

  public async addToQueue(id: string, handler: () => void | Promise<void>) {
    const release = await this.mutex.acquire();

    try {
      const queue = this.queueMap.get(id) ?? this.createQueue(id);
      if (!this.queueMap.has(id)) this.queueMap.set(id, queue);

      queue.push(async () => {
        await handler();
      });
    } finally {
      release();
    }
  }
}

export const simpleQueueManager = new SimpleQueueManager();
