export class CrosslabTransport {
  private buffer: object[] = [];
  private upstream: (info: object) => void = () => {};

  log(info: object) {
    try {
      this.upstream(info);
    } catch (_e) {
      this.buffer.push(info);
    }
  }

  _set_upstream(upstream: (info: object) => void) {
    this.upstream = upstream;
    const bufferCopy = this.buffer.slice();
    this.buffer = [];
    bufferCopy.forEach(info => this.log(info));
  }
}

export const crosslabTransport = new CrosslabTransport();

type LoggerOptions<logLevel extends string> = {
  transports?: { log: (info: object) => void }[];
  levels?: Record<logLevel, number>;
  level?: logLevel;
};

export class Logger<logLevel extends string> {
  private levels: Record<string, number> = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  };
  private transports: { log: (info: object) => void }[];
  public level: logLevel;

  constructor(options: LoggerOptions<logLevel>) {
    this.transports = options.transports ? options.transports : [];
    if (options.levels) {
      this.levels = options.levels;
    }
    this.level =
      options.level ??
      (Object.entries(this.levels)
        .sort(([_1, value_1], [_2, value_2]) => value_1 - value_2)
        .slice(-1)[0][0] as logLevel);
    if (this.levels[this.level] === undefined) {
      throw new Error(`Invalid log level: ${this.level}`);
    }
  }

  log(level: logLevel, message: string | object, meta?: object) {
    if (typeof message === 'string') {
      meta = { message, ...meta };
    } else {
      meta = { ...message, ...meta };
    }
    if (this.levels[level] <= this.levels[this.level]) {
      const info = { level, ...meta };
      this.transports.forEach(transport => transport.log(info));
    }
  }
}

export const logger = new Logger({
  transports: [crosslabTransport],
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
});
