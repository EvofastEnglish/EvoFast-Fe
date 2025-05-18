import {
  AiTestResult,
  AiTestResultResponse,
  AiTestSessionDTOResponse,
} from "@/model/aiTest";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getAiTests = async (): Promise<AiTestResult> => {
  const response = await httpClient.get<AiTestResult>({
    url: apiLinks.aiTest.getAiTest,
  });
  return response.data;
};

const startAiTest = async (
  aiTestId: string
): Promise<AiTestSessionDTOResponse> => {
  const response = await httpClient.post<AiTestSessionDTOResponse>({
    url: apiLinks.aiTest.startAiTest,
    data: {
      aiTestId: aiTestId,
    },
  });
  return response.data;
};

const getAiTestsResult = async (id: string): Promise<AiTestResultResponse> => {
  const response = await httpClient.get<AiTestResultResponse>({
    url: apiLinks.aiTest.resultAiTest,
    params: { aiTestId: id },
  });
  return response.data;
};

const completeAiTest = async (
  aiTestSessionId: string
): Promise<AiTestSessionDTOResponse> => {
  const response = await httpClient.post<AiTestSessionDTOResponse>({
    url: apiLinks.aiTest.completeAiTest,
    data: {
      aiTestSessionId: aiTestSessionId,
    },
  });
  return response.data;
};

const aiTestService = {
  getAiTests,
  startAiTest,
  getAiTestsResult,
  completeAiTest,
};

export default aiTestService;
