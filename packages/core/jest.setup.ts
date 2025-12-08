import "react-native-unistyles/mocks";
import "./src/configureTheme";

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
  initReactI18next: {
    type: "3rdParty",
    init: () => {
      //
    },
  },
}));
