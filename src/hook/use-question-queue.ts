import { QUESTION_QUEUE } from "@/utils/constants";
import { localStorageService } from "@/utils/localstorage";

export const useQuestionQueue = () => {
  const getQueue = () => localStorageService.get<string[]>(QUESTION_QUEUE, []);
  const saveQueue = (queue: string[]) =>
    localStorageService.set(QUESTION_QUEUE, queue);
  const clearQueue = () => localStorageService.remove(QUESTION_QUEUE);

  return { getQueue, saveQueue, clearQueue };
};
