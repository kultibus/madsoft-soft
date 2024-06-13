import React, { FC, useEffect, useState } from 'react';
import { Heading } from '@chakra-ui/react';
import { setisTimeOver } from '@src/pages/quiz/store';

export const Timer: FC = () => {
  const [minutes, setMinutes] = useState<number>(10);

  useEffect(() => {
    const timer = setTimeout(function startTimer() {
      setMinutes((min) => min - 1);
    }, 1000);

    if (minutes === 0) {
      setisTimeOver(true);
      clearTimeout(timer);
    }

    return () => {
      setisTimeOver(false);
      clearTimeout(timer);
    };
  }, [minutes]);

  return <Heading fontWeight={400}>{minutes}</Heading>;
};
