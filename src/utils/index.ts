export const formatPhoneNumber = (value: string): string => {
  let clean = value.replace(/\D/g, "");
  if (clean.startsWith("8")) {
    clean = "7" + clean.slice(1);
  }
  clean = clean.slice(0, 11);

  let formatted = "+7";
  if (clean.length > 1) {
    formatted += " (" + clean.slice(1, 4);
  }
  if (clean.length > 4) {
    formatted += ") " + clean.slice(4, 7);
  }
  if (clean.length > 7) {
    formatted += "-" + clean.slice(7, 9);
  }
  if (clean.length > 9) {
    formatted += "-" + clean.slice(9);
  }
  return formatted;
};
