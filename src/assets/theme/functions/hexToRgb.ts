import chroma from 'chroma-js';

export function hexToRgb(color: string) {
  return chroma(color).rgb().join(', ');
}
