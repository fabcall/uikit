import { useState } from "react";

export const usePullToRefresh = (
  refetch: () => Promise<void>,
): {
  refreshing: boolean;
  onRefresh: () => Promise<void>;
} => {
  const [refreshing, setRefreshing] = useState(true);

  async function onRefresh() {
    try {
      await refetch();
      setRefreshing(false);
    } catch {
      setRefreshing(false);
    }
  }

  return { refreshing, onRefresh };
};
