"use client";

import { AiTestSessionDTOResponse } from "@/model/aiTest";
import aiTestService from "@/services/aiTest";
import {
  AI_TEST_SESSION_ID,
  borderSolidColor,
  contentFinalResult,
} from "@/utils/constants";
import { localStorageService } from "@/utils/localstorage";
import { Input, Skeleton } from "antd";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const { TextArea } = Input;

const FinalResult: React.FC = () => {
  const [finalResult, setFinalResult] = useState<AiTestSessionDTOResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const completeAITest = () => {
    setIsLoading(true);
    const sessionId = localStorageService.get<string>(AI_TEST_SESSION_ID, "");

    aiTestService
      .completeAiTest(sessionId)
      .then((response) => {
        setFinalResult(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    completeAITest();
  }, [completeAITest]);

  return (
    <BasicLayout
      content={
        <div>
          <div
            className="relative shadow w-4/5 md:w-1/2 inset-0 m-auto font-japaneseSans min-h-[400px] flex items-center flex-wrap"
            style={{ border: `1px solid ${borderSolidColor}` }}
          >
            <TextArea
              autoSize={true}
              value={contentFinalResult}
              variant="borderless"
              readOnly
              style={{ resize: "none", color: "#000" }}
            />
            <Skeleton loading={isLoading}>
              {finalResult?.aiTestSessionDto.summary !== undefined ? (
                <TextArea
                  autoSize={true}
                  value={finalResult?.aiTestSessionDto.summary}
                  variant="borderless"
                  readOnly
                  style={{ resize: "none", color: "#000" }}
                />
              ) : (
                <>No result</>
              )}
            </Skeleton>
          </div>
        </div>
      }
    />
  );
};

export default FinalResult;
