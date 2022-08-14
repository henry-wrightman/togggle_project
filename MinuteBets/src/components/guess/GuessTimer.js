import React, { useEffect, useState } from "react";
import i18n from 'i18n-js';

function GuessTimer({ onCompletion, target }) {
  if (!target) return;

  const calculateTimeLeft = () => {
    const difference = + target - +new Date();
    if (difference <= 0) return;
       
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  if (!timeLeft) return;
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{i18n.t('guessResolvesSuffix')}
      </span>
    );
  });
  if (target && timerComponents.length === 0) {
    setTimeLeft(undefined);
    onCompletion();
  }
  return (
    <div className='centerAlignAndJust column container'>
      {timerComponents.length ? timerComponents : <span></span>}
    </div>
  );
}

export { GuessTimer };