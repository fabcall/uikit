import type { ToastData, ToastOptions } from "../Toast.props";
import { ANIMATION_CONFIG, DURATIONS, TOAST_CONFIG } from "./constants";

type ToastListener = (toasts: ToastData[]) => void;

export function createToastStore(): {
  subscribe: (listener: ToastListener) => () => void;
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
  requestDismiss: (id: string) => void;
  dismissAll: () => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
} {
  const toasts: ToastData[] = [];
  const listeners = new Set<ToastListener>();
  const timers = new Map<string, NodeJS.Timeout>();

  const notify = (): void => {
    listeners.forEach((listener) => {
      listener([...toasts]);
    });
  };

  const subscribe = (listener: ToastListener): (() => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const show = (options: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random()}`;

    const toast: ToastData = {
      id,
      title: options.title,
      message: options.message || "",
      variant: options.variant || "none",
      duration: options.duration || "short",
      icon: options.icon,
      dismissible: options.dismissible ?? true,
      onTap: options.onTap || (() => {}),
      onDismiss: options.onDismiss || (() => {}),
      createdAt: Date.now(),
    };

    if (toasts.length >= TOAST_CONFIG.MAX_STACK) {
      const oldest = toasts[0];
      dismiss(oldest.id);
    }

    toasts.push(toast);
    notify();

    if (toast.duration !== "infinite") {
      const duration = DURATIONS[toast.duration];
      const timer = setTimeout(() => {
        requestDismiss(id);
      }, duration);
      timers.set(id, timer);
    }

    return id;
  };

  const requestDismiss = (id: string): void => {
    const toast = toasts.find((t) => t.id === id);
    if (!toast || toast.isExiting) return;

    const timer = timers.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }

    toast.isExiting = true;
    notify();

    // Actually remove after exit animation completes
    setTimeout(() => {
      dismiss(id);
    }, ANIMATION_CONFIG.DISMISS_DURATION + 50);
  };

  const dismiss = (id: string): void => {
    const index = toasts.findIndex((t) => t.id === id);
    if (index === -1) return;

    const toast = toasts[index];
    toasts.splice(index, 1);

    const timer = timers.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }

    toast.onDismiss();
    notify();
  };

  const dismissAll = (): void => {
    // Trigger exit animation for all toasts
    toasts.forEach((toast) => {
      requestDismiss(toast.id);
    });
  };

  const pauseTimer = (id: string): void => {
    const timer = timers.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.delete(id);
    }
  };

  const resumeTimer = (id: string): void => {
    const toast = toasts.find((t) => t.id === id);
    if (!toast || toast.duration === "infinite") return;

    const duration = DURATIONS[toast.duration];
    const timer = setTimeout(() => {
      requestDismiss(id);
    }, duration);
    timers.set(id, timer);
  };

  return {
    subscribe,
    show,
    dismiss,
    requestDismiss,
    dismissAll,
    pauseTimer,
    resumeTimer,
  };
}

export const toastStore = createToastStore();
