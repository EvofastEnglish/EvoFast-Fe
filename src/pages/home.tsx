"use client";

import ExamStructureTable from "@/components/examStructureTable/ExamStructureTable";
import { getDataAiTests } from "@/features/aiTest";
import { useQuestionQueue } from "@/hook/use-question-queue";
import { useQueueNavigator } from "@/hook/use-queue-navigator";
import { AiTestResult } from "@/model/aiTest";
import aiTestService from "@/services/aiTest";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  AI_TEST_SESSION_ID,
  borderSolidColor,
  LABEL_SPINING,
  primaryColorButton,
} from "@/utils/constants";
import { generateQuestionQueue } from "@/utils/helpers";
import { localStorageService } from "@/utils/localstorage";
import { Button, Input, Skeleton, Spin } from "antd";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const { TextArea } = Input;

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { saveQueue } = useQuestionQueue();
  const { goToFirst } = useQueueNavigator();
  const [isSpining, setIsSpining] = useState<boolean>(false);
  const [isDisableBtn, setisDisableBtn] = useState<boolean>(false);

  const { dataAiTests, getAiTestloading } = useAppSelector(
    (state) => state.aiTest
  );

  const getData = useCallback(async () => {
    await dispatch(getDataAiTests()).then(({ payload }) => {
      const data = payload as AiTestResult;
      const queue = generateQuestionQueue(data.aiTests.data[0].aiTestSections);
      saveQueue(queue);
    });
  }, [dispatch]);

  const startAiTest = async () => {
    setIsSpining(true);
    setisDisableBtn(true);
    await aiTestService
      .startAiTest(dataAiTests.aiTests.data[0].id)
      .then((response) => {
        localStorageService.set<string>(
          AI_TEST_SESSION_ID,
          response.aiTestSessionDto.id
        );
        goToFirst();
        setIsSpining(false);
      })
      .catch((error) => {
        setIsSpining(false);
        setisDisableBtn(false);
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <BasicLayout
      content={
        <div className="mt-2">
          <div
            className="relative shadow w-4/5 md:w-1/2 inset-0 m-auto font-japaneseSans min-h-[400px]"
            style={{ border: `1px solid ${borderSolidColor}` }}
          >
            <Spin tip={LABEL_SPINING} spinning={isSpining}>
              <Skeleton loading={getAiTestloading}>
                {dataAiTests.aiTests.count > 0 ? (
                  <>
                    <TextArea
                      autoSize={true}
                      value={dataAiTests.aiTests.data[0].description}
                      variant="borderless"
                      readOnly
                      style={{ resize: "none", color: "#000" }}
                    />
                    <div className="p-4">
                      <ExamStructureTable />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </Skeleton>
            </Spin>
          </div>
          <div className="flex justify-center mt-3">
            <Button
              disabled={isDisableBtn}
              style={{
                backgroundColor: `${primaryColorButton}`,
                color: "#fff",
              }}
              onClick={() => startAiTest()}
            >
              テスト開始
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default Home;
