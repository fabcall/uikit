import { useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

export const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return appState;
};

export const useAppStateChanged = (
  callback: (previousAppState: AppStateStatus, nextAppState: AppStateStatus) => void
): void => {
  const currentAppState = useAppState();
  const previousAppStateRef = useRef<AppStateStatus>(currentAppState);

  useEffect(() => {
    if (previousAppStateRef.current !== currentAppState) {
      callback(previousAppStateRef.current, currentAppState);
      previousAppStateRef.current = currentAppState;
    }
  }, [currentAppState, callback]);
};

export const useAppStateChangedTo = (
  desiredAppState: AppStateStatus, 
  callback: () => void
): void => {
  const appState = useAppState();
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    if (appState === desiredAppState) {
      callbackRef.current();
    }
  }, [appState, desiredAppState]);
};