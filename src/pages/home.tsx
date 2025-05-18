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
  primaryColorButton,
} from "@/utils/constants";
import { generateQuestionQueue } from "@/utils/helpers";
import { localStorageService } from "@/utils/localstorage";
import { Button, Input, Skeleton } from "antd";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const { TextArea } = Input;

const Home: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { saveQueue } = useQuestionQueue();
  const { goToFirst } = useQueueNavigator();

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
    await aiTestService
      .startAiTest(dataAiTests.aiTests.data[0].id)
      .then((response) => {
        localStorageService.set<string>(
          AI_TEST_SESSION_ID,
          response.aiTestSessionDto.id
        );
        goToFirst();
      })
      .catch((error) => console.log(error));
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
          </div>
          <div className="flex justify-center mt-3">
            <Button
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
