import { Text } from "react-native";

import { styles } from "./ErrorMessage.styles";

interface ErrorMessageProps {
  error?: string;
}

export function ErrorMessage({
  error,
}: ErrorMessageProps): React.JSX.Element | null {
  if (!error) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

ErrorMessage.displayName = "ErrorMessage";
