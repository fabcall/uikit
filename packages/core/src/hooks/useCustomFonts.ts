/* eslint-disable @typescript-eslint/no-unsafe-assignment -- Using require for dynamic imports */
import type { FontSource } from "expo-font";
import { useFonts } from "expo-font";

export interface UseCustomFontsOptions {
  fonts?: Record<string, number>;
}

export interface UseCustomFontsResult {
  fontsLoaded: boolean;
  error: Error | null;
}

const defaultFonts: Record<string, FontSource> = {
  "Inter-Regular": require("../../assets/fonts/Inter-Regular.otf"),
  "Inter-Medium": require("../../assets/fonts/Inter-Medium.otf"),
  "Inter-SemiBold": require("../../assets/fonts/Inter-SemiBold.otf"),
  "Inter-Bold": require("../../assets/fonts/Inter-Bold.otf"),
};

export const useCustomFonts = (
  options?: UseCustomFontsOptions,
): UseCustomFontsResult => {
  const fonts = options?.fonts ?? defaultFonts;

  const [fontsLoaded, error] = useFonts(fonts);

  return {
    fontsLoaded,
    error,
  };
};
