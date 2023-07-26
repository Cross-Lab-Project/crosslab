import { logger } from '@crosslab/service-common'
import { Mutex } from 'async-mutex'
import Queue from 'queue'

class SimpleQueueManager {
    private mutex = new Mutex()
    private queueMap: Map<string, Queue> = new Map()

    public async addToQueue(id: string, handler: () => void | Promise<void>) {
        const release = await this.mutex.acquire()

        try {
            const queue =
                this.queueMap.get(id) ??
                new Queue({
                    concurrency: 1,
                })

            queue.push(async () => {
                await handler()
            })

            queue.start(async (error) => {
                if (error)
                    logger.log(
                        'error',
                        `An error occurred while processing a job in the queue for ${id}`
                    )
                else {
                    const internalRelease = await this.mutex.acquire()
                    try {
                        if (queue.length === 0) this.queueMap.delete(id)
                    } finally {
                        internalRelease()
                    }
                }
            })

            if (!this.queueMap.has(id)) this.queueMap.set(id, queue)
        } finally {
            release()
        }
    }
}

export const simpleQueueManager = new SimpleQueueManager()
