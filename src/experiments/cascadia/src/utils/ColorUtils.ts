export class ColorUtils {
  static hexToRgb(hex: number): { r: number; g: number; b: number } {
    const r = (hex >> 16) & 0xff;
    const g = (hex >> 8) & 0xff;
    const b = hex & 0xff;
    return { r: r / 255, g: g / 255, b: b / 255 };
  }

  static rgbToHex(r: number, g: number, b: number): number {
    return ((r * 255) << 16) | ((g * 255) << 8) | (b * 255);
  }

  static lerpColor(color1: number, color2: number, t: number): number {
    const c1 = this.hexToRgb(color1);
    const c2 = this.hexToRgb(color2);
    const r = c1.r + (c2.r - c1.r) * t;
    const g = c1.g + (c2.g - c1.g) * t;
    const b = c1.b + (c2.b - c1.b) * t;
    return this.rgbToHex(r, g, b);
  }
}