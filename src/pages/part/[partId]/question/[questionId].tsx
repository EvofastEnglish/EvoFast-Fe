import QuestionComponent from "@/components/questionComponent/QuestionComponent";
import { AiTestResult, AiTestSectionQuestions } from "@/model/aiTest";
import { DATA_AI_TEST } from "@/utils/constants";
import { findQuestionById } from "@/utils/helpers";
import { localStorageService } from "@/utils/localstorage";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { questionId, partId } = router.query;

  const [questionInfor, setQuestionInfor] = useState<AiTestSectionQuestions>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getContentAITestSession = useCallback(() => {
    setIsLoading(true);
    setQuestionInfor(undefined);

    const dataAiTests = localStorageService.get<AiTestResult>(DATA_AI_TEST, {
      aiTests: {
        pageIndex: 0,
        pageSize: 0,
        count: 0,
        data: [],
      },
    });
    if (dataAiTests.aiTests.data.length === 0) {
      setIsLoading(false);
      return;
    }

    const findQuestion = findQuestionById(
      dataAiTests.aiTests.data[0].aiTestSections,
      questionId?.toString() ?? ""
    );

    if (findQuestion === undefined) {
      setIsLoading(false);
      return;
    }
    setQuestionInfor(findQuestion);
    setIsLoading(false);
  }, [questionId]);

  useEffect(() => {
    getContentAITestSession();
  }, [getContentAITestSession]);
  return (
    <BasicLayout
      content={
        <>
          {isLoading && questionInfor === undefined ? (
            <></>
          ) : (
            <QuestionComponent
              key={questionId as string}
              questionId={questionId as string}
              partId={partId as string}
              questionInfor={questionInfor!}
            />
          )}
        </>
      }
    />
  );
};

export default QuestionPage;
