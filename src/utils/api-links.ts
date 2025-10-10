const urlIdentityServer = "https://evofast-identityserver.evofast-app.com";
const baseUrl = "https://evofastapi.evofast-app.com";

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
