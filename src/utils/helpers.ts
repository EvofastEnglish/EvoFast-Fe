import { AiTestSection, AiTestSectionQuestions } from "@/model/aiTest";
import { DecodedToken } from "@/model/user";
import moment from "moment";

export const clearAuthPersistedData = () => {
  if (typeof window === "undefined") return; // Đảm bảo chạy trên client-side

  const persistedData = localStorage.getItem("persist:root");
  if (persistedData) {
    const parsedData = JSON.parse(persistedData);
    delete parsedData.global;
    localStorage.setItem("persist:root", JSON.stringify(parsedData));
  }
};

export const parseJWT = (token: string): DecodedToken | null => {
  if (!token) {
    console.error("Token không hợp lệ hoặc trống");
    return null;
  }

  try {
    const payload = token.split(".")[1]; // Lấy phần payload của JWT
    const decodedPayload = atob(payload); // Giải mã Base64
    const result = JSON.parse(decodedPayload);
    return result;
  } catch (error) {
    console.error("Lỗi khi parse JWT:", error);
    return null;
  }
};

export const isExpiredTimeToken = (loginDate: string, exp: number): boolean => {
  const tokenExpiredTime = moment(loginDate).add(exp, "minute").toDate();
  const currentDate = moment().toDate();
  return tokenExpiredTime > currentDate;
};

export const generateQuestionQueue = (
  aiTestSections: AiTestSection[]
): string[] => {
  const queue: string[] = [];

  [...aiTestSections]
    .sort((a, b) => a.sectionOrder - b.sectionOrder)
    .forEach((section) => {
      const sectionId = section.id;
      queue.push(`/part/${sectionId}`);

      section.aiTestSectionQuestions.forEach((question, index) => {
        queue.push(`/part/${sectionId}/question/${question.id}`);
      });
    });
  return queue;
};

export const findQuestionById = (
  sections: AiTestSection[],
  questionId: string
): AiTestSectionQuestions | undefined => {
  for (const section of sections) {
    const found = section.aiTestSectionQuestions.find(
      (q) => q.id === questionId
    );
    if (found) {
      return found;
    }
  }
  return undefined;
};
