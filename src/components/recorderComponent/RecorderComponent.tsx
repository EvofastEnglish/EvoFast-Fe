"use client";

import React, { Ref, useEffect } from "react";

interface Props {
  isRecording: boolean;
  videoRef: Ref<HTMLVideoElement>;
  timer: number;
  blobURL: string;
}

const RecorderComponent: React.FC<Props> = (prop) => {
  const { isRecording, timer, videoRef } = prop;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };

    if (isRecording) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    } else {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRecording]);

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="w-[80%] h-16">
          <video
            ref={videoRef}
            src="/video/animation_recording.mp4"
            muted
            className="w-full h-16 object-cover mb-4"
            preload="auto"
          />
        </div>
        <div className="flex items-center">
          <span className="text-3xl">{timer}</span>
        </div>
      </div>

      {/* {blobURL && (
        <div className="mt-4">
          <audio src={blobURL} controls />
        </div>
      )} */}
    </div>
  );
};

export default RecorderComponent;
