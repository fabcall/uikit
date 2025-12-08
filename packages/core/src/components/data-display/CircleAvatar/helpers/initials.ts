/**
 * Generates initials from a name with advanced options
 * Based on the Dart Initials class implementation
 */
export const generateInitials = (
  name: string,
  allowSpecialChars = false,
  keepCase = false,
  length = 2,
): string => {
  if (!name || name.trim().length === 0) {
    return "";
  }

  let nameOrInitials = name;

  // Convert to uppercase if not keeping case
  if (!keepCase) {
    nameOrInitials = nameOrInitials.toUpperCase();
  }

  // Remove special characters if not allowed
  if (!allowSpecialChars) {
    nameOrInitials = nameOrInitials.replace(/[!@#$%^&*(),.?":{}|<>_]/g, "");
  }

  // Trim and remove leading/trailing hyphens
  nameOrInitials = nameOrInitials.trim().replace(/^-+|-+$/g, "");

  // Split by spaces or hyphens
  const names = nameOrInitials
    .split(/[ -]/)
    .filter((element) => element.length > 0);

  if (names.length === 0) {
    return "";
  }

  if (names.length === 1) {
    // For single name, return only the first character
    return names[0].charAt(0);
  }

  // Generate initials from multiple names
  const buffer: string[] = [];
  let assignedNames = 0;
  let start = 0;

  for (let i = 0; i < length; i++) {
    let index = i;

    // Use last name for the last initial if needed
    if ((index === length - 1 && index > 0) || index > names.length - 1) {
      index = names.length - 1;
    }

    if (assignedNames >= names.length) {
      start++;
    }

    const end = start + 1;
    if (names[index] && names[index].length >= end) {
      buffer.push(names[index].substring(start, end));
    }

    assignedNames++;
  }

  const initials = buffer.join("");
  return initials.substring(0, Math.min(length, initials.length));
};
