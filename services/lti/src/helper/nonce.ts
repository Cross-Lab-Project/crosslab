import { randomBytes } from 'crypto';

class NonceStore {
  private circular_buffer: string[] = new Array(100);
  private index = 0;

  public get(): string {
    const nonce = randomBytes(32).toString('base64url');
    this.circular_buffer[this.index] = nonce;
    this.index = (this.index + 1) % this.circular_buffer.length;
    return nonce;
  }

  public check(nonce: string): boolean {
    if (nonce === '' || nonce === undefined) {
      return false;
    }
    const index = this.circular_buffer.indexOf(nonce);
    if (index === -1) {
      return false;
    } else {
      this.circular_buffer[index] = '';
      return true;
    }
  }
}

export const nonce_store = new NonceStore();
