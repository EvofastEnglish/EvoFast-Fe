const urlIdentityServer = "https://evofast-identityserver.solocode.click";
const baseUrl = "https://evofastapi.solocode.click";

const apiLinks = {
  user: {
    login: `${urlIdentityServer}/connect/token`,
    refreshToken: `${urlIdentityServer}/connect/token`,
    removeToken: `${urlIdentityServer}/connect/revocation`,
  },
  aiTest: {
    getAiTest: `${baseUrl}/AiTests`,
    startAiTest: `${baseUrl}/AiTests/Start`,
    resultAiTest: `${baseUrl}/AiTests/Result`,
    completeAiTest: `${baseUrl}/AiTests/Complete/Session`,
    chatMessageAiTest: `${baseUrl}/AiTests/Session`,
  },
  aiTestSection: {
    startAiTestSection: `${baseUrl}/AiTestSections/Start`,
    completeAiTestSectionQuestion: `${baseUrl}/AiTestSectionQuestions/Complete`,
  },
};

export default apiLinks;
