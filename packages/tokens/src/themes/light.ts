import { colors } from "../foundations/colors";
import { radii } from "../foundations/radii";
import { sizes } from "../foundations/sizes";
import { spacing } from "../foundations/spacing";
import { timing } from "../foundations/timing";
import { typography } from "../foundations/typography";
import { zIndices } from "../foundations/zIndices";
import { shadows } from "../semantic/shadows";

export const lightTheme = {
  colors: {
    background: colors.background.base,
    surface: colors.background.surface,
    surfaceHighlight: colors.background.elevated,
    surfaceVariant: colors.background.elevated,

    // MD3-style surface tint levels (elevation)
    surfaceLevel0: colors.surfaceTint.level0,
    surfaceLevel1: colors.surfaceTint.level1,
    surfaceLevel2: colors.surfaceTint.level2,
    surfaceLevel3: colors.surfaceTint.level3,
    surfaceLevel4: colors.surfaceTint.level4,
    surfaceLevel5: colors.surfaceTint.level5,

    textPrimary: colors.text.primary,
    textSecondary: colors.text.secondary,
    textDisabled: colors.text.disabled,
    textInverse: colors.text.inverse,

    primary: colors.brand.primary,
    onPrimary: colors.brand.onPrimary,
    primaryContainer: colors.brand.primaryLight,
    onPrimaryContainer: colors.brand.onPrimaryLight,
    primaryHover: colors.brand.primaryHover,
    primaryDisabled: colors.brand.primaryDisabled,

    secondary: colors.brand.secondary,
    onSecondary: colors.brand.onSecondary,
    secondaryContainer: colors.brand.secondaryLight,
    onSecondaryContainer: colors.brand.onSecondaryLight,
    secondaryHover: colors.brand.secondaryHover,

    error: colors.error.main,
    onError: colors.error.onError,
    errorContainer: colors.error.light,
    onErrorContainer: colors.error.onLight,

    success: colors.success.main,
    onSuccess: colors.success.onSuccess,
    successContainer: colors.success.light,
    onSuccessContainer: colors.success.onLight,

    warning: colors.warning.main,
    onWarning: colors.warning.onWarning,
    warningContainer: colors.warning.light,
    onWarningContainer: colors.warning.onLight,

    info: colors.info.main,
    onInfo: colors.info.onInfo,
    infoContainer: colors.info.light,
    onInfoContainer: colors.info.onLight,

    border: colors.border.base,
    divider: colors.border.base,
  },
  spacing,
  radii,
  sizes,
  timing,
  zIndices,
  typography,
  shadows,
} as const;

export type AppTheme = typeof lightTheme;
