import winston from 'winston';
import Transport from 'winston-transport';

class CrosslabTransport extends Transport {
  private buffer: object[] = [];
  private upstream: (info: object) => void = () => {};

  log(info: object, callback?: () => void) {
    try {
      this.upstream(info);
    } catch (e) {
      this.buffer.push(info);
    }
    if (callback) callback();
  }

  _set_upstream(upstream: (info: object) => void) {
    this.upstream = upstream;
    const bufferCopy = this.buffer.slice();
    this.buffer = [];
    bufferCopy.forEach(info => this.log(info, undefined));
  }
}

export const crosslabTransport = new CrosslabTransport();

export const logger = winston.createLogger({
  transports: crosslabTransport,
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
});
