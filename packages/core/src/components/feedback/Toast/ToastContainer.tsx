import React, { useEffect, useState } from "react";
import { View } from "react-native";

import { toastStore } from "./helpers/toastStore";
import type { ToastData } from "./Toast.props";
import { styles } from "./Toast.styles";
import { ToastItem } from "./ToastItem";

export function ToastContainer(): React.JSX.Element {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    return void toastStore.subscribe(setToasts);
  }, []);

  return (
    <View style={styles.container}>
      {toasts.map((toast, index) => {
        const stackIndex = toasts.length - 1 - index;
        return (
          <ToastItem
            isTopmost={stackIndex === 0}
            key={toast.id}
            onDismiss={() => {
              toastStore.dismiss(toast.id);
            }}
            onPauseTimer={toastStore.pauseTimer}
            onResumeTimer={toastStore.resumeTimer}
            stackIndex={stackIndex}
            toast={toast}
          />
        );
      })}
    </View>
  );
}

ToastContainer.displayName = "ToastContainer";
