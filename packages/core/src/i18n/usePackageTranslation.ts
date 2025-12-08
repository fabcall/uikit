import type { UseTranslationResponse } from "react-i18next";
import { useTranslation } from "react-i18next";

export const PACKAGE_TRANSLATION_NAMESPACE = "readykit-ui" as const;

/**
 * Hook to access translations for the readykit-ui package.
 * Automatically uses the correct namespace.
 *
 * @returns Translation function `t` scoped to readykit-ui namespace
 *
 * @example
 * ```tsx
 * const { t } = usePackageTranslation();
 * const label = t("common.selectAll");
 * ```
 */
export function usePackageTranslation(): UseTranslationResponse<
  typeof PACKAGE_TRANSLATION_NAMESPACE,
  undefined
> {
  return useTranslation(PACKAGE_TRANSLATION_NAMESPACE);
}
