export function linearGradient(
  color: string,
  colorState: string,
  angle: number = 310
) {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}
