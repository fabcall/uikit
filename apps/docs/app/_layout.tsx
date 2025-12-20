import "@readykit/core/configureTheme";

import { useCustomFonts } from "@readykit/core";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider } from "react-native-safe-area-context";

import i18n from "../i18n";

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { fontsLoaded } = useCustomFonts();

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
