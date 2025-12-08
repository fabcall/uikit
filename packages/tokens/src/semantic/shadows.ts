import { colors } from '../foundations/colors';

const createShadow = (x: number, y: number, blur: number, opacity: number, elevation: number) => ({
  shadowColor: colors.neutral.black,
  shadowOffset: { width: x, height: y },
  shadowOpacity: opacity,
  shadowRadius: blur,
  elevation,
});

export const shadows = {
  none: createShadow(0, 0, 0, 0, 0),
  sm: createShadow(0, 1, 2, 0.1, 2),
  md: createShadow(0, 4, 6, 0.12, 4),
  lg: createShadow(0, 10, 15, 0.15, 8),
};