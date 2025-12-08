import { toastStore } from "./helpers/toastStore";

/**
 * Toast API
 *
 * A toast notification system with stack management and gestures.
 *
 * @example
 * ```tsx
 * Toast.show({
 *   title: 'Success!',
 *   message: 'Your action was completed',
 *   variant: 'success',
 *   duration: 'short',
 * });
 * ```
 */
export const Toast = {
  show: toastStore.show,
  dismiss: toastStore.dismiss,
  dismissAll: toastStore.dismissAll,
};
