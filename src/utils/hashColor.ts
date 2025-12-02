function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return hash;
}
export function stringToColor(
  str: string,
  variant: "light" | "dark" = "light",
) {
  const hash = hashString(str);
  const hue = Math.abs(hash) % 360;

  if (variant === "dark") {
    return `hsl(${hue}, 70%, 40%)`;
  }

  return `hsl(${hue}, 70%, 70%)`;
}
