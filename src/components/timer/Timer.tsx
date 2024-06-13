import { Heading } from '@chakra-ui/react';
import { setisTimeOver } from '@src/pages/quiz/store';
import React, { FC, useEffect, useState } from 'react';

// const timeLimit = 60000 * 60 * 10;

export const Timer: FC = () => {
  const [minutes, setMinutes] = useState<number>(10);

  useEffect(() => {
    let cnt = 0;
    let timer = setTimeout(function startTimer() {
      cnt++;

      setMinutes((min) => min - 1);

      timer = setTimeout(startTimer, 1000);

      if (cnt === minutes) {
        setisTimeOver(true);
        clearTimeout(timer);
      }
    }, 1000);

    return () => {
      setisTimeOver(true);
      clearTimeout(timer);
    };
  }, [minutes]);

  // console.log(minutes)

  return <Heading fontWeight={400}>{minutes}</Heading>;
};
