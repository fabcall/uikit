import { StyleSheet } from "react-native-unistyles";

export const styles = StyleSheet.create({
  tooltipContainer: {
    backgroundColor: "#1F2937", // Cinza escuro / Preto
    borderRadius: 8,
    padding: 0, // Padding é dado no wrapper interno
    // Sombras suaves
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: 300, // Tooltips não devem ser infinitamente largos por padrão
  },
  contentWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    // Garante que o conteúdo encolha se o Overlay for comprimido pelo middleware 'size'
    flexShrink: 1,
  },
  tooltipText: {
    color: "#F9FAFB",
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1, // Permite quebra de linha em textos longos
  },
});
