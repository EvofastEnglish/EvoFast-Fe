import PartIntroduction from "@/components/partIntroduction/PartIntroduction";
import { useQueueNavigator } from "@/hook/use-queue-navigator";
import { AiTestSection } from "@/model/aiTest";
import { useAppSelector } from "@/store/hooks";
import { LABEL_SPINING, primaryColorButton } from "@/utils/constants";
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

  const { dataAiTests } = useAppSelector((state) => state.aiTest);

  const [dataAiTestSection, setDataAiTestSection] = useState<AiTestSection>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isSpining, setIsSpining] = useState<boolean>(false);

  const getContentPart = useCallback(() => {
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

          <div className="flex justify-center mt-3">
            <Button
              disabled={isSpining}
              style={{
                backgroundColor: `${primaryColorButton}`,
                color: "#fff",
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
