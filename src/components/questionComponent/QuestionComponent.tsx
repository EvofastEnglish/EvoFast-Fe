/* eslint-disable react-hooks/exhaustive-deps */
import RecorderComponent from "@/components/recorderComponent/RecorderComponent";
import { useQueueNavigator } from "@/hook/use-queue-navigator";
import { AiTestSectionQuestions } from "@/model/aiTest";
import aiTestSectionService from "@/services/aiTestSection";
import {
  AI_TEST_SESSION_ID,
  borderSolidColor,
  disableColorBtn,
  LABEL_FINISH_ANSWER_QUESTION,
  LABEL_SPINING,
  primaryColorButton,
  time_count_down,
} from "@/utils/constants";
import { localStorageService } from "@/utils/localstorage";
import { Button, Input, Skeleton, Spin } from "antd";
import MicRecorder from "mic-recorder-to-mp3";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  questionId: string;
  partId: string;
  questionInfor: AiTestSectionQuestions;
}

const { TextArea } = Input;

const QuestionComponent: React.FC<Props> = ({
  questionId,
  partId,
  questionInfor,
}) => {
  const router = useRouter();
  const { goToNext, isLast } = useQueueNavigator();

  const recorderRef = useRef<MicRecorder>(new MicRecorder({ bitRate: 320 }));
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState("");
  const [timer, setTimer] = useState(questionInfor?.recordingTimeSeconds);
  const [fileMp3, setFileMp3] = useState<File>();
  const [count, setCount] = useState(time_count_down);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isSpining, setIsSpining] = useState<boolean>(false);

  const stopRecording = useCallback(async () => {
    try {
      const [, blob] = await recorderRef.current.stop().getMp3();
      console.log("blob size:", blob.size);
      const url = URL.createObjectURL(blob);
      setBlobURL(url);
      const file = new File([blob], `recorded_audio_${questionId}.mp3`, {
        type: "audio/mpeg",
        lastModified: Date.now(),
      });
      setFileMp3(file);
    } catch (error) {
      console.error(error);
    } finally {
      setIsRecording(false);
      setIsDisable(false);
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (videoRef.current) {
        videoRef.current.loop = false;
        videoRef.current.pause();
        if (videoRef.current.readyState >= 1) {
          videoRef.current.currentTime = videoRef.current.duration;
        } else {
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current!.currentTime = videoRef.current!.duration;
          });
        }
      }
    }
  }, []);

  const startRecording = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      recorderRef.current = new MicRecorder({ bitRate: 320 });

      await recorderRef.current
        ?.start()
        .then(() => { })
        .catch((e) => {
          console.log(e);
        });

      setIsRecording(true);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.loop = true;
        videoRef.current.play().catch(() => {
          console.warn("Autoplay blocked, waiting for user interaction");
        });
      }

      // Bắt đầu đếm ngược thời gian ghi âm
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  }, []);

  const handleSubmitTest = async () => {
    setIsSpining(true);
    setIsDisable(true);
    const sessionId = localStorageService.get<string>(AI_TEST_SESSION_ID, "");

    const formData = new FormData();
    formData.append("QuestionId", questionId);
    formData.append("AiTestSessionId", sessionId);
    formData.append("AiTestSectionId", partId);
    formData.append("AudioFile", fileMp3!);
    formData.append("Language", "en");

    try {
      await aiTestSectionService.completeAiTestSectionQuestion(formData);
      const currentPath = router.asPath;
      if (!isLast(currentPath)) {
        await goToNext(currentPath);
      }
      setIsSpining(false);
    } catch (error) {
      setIsSpining(false);
      setIsDisable(false);
      console.error(error);
    }
  };

  // Đếm ngược thời gian chuẩn bị
  useEffect(() => {
    if (count > 0) {
      const id = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(id);
    } else {
      startRecording();
    }
  }, [count, startRecording]);

  // Reset khi câu hỏi thay đổi
  useEffect(() => {
    setIsDisable(true);
    setIsRecording(false);
    setBlobURL("");
    setFileMp3(undefined);
    setTimer(questionInfor?.recordingTimeSeconds);
    setCount(questionInfor?.thinkingTimeSeconds === 30 ? 30 : time_count_down);
    setIsSpining(false);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [questionInfor]);

  // Cleanup timer khi unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (recorderRef.current) {
        recorderRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div
        className="relative w-full sm:w-4/5 md:w-1/2 mx-auto mt-6 shadow pt-2"
        style={{ border: `1px solid ${borderSolidColor}` }}
      >
        <Spin tip={LABEL_SPINING} spinning={isSpining}>
          <Skeleton loading={questionInfor === undefined}>
            <div className="text-center">
              <span
                className="text-5xl"
                style={{ color: `${count === 0 ? "#fff" : "#000"}` }}
              >
                {count}
              </span>
            </div>

            <div className="p-2.5">
              <TextArea
                minLength={5}
                autoSize={true}
                value={questionInfor?.description}
                variant="borderless"
                readOnly
                style={{
                  resize: "none",
                  color: "#000",
                  textAlign: "start",
                  fontSize: "18px",
                }}
              />
            </div>

            <RecorderComponent
              isRecording={isRecording}
              videoRef={videoRef}
              timer={timer}
              blobURL={blobURL}
            />
          </Skeleton>
        </Spin>
      </div>

      <div className="relative w-full sm:w-4/5 md:w-1/2 mx-auto font-japaneseSans text-end mt-5">
        <Button
          disabled={isDisable}
          style={{
            backgroundColor: isDisable ? disableColorBtn : primaryColorButton,
            color: "#fff",
            height: "40px",
            width: "100px",
            fontSize: "17px",
          }}
          onClick={handleSubmitTest}
        >
          {LABEL_FINISH_ANSWER_QUESTION}
        </Button>
      </div>
    </div>
  );
};

export default QuestionComponent;
