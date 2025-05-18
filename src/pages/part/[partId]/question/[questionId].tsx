import QuestionComponent from "@/components/questionComponent/QuestionComponent";
import { AiTestSectionQuestions } from "@/model/aiTest";
import { useAppSelector } from "@/store/hooks";
import { findQuestionById } from "@/utils/helpers";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

const QuestionPage: React.FC = () => {
  const router = useRouter();
  const { questionId, partId } = router.query;

  const { dataAiTests } = useAppSelector((state) => state.aiTest);
  const [questionInfor, setQuestionInfor] = useState<AiTestSectionQuestions>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getContentAITestSession = useCallback(() => {
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
          {isLoading ? (
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
