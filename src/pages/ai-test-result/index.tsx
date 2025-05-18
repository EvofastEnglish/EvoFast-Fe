"use client";

import { AiTestResultResponse } from "@/model/aiTest";
import aiTestService from "@/services/aiTest";
import { AI_Test_Id_KEY, ROLE_ASSISTANT } from "@/utils/constants";
import { localStorageService } from "@/utils/localstorage";
import { Input, Skeleton } from "antd";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const { TextArea } = Input;

const AiTestResult: React.FC = () => {
  const [dataAiTestResult, setDataAiTestResult] =
    useState<AiTestResultResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setIsLoading(true);
    const aiTestId = localStorageService.get<string>(AI_Test_Id_KEY, "");
    if (aiTestId === "") return;

    await aiTestService
      .getAiTestsResult(aiTestId)
      .then((res) => {
        console.log(res);
        setDataAiTestResult(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <BasicLayout
      content={
        <Skeleton loading={isLoading}>
          <div className="relative w-4/5 md:w-1/2 inset-0 m-auto">
            {dataAiTestResult?.messages.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex ${
                    item.role === `${ROLE_ASSISTANT}`
                      ? "justify-start"
                      : "justify-end"
                  }`}
                >
                  <div className="border border-white  bg-gray-chat p-2.5 max-w-4/5 w-full rounded-2xl mb-11">
                    <TextArea
                      value={item.contents[0].text}
                      variant="borderless"
                      readOnly
                      autoSize={true}
                      style={{
                        resize: "none",
                        color: "#000",
                        width: "100%",
                        whiteSpace: "pre-wrap",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Skeleton>
      }
    />
  );
};

export default AiTestResult;
