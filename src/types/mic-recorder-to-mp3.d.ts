declare module "mic-recorder-to-mp3" {
  export default class MicRecorder {
    constructor(options?: { bitRate?: number; encoderPath?: string });

    start(): Promise<void>;

    stop(): {
      getMp3(): Promise<[ArrayBuffer, Blob]>;
    };

    pause(): Promise<void>;
    resume(): Promise<void>;

    isRecording(): boolean;
  }
}
