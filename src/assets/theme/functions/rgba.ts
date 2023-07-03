import { hexToRgb } from './hexToRgb';

export function rgba(color: string, opacity: number) {
  return `rgba(${hexToRgb(color)}, ${opacity})`;
}
