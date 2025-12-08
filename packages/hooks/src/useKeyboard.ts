import { useEffect, useState } from "react";
import { Keyboard, type KeyboardEvent, type KeyboardMetrics, Platform } from "react-native";

const emptyCoordinates: KeyboardMetrics = {
  screenX: 0,
  screenY: 0,
  width: 0,
  height: 0,
};

const initialCoordinates = {
  start: emptyCoordinates,
  end: emptyCoordinates,
};

interface KeyboardState {
  isKeyboardVisible: boolean;
  coordinates: {
    start: KeyboardMetrics | undefined;
    end: KeyboardMetrics;
  };
  keyboardHeight: number;
}

const initialState: KeyboardState = {
  isKeyboardVisible: false,
  coordinates: initialCoordinates,
  keyboardHeight: 0,
};

export const useKeyboard = (): KeyboardState => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>(initialState);

  useEffect(() => {
    const handleKeyboardShow = (e: KeyboardEvent): void => {
      setKeyboardState({
        isKeyboardVisible: true,
        coordinates: { start: e.startCoordinates, end: e.endCoordinates },
        keyboardHeight: e.endCoordinates.height,
      });
    };

    const handleKeyboardHide = (e: KeyboardEvent): void => {
      setKeyboardState({
        isKeyboardVisible: false,
        coordinates: { start: e.startCoordinates, end: e.endCoordinates },
        keyboardHeight: 0,
      });
    };

    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const subscriptions = [
      Keyboard.addListener(showEvent, handleKeyboardShow),
      Keyboard.addListener(hideEvent, handleKeyboardHide),
    ];

    return () => {
      subscriptions.forEach((subscription) => { subscription.remove(); });
    };
  }, []);

  return keyboardState;
};
