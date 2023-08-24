import { Mutex } from 'async-mutex';

class MutexManager {
    private mutex = new Mutex();
    private mutexMap: Map<string, Mutex> = new Map();

    public async acquire(id: string) {
        const release = await this.mutex.acquire();
        try {
            const mutex = this.mutexMap.get(id) ?? new Mutex();
            if (!this.mutexMap.has(id)) this.mutexMap.set(id, mutex);
            return await mutex.acquire();
        } finally {
            release();
        }
    }
}

export const mutexManager = new MutexManager();
