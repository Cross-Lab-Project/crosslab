export class DataChannel {
  ondata?: (data: string | ArrayBuffer | ArrayBufferView | Blob) => void;
  channel_type = 'DataChannel' as const;
  send: {
    (data: string): void;
    (data: Blob): void;
    (data: ArrayBuffer): void;
    (data: ArrayBufferView): void;
  };

  constructor() {
    this.send = () => {
      //throw Error("DataChannel must be first added to be able to send");
    };
  }

  ready(): Promise<void> {
    if (this.isReady) {
      return new Promise(resolve => resolve());
    }
    return new Promise(resolve => this.readyCallbacks.push(resolve));
  }

  private readyCallbacks: ((value: void) => void)[] = [];
  private isReady = false;
  _setReady() {
    this.isReady = true;
    this.readyCallbacks.forEach(f => f());
  }
}

export class MediaChannel {
  channel_type = 'MediaChannel' as const;
  ontrack?: (event: { track: MediaStreamTrack }) => void;
  track: MediaStreamTrack | undefined;

  constructor(track?: MediaStreamTrack) {
    this.track = track;
  }
}

export type Channel = DataChannel | MediaChannel;
