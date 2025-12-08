import { View } from "react-native";

import { Text } from "../../data-display/Text";

export function EmptyState(): React.JSX.Element {
  return (
    <View>
      <Text>EmptyState</Text>
    </View>
  );
}

EmptyState.displayName = "EmptyState";
