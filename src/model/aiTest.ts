export interface AiTestResult {
  aiTests: AiTestResponse;
}

export interface AiTestResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: AiTests[];
}

export interface AiTests {
  id: string;
  title: string;
  description: string;
  descriptionFinish: string;
  aiTestSections: AiTestSection[];
}

export interface AiTestSection {
  id: string;
  aiTestId: string;
  sectionOrder: number;
  title: string;
  totalQuestion: number;
  evaluationCriteria: string;
  description: string;
  aiTestSectionQuestions: AiTestSectionQuestions[];
}

export interface AiTestResultResponse {
  messages: MessageAIResponse[];
}

export interface MessageAIResponse {
  role: string;
  contents: ContentAIResponse[];
}

export interface ContentAIResponse {
  $type: string;
  text: string;
}

export interface AiTestSectionQuestions {
  id: string;
  title: string;
  description: string;
  thinkingTimeSeconds: number;
  recordingTimeSeconds: number;
}

export interface AiTestSessionDTOResponse {
  aiTestSessionDto: AiTestSessionDTO;
}
export interface AiTestSessionDTO {
  id: string;
  aiTestId: string;
  createdAt: string;
  completedAt: string;
  summary: string;
  isCompleted: boolean;
}

export interface ChatMessageResponse {
  chatMessageDtos: ChatMessageDtos[];
}

export interface ChatMessageDtos {
  role: string;
  content: string;
  createdAt: string;
}
