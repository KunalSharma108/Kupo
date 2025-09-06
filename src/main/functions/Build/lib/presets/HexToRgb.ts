export function hexToRgba(hex: string) {
  hex = hex.replace(/^#/, "");

  if (hex.length === 6) hex += "ff";

  const bigint = parseInt(hex, 16);
  const r = (bigint >> 24) & 255;
  const g = (bigint >> 16) & 255;
  const b = (bigint >> 8) & 255;
  const a = (bigint & 255) / 255;

  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
}

