import { useState, useEffect, useRef, useCallback } from "react";

export interface UseQuizTimerOptions {
  initialSeconds: number;
  onTimeUp?: () => void;
  onTickWarning?: (secondsLeft: number) => void;
  warningThresholdSeconds?: number;
  autoStart?: boolean;
}

export interface UseQuizTimerReturn {
  timeRemaining: number;
  timeTaken: number;
  formattedTime: string;
  isPaused: boolean;
  isFinished: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: (newSeconds?: number) => void;
}

/**
 * High-precision drift-free quiz timer hook using performance.now()
 */
export function useQuizTimer({
  initialSeconds,
  onTimeUp,
  onTickWarning,
  warningThresholdSeconds = 10,
  autoStart = true,
}: UseQuizTimerOptions): UseQuizTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState<number>(initialSeconds);
  const [isPaused, setIsPaused] = useState<boolean>(!autoStart);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const totalTimeRef = useRef<number>(initialSeconds);
  const startTimeRef = useRef<number | null>(null);
  const pausedAccumulatedRef = useRef<number>(0);
  const pauseStartRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const onTimeUpRef = useRef(onTimeUp);
  const onTickWarningRef = useRef(onTickWarning);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
    onTickWarningRef.current = onTickWarning;
  }, [onTimeUp, onTickWarning]);

  // Sync initial seconds when prop changes prior to starting
  useEffect(() => {
    totalTimeRef.current = initialSeconds;
    setTimeRemaining(initialSeconds);
  }, [initialSeconds]);

  const tick = useCallback(() => {
    if (startTimeRef.current === null) return;

    const now = performance.now();
    const elapsedSeconds = Math.floor(
      (now - startTimeRef.current - pausedAccumulatedRef.current) / 1000
    );
    const remaining = Math.max(0, totalTimeRef.current - elapsedSeconds);

    setTimeRemaining(remaining);

    if (remaining <= warningThresholdSeconds && remaining > 0) {
      onTickWarningRef.current?.(remaining);
    }

    if (remaining <= 0) {
      setIsFinished(true);
      setIsPaused(true);
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      onTimeUpRef.current?.();
    }
  }, [warningThresholdSeconds]);

  const startTimer = useCallback(() => {
    if (startTimeRef.current !== null) return; // already started
    startTimeRef.current = performance.now();
    pausedAccumulatedRef.current = 0;
    setIsPaused(false);
    setIsFinished(false);

    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, 200);
  }, [tick]);

  const pauseTimer = useCallback(() => {
    if (isPaused || isFinished || startTimeRef.current === null) return;
    pauseStartRef.current = performance.now();
    setIsPaused(true);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isPaused, isFinished]);

  const resumeTimer = useCallback(() => {
    if (!isPaused || isFinished || startTimeRef.current === null) return;
    if (pauseStartRef.current !== null) {
      pausedAccumulatedRef.current += performance.now() - pauseStartRef.current;
      pauseStartRef.current = null;
    }
    setIsPaused(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, 200);
  }, [isPaused, isFinished, tick]);

  const resetTimer = useCallback(
    (newSeconds?: number) => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const secs = newSeconds !== undefined ? newSeconds : initialSeconds;
      totalTimeRef.current = secs;
      setTimeRemaining(secs);
      startTimeRef.current = null;
      pausedAccumulatedRef.current = 0;
      pauseStartRef.current = null;
      setIsFinished(false);
      setIsPaused(!autoStart);

      if (autoStart) {
        startTimeRef.current = performance.now();
        intervalRef.current = window.setInterval(tick, 200);
      }
    },
    [autoStart, initialSeconds, tick]
  );

  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autoStart, startTimer]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const timeTaken = Math.max(0, totalTimeRef.current - timeRemaining);

  return {
    timeRemaining,
    timeTaken,
    formattedTime,
    isPaused,
    isFinished,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
  };
}
