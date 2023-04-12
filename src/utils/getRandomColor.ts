function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  const baseColor = "#05161E";
  let color = "";
  let tries = 0;
  do {
    color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    tries++;
  } while (tries < 100 && getContrastRatio(baseColor, color) < 4.5);
  return color;
}

function getContrastRatio(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);
  return (
    (Math.max(luminance1, luminance2) + 0.05) /
    (Math.min(luminance1, luminance2) + 0.05)
  );
}

function getLuminance(color: string): number {
  const hex = color.slice(1);
  const rgb = parseInt(hex, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq / 255;
}

export default getRandomColor;
