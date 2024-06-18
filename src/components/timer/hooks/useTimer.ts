import { useEffect, useRef } from 'react';
import { $quizStore, setDeadline } from '@src/pages/quiz/store';
import { useUnit } from 'effector-react';
import { formatTime } from '../utils';

export const useTimer = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { deadline } = useUnit($quizStore);

  useEffect(() => {
    if (deadline <= 0 && !!timerRef.current) {
      clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => setDeadline(deadline - 1000), 1000);
  }, [deadline]);

  return {
    formatedTime: formatTime(new Date(deadline)),
    isAttention: deadline <= 1000 * 60,
  };
};
