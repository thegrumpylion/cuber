import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const Timer = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    setTime(0);
    if (intervalRef.current !== null) return; // Prevent multiple intervals

    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const stop = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useImperativeHandle(ref, () => ({
    start,
    stop
  }));

  const formatTime = (time: number) => {
    const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time / 60000)}`.slice(-2);
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>Timer: {formatTime(time)}</div>
  );
});

export default Timer;
