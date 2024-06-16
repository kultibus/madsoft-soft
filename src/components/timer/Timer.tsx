import React, { FC, useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { setIsTimeOver } from '@src/pages/quiz/store';

const MINUTES_LIMIT = 10;

export const Timer: FC = () => {
  const [minutes, setMinutes] = useState<number>(MINUTES_LIMIT);
  const [seconds, setSeconds] = useState<number>(0);

  const getTime = (timeLimit: number) => {
    const time = timeLimit - Date.now();

    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));

    return Math.floor(time / 1000);
  };

  useEffect(() => {
    const timeLimit = Date.now() + MINUTES_LIMIT * 60000;

    const timer = setTimeout(function run() {
      const timeEnd = getTime(timeLimit);

      const timer = setTimeout(run, 1000);

      if (timeEnd === 0) {
        setIsTimeOver(true);
        clearTimeout(timer);
      }
    }, 0);

    return () => {
      setIsTimeOver(false);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box
      fontSize='3xl'
      color={minutes < 1 && 'var(--chakra-colors-red-500)'}
      fontWeight={400}
    >
      {minutes > 9 ? minutes : '0' + minutes}:
      {seconds > 9 ? seconds : '0' + seconds}
    </Box>
  );
};
