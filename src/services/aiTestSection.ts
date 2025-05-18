import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const startAiTestSection = async (
  aiTestSectionId: string,
  questionId: string
): Promise<void> => {
  await httpClient.post({
    url: apiLinks.aiTestSection.startAiTestSection,
    data: { aiTestSectionId: aiTestSectionId, questionId: questionId },
  });
};

const completeAiTestSectionQuestion = async (data: FormData): Promise<void> => {
  await httpClient.postMultipart({
    url: apiLinks.aiTestSection.completeAiTestSectionQuestion,
    data,
  });
};

const aiTestSectionService = {
  startAiTestSection,
  completeAiTestSectionQuestion,
};

export default aiTestSectionService;
