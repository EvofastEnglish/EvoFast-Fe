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

      section.aiTestSectionQuestions.forEach((question) => {
        queue.push(`/part/${sectionId}/question/${question.id}`);
      });
    });

  queue.push("/final-result");
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

export const updateSectionDescriptions = (
  sections: AiTestSection[]
): AiTestSection[] => {
  return sections.map((section) => {
    switch (section.sectionOrder) {
      case 1:
        return {
          ...section,
          description:
            "まずはあなたの自己紹介（お名前、現在のお仕事など）について\n英語で自由に話して下さい。時間は30秒です。\nスタートボタンを押すと、5秒のカウントダウンがあり、その後開始されます。\n",
        };
      case 3:
        return {
          ...section,
          description:
            "ビジネスの場面での会話のロールプレイをします。\n相手の立場（上司・顧客など）やシチュエーションが指定されますので、\nその相手に話すように自然に発話して下さい。\n発話時間は60秒です。\n最初に考える時間が30秒与えられます。\n",
        };
      case 5:
        return {
          ...section,
          description:
            "指定されたテーマについて、あなたの考えや意見を自由に英語で話してください。理由や具体例を含めると、伝わりやすくなります。\n発話時間は60秒です。制限時間内で精一杯伝えることを心掛けて下さい。\n最初に考える時間が30秒与えられます。\n",
        };
      default:
        return section;
    }
  });
};
