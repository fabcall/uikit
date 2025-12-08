import "i18next";

import type { PACKAGE_TRANSLATION_NAMESPACE } from "./i18n/usePackageTranslation";
import type { en } from "./locales/en";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof PACKAGE_TRANSLATION_NAMESPACE;
    resources: {
      [PACKAGE_TRANSLATION_NAMESPACE]: typeof en;
    };
  }
}
