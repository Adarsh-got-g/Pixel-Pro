/**
 * Utility to generate valid Windows .ICO multi-resolution icon binary files
 * and rasterize SVG/Canvas icons to PNG for download.
 */

// Draw simplified AI Pixel Pro icon directly onto an HTML Canvas at exact resolution
export function renderAppIconToCanvas(
  canvas: HTMLCanvasElement,
  size: number,
  transparentBg = false
): void {
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, size, size);

  const scale = size / 256;
  ctx.save();
  ctx.scale(scale, scale);

  // Background squircle
  if (!transparentBg) {
    const bgGrad = ctx.createLinearGradient(0, 0, 256, 256);
    bgGrad.addColorStop(0, '#0B122C');
    bgGrad.addColorStop(0.5, '#080D20');
    bgGrad.addColorStop(1, '#040714');

    ctx.fillStyle = bgGrad;
    roundRect(ctx, 6, 6, 244, 244, 54);
    ctx.fill();

    // Neon border
    const borderGrad = ctx.createLinearGradient(0, 0, 256, 256);
    borderGrad.addColorStop(0, '#00F0FF');
    borderGrad.addColorStop(0.3, '#00C8FF');
    borderGrad.addColorStop(0.7, '#A855F7');
    borderGrad.addColorStop(1, '#EC35D8');

    ctx.lineWidth = 4;
    ctx.strokeStyle = borderGrad;
    ctx.stroke();
  }

  // Pixel cubes (upper left)
  const drawCube = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    roundRect(ctx, x, y, 14, 14, 2);
    ctx.fill();
  };

  drawCube(42, 38, '#00F0FF');
  drawCube(24, 56, '#00C8FF');
  drawCube(42, 56, '#A855F7');
  drawCube(24, 74, '#00F0FF');
  drawCube(42, 74, '#EC35D8');
  drawCube(60, 56, '#00C8FF');
  drawCube(60, 74, '#A855F7');
  drawCube(42, 92, '#00C8FF');
  drawCube(24, 92, '#A855F7');
  drawCube(60, 92, '#EC35D8');
  drawCube(42, 110, '#EC35D8');

  // Camera Body
  const camGrad = ctx.createLinearGradient(0, 36, 0, 134);
  camGrad.addColorStop(0, '#1E2A4A');
  camGrad.addColorStop(0.5, '#111B34');
  camGrad.addColorStop(1, '#0A1022');

  // Top prism
  ctx.beginPath();
  ctx.moveTo(100, 48);
  ctx.lineTo(112, 36);
  ctx.lineTo(144, 36);
  ctx.lineTo(156, 48);
  ctx.closePath();
  ctx.fillStyle = camGrad;
  ctx.fill();
  ctx.strokeStyle = '#00C8FF';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Camera housing
  ctx.fillStyle = camGrad;
  roundRect(ctx, 68, 48, 120, 86, 14);
  ctx.fill();
  ctx.strokeStyle = '#2B3A60';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Flash
  ctx.beginPath();
  ctx.arc(166, 62, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = '#00F0FF';
  ctx.fill();

  // Lens Outer Barrel
  ctx.beginPath();
  ctx.arc(128, 92, 38, 0, Math.PI * 2);
  ctx.fillStyle = '#080D20';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#1A2744';
  ctx.stroke();

  // Neon lens rim
  const rimGrad = ctx.createLinearGradient(90, 60, 160, 120);
  rimGrad.addColorStop(0, '#00F0FF');
  rimGrad.addColorStop(0.5, '#A855F7');
  rimGrad.addColorStop(1, '#EC35D8');
  ctx.beginPath();
  ctx.arc(128, 92, 34, 0, Math.PI * 2);
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = rimGrad;
  ctx.stroke();

  // Iris gradient
  const irisGrad = ctx.createRadialGradient(128, 92, 0, 128, 92, 28);
  irisGrad.addColorStop(0, '#0A0F24');
  irisGrad.addColorStop(0.25, '#0D1B42');
  irisGrad.addColorStop(0.5, '#00C8FF');
  irisGrad.addColorStop(0.7, '#EC35D8');
  irisGrad.addColorStop(0.9, '#FFB300');
  irisGrad.addColorStop(1, '#00F0FF');
  ctx.beginPath();
  ctx.arc(128, 92, 28, 0, Math.PI * 2);
  ctx.fillStyle = irisGrad;
  ctx.fill();

  // Inner core
  ctx.beginPath();
  ctx.arc(128, 92, 16, 0, Math.PI * 2);
  ctx.fillStyle = '#040714';
  ctx.fill();
  ctx.strokeStyle = '#00C8FF';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Glint
  ctx.beginPath();
  ctx.arc(124, 88, 4, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Orbital Swoop
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(128, 102, 85, 34, -0.28, 0, Math.PI * 2);
  const orbitGrad = ctx.createLinearGradient(40, 140, 220, 60);
  orbitGrad.addColorStop(0, '#FFA600');
  orbitGrad.addColorStop(0.3, '#EC35D8');
  orbitGrad.addColorStop(0.7, '#A855F7');
  orbitGrad.addColorStop(1, '#00F0FF');
  ctx.strokeStyle = orbitGrad;
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.restore();

  // Monogram "AI"
  ctx.save();
  ctx.translate(128, 184);
  const textGrad = ctx.createLinearGradient(0, -38, 0, 30);
  textGrad.addColorStop(0, '#FFFFFF');
  textGrad.addColorStop(0.6, '#E2F4FF');
  textGrad.addColorStop(1, '#8AD6FF');

  // Letter A
  ctx.beginPath();
  ctx.moveTo(-48, 30);
  ctx.lineTo(-22, -38);
  ctx.lineTo(-4, -38);
  ctx.lineTo(22, 30);
  ctx.lineTo(6, 30);
  ctx.lineTo(0, 12);
  ctx.lineTo(-26, 12);
  ctx.lineTo(-32, 30);
  ctx.closePath();
  ctx.fillStyle = textGrad;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#080D20';
  ctx.stroke();

  // Letter I
  ctx.beginPath();
  ctx.rect(28, -38, 16, 68);
  ctx.fillStyle = textGrad;
  ctx.fill();
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#080D20';
  ctx.stroke();

  // Sparkle in A
  ctx.fillStyle = '#00F0FF';
  ctx.beginPath();
  ctx.arc(-13, -9, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Convert canvas to PNG Uint8Array
async function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Failed to create blob from canvas'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(new Uint8Array(reader.result as ArrayBuffer));
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  });
}

/**
 * Builds a true Windows ICO multi-resolution binary file containing PNG frames:
 * 16x16, 32x32, 48x48, 256x256
 */
export async function generateIcoFile(): Promise<Blob> {
  const sizes = [16, 32, 48, 256];
  const pngBuffers: { size: number; bytes: Uint8Array }[] = [];

  for (const s of sizes) {
    const c = document.createElement('canvas');
    renderAppIconToCanvas(c, s, false);
    const bytes = await canvasToPngBytes(c);
    pngBuffers.push({ size: s, bytes });
  }

  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const totalDirSize = numImages * dirEntrySize;

  let currentOffset = headerSize + totalDirSize;
  const totalFileSize = currentOffset + pngBuffers.reduce((sum, item) => sum + item.bytes.length, 0);

  const buffer = new Uint8Array(totalFileSize);
  const view = new DataView(buffer.buffer);

  // ICONHEADER
  view.setUint16(0, 0, true); // Reserved
  view.setUint16(2, 1, true); // Type: 1 = ICO
  view.setUint16(4, numImages, true); // Number of images

  // ICONDIRENTRY list
  for (let i = 0; i < numImages; i++) {
    const { size, bytes } = pngBuffers[i];
    const entryOffset = headerSize + i * dirEntrySize;

    const wByte = size === 256 ? 0 : size;
    const hByte = size === 256 ? 0 : size;

    view.setUint8(entryOffset + 0, wByte); // Width
    view.setUint8(entryOffset + 1, hByte); // Height
    view.setUint8(entryOffset + 2, 0); // Color count
    view.setUint8(entryOffset + 3, 0); // Reserved
    view.setUint16(entryOffset + 4, 1, true); // Color planes
    view.setUint16(entryOffset + 6, 32, true); // Bits per pixel
    view.setUint32(entryOffset + 8, bytes.length, true); // Size of image data
    view.setUint32(entryOffset + 12, currentOffset, true); // Offset of image data

    // Copy PNG bytes into payload section
    buffer.set(bytes, currentOffset);
    currentOffset += bytes.length;
  }

  return new Blob([buffer], { type: 'image/x-icon' });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
