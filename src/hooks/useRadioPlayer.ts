import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { RADIO_CONNECTION_ERROR, RADIO_STREAM_URL } from '../data/radio';

export function useRadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const audio = new Audio(RADIO_STREAM_URL);
    audio.preload = 'none';
    audio.crossOrigin = 'anonymous';
    audioRef.current = audio;

    const markReady = () => {
      setIsReady(true);
      setStatusMessage(null);
    };
    const handlePlaying = () => {
      markReady();
      setIsLoading(false);
      setIsPlaying(true);
    };
    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };
    const handleWaiting = () => {
      if (!audio.paused) {
        setIsLoading(true);
      }
    };
    const handleError = () => {
      setStatusMessage(RADIO_CONNECTION_ERROR);
      setIsReady(false);
      setIsPlaying(false);
      setIsLoading(false);
    };

    audio.addEventListener('canplay', markReady);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('stalled', handleWaiting);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      audio.removeEventListener('canplay', markReady);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('stalled', handleWaiting);
      audio.removeEventListener('error', handleError);
      audioRef.current = null;
    };
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      await audio.play();
    } catch {
      setStatusMessage(RADIO_CONNECTION_ERROR);
      setIsReady(false);
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
    setIsLoading(false);
  }, []);

  return useMemo(
    () => ({
      isPlaying,
      isLoading,
      isReady,
      statusMessage,
      play,
      pause,
    }),
    [isLoading, isPlaying, isReady, pause, play, statusMessage],
  );
}
