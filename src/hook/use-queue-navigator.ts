import { useRouter } from "next/router";
import { useQuestionQueue } from "./use-question-queue";

export const useQueueNavigator = () => {
  const router = useRouter();
  const { getQueue, clearQueue } = useQuestionQueue();

  const goToFirst = () => {
    const queue = getQueue();
    if (queue.length > 0) {
      router.push(queue[0]);
    }
  };

  const goToNext = (currentPath: string) => {
    const queue = getQueue();
    const currentIndex = queue.indexOf(currentPath);
    if (currentIndex >= 0 && currentIndex + 1 < queue.length) {
      router.push(queue[currentIndex + 1]);
    } else {
      router.push("/final-result");
    }
  };

  const goToPrev = (currentPath: string) => {
    const queue = getQueue();
    const currentIndex = queue.indexOf(currentPath);
    if (currentIndex > 0) {
      router.push(queue[currentIndex - 1]);
    }
  };

  const isLast = (currentPath: string) => {
    const queue = getQueue();
    return queue[queue.length - 1] === currentPath;
  };

  return {
    goToFirst,
    goToNext,
    goToPrev,
    isLast,
    clearQueue,
  };
};
