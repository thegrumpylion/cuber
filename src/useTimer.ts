import { useState, useEffect, useRef } from 'react';

type EventRecord = {
  description: string;
  time: number;
};

export const useTimer = () => {
  const [time, setTime] = useState(0);
  const [events, setEvents] = useState<EventRecord[]>([]);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    setTime(0); // Reset time to 0 before starting
    setEvents([]); // Clear previous events
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

  const recordEvent = (description: string) => {
    const event = { description, time };
    setEvents((prevEvents) => [...prevEvents, event]);
  };

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

  return { time, events, start, stop, recordEvent, formatTime };
};
