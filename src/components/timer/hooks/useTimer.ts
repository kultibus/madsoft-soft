import { useEffect, useRef } from 'react';
import { $quizStore, setTimeLimit } from '@src/pages/quiz/store';
import { useUnit } from 'effector-react';
import { formatTime } from '../utils';

export const useTimer = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { timeLimit } = useUnit($quizStore);

  useEffect(() => {
    if (timeLimit <= 0 && !!timerRef.current) {
      clearTimeout(timerRef.current);

      //   sessionStorage.removeItem('timeLimit');
      return;
    }

    timerRef.current = setTimeout(() => setTimeLimit(timeLimit - 1000), 1000);

    sessionStorage.setItem('timeLimit', JSON.stringify(timeLimit));

    return () => {
      //   sessionStorage.removeItem('timeLimit');
      clearTimeout(timerRef.current);
    };
  }, [timeLimit]);

  return {
    formatedTime: formatTime(new Date(timeLimit)),
    isAttention: timeLimit <= 1000 * 60,
  };
};
