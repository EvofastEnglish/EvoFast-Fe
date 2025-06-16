import PartIntroduction from "@/components/partIntroduction/PartIntroduction";
import { useQueueNavigator } from "@/hook/use-queue-navigator";
import { AiTestResult, AiTestSection } from "@/model/aiTest";
import {
  DATA_AI_TEST,
  LABEL_SPINING,
  primaryColorButton,
} from "@/utils/constants";
import { localStorageService } from "@/utils/localstorage";
import { Button, Skeleton, Spin } from "antd";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const BasicLayout = dynamic(() => import("@layout/BasicLayout"), {
  ssr: false,
});

interface Props {
  partId: string;
}

const Part: React.FC<Props> = (props) => {
  const router = useRouter();
  const { partId } = props;
  const { goToNext, isLast } = useQueueNavigator();

  const [dataAiTestSection, setDataAiTestSection] = useState<AiTestSection>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isSpining, setIsSpining] = useState<boolean>(false);

  const getContentPart = useCallback(() => {
    const dataAiTests = localStorageService.get<AiTestResult>(DATA_AI_TEST, {
      aiTests: {
        pageIndex: 0,
        pageSize: 0,
        count: 0,
        data: [],
      },
    });

    if (dataAiTests.aiTests.data.length === 0) return;

    setIsloading(true);
    const sectionResult = dataAiTests.aiTests.data[0].aiTestSections.filter(
      (t) => t.id === partId
    );

    if (sectionResult.length === 0) {
      setIsloading(false);
      return;
    }
    setDataAiTestSection(sectionResult[0]);
    setIsloading(false);
  }, [partId]);

  const startAITestSection = async () => {
    setIsSpining(true);
    const currentPath = router.asPath;
    if (!isLast(currentPath)) {
      await goToNext(currentPath);
    }
    setIsSpining(false);
  };

  useEffect(() => {
    getContentPart();
  }, [getContentPart]);

  useEffect(() => {
    const requestMicrophonePermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.log(error);
      }
    };

    requestMicrophonePermission();
  }, []);

  return (
    <BasicLayout
      content={
        <div>
          <Spin tip={LABEL_SPINING} spinning={isSpining}>
            <Skeleton loading={isLoading}>
              <PartIntroduction
                content={dataAiTestSection?.description ?? ""}
              />
            </Skeleton>
          </Spin>

           <div className="relative w-4/5 md:w-1/2 inset-0 m-auto font-japaneseSans text-end mt-5">
            <Button
              disabled={isSpining}
              style={{
                backgroundColor: `${primaryColorButton}`,
                color: "#fff",
                height: '40px',
                width: '150px',
                fontSize:'17px'
              }}
              onClick={() => startAITestSection()}
            >
              スタート
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default Part;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const partId = context.query.partId as string;

  return {
    props: {
      partId,
    },
  };
};
