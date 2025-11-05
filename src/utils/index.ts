export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  const limitedDigits = digits.slice(0, 11);

  if (limitedDigits.length === 0) return "";
  if (limitedDigits.length <= 1) return `+${limitedDigits}`;
  if (limitedDigits.length <= 4)
    return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1)})`;
  if (limitedDigits.length <= 7)
    return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4)}`;
  if (limitedDigits.length <= 9)
    return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4, 7)}-${limitedDigits.slice(7)}`;
  return `+${limitedDigits.slice(0, 1)} (${limitedDigits.slice(1, 4)}) ${limitedDigits.slice(4, 7)}-${limitedDigits.slice(7, 9)}-${limitedDigits.slice(9)}`;
};
