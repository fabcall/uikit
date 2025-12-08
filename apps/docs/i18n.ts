import { PACKAGE_TRANSLATION_NAMESPACE } from "@readykit/core/i18n";
import { uiLocales } from "@readykit/core/locales";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      [PACKAGE_TRANSLATION_NAMESPACE]: uiLocales.en,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v3",
});

export default i18n;
