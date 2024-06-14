import React, { FC, useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { setFinishTime, setIsTimeOver } from '@src/pages/quiz/store';

const minutesLimit = 10;

export const Timer: FC = () => {
  const [minutes, setMinutes] = useState<number>(minutesLimit - 1);
  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {
    const timer = setTimeout(function startTimer() {
      setSeconds((sec) => sec - 1);
    }, 1000);

    if (seconds === 0 && minutes === 0) {
      setIsTimeOver(true);
      clearTimeout(timer);
      return;
    }

    if (seconds === 0) {
      setMinutes((min) => min - 1);
      setSeconds(60);
    }

    return () => {
      setIsTimeOver(false);
      clearTimeout(timer);
    };
  }, [seconds, minutes]);

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const finishTime = new Date(Date.now() - startTime);

      const minutes = finishTime.getMinutes();
      const seconds = finishTime.getSeconds();
      const strMin = minutes < 10 ? '0' + minutes : '' + minutes;
      const strSec = seconds < 10 ? '0' + seconds : '' + seconds;

      setFinishTime(strMin + ':' + strSec);
    };
  }, []);

  return (
    <Heading
      color={minutes < 1 && 'var(--chakra-colors-red-500)'}
      fontWeight={400}
    >
      {minutes === minutesLimit - 1 && seconds === 60
        ? minutesLimit
        : minutes < 10
        ? '0' + minutes
        : minutes}
      :{seconds < 10 ? '0' + seconds : seconds > 59 ? '00' : seconds}
    </Heading>
  );
};
