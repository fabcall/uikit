/**
 * Generates a deterministic hash from a name
 * Used for consistent color generation
 */
export const getNameHash = (name: string): number => {
  if (!name || name.length === 0) {
    return 0;
  }

  const hashMultiplier = 31;
  const hashModulo = 1000;

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * hashMultiplier + name.charCodeAt(i)) % hashModulo;
  }

  return hash;
};

/**
 * Converts a number to a two-digit hex string
 */
const toHex = (c: number): string => {
  const hex = Math.round(c * 255).toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

/**
 * Converts HSL color values to RGB hex string
 */
const hslToRgb = (h: number, s: number, l: number): string => {
  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      let adjustedT = t;
      if (adjustedT < 0) adjustedT += 1;
      if (adjustedT > 1) adjustedT -= 1;
      if (adjustedT < 1 / 6) return p + (q - p) * 6 * adjustedT;
      if (adjustedT < 1 / 2) return q;
      if (adjustedT < 2 / 3) return p + (q - p) * (2 / 3 - adjustedT) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Generates a color from a name hash using HSL color space
 */
export const getColorFromName = (name: string): string => {
  if (!name || name.length === 0) {
    return "#9E9E9E"; // Default gray
  }

  const hash = getNameHash(name);
  const maxHue = 360;
  const hue = (hash / 1000) * maxHue;
  const saturation = 50;
  const lightness = 60;

  // Convert HSL to RGB
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  return hslToRgb(h, s, l);
};

/**
 * Calculates the luminance of a color
 */
export const getLuminance = (color: string): number => {
  // Remove # if present
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Apply gamma correction
  const [rLinear, gLinear, bLinear] = [r, g, b].map((c) => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  // Calculate relative luminance
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Generates a foreground color with high contrast against the background
 * Returns dark color for light backgrounds and light color for dark backgrounds
 */
export const getForegroundColor = (backgroundColor: string): string => {
  const luminance = getLuminance(backgroundColor);
  const threshold = 0.5;

  return luminance > threshold ? "#1A1A1A" : "#FFFFFF";
};
