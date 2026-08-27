import * as THREE from 'three';

export class TextureGenerator {
  public generateGrooveTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#4a4a4a';
    ctx.fillRect(0, 0, 1024, 1024);
    
    const center = 512;
    ctx.lineWidth = 1.2;
    
    for (let r = 260; r < 500; r += 1.8) {
      const val = Math.floor(80 + (Math.random() - 0.5) * 60);
      ctx.strokeStyle = `rgb(${val},${val},${val})`;
      ctx.beginPath();
      ctx.arc(center, center, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  public generateVinylGrooveMap(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 2048;
    const ctx = canvas.getContext('2d')!;
    const imageData = ctx.createImageData(2048, 2048);
    const data = imageData.data;
    const cx = 1024;
    const cy = 1024;
    
    for (let y = 0; y < 2048; y++) {
      for (let x = 0; x < 2048; x++) {
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let grooveDensity = 0.0;
        let trackMask = 0.0;
        
        if (dist > 970 && dist <= 1000) {
          grooveDensity = Math.sin(dist * 12.0) * 0.5 + 0.5;
          trackMask = 0.3;
        } else if (dist >= 280 && dist <= 970) {
          trackMask = 1.0;
          const bandGap = Math.sin(dist * 0.04);
          if (bandGap > 0.92) trackMask = 0.1;
          const micro = Math.sin(dist * 120.0) * 0.5 + 0.5;
          const macro = Math.sin(dist * 20.0) * 0.5 + 0.5;
          grooveDensity = (micro * 0.85 + macro * 0.15) * trackMask;
        } else if (dist >= 330 && dist < 360) {
          grooveDensity = Math.sin(dist * 6.0) * 0.5 + 0.5;
          trackMask = 0.2;
        }
        
        const idx = (y * 2048 + x) * 4;
        data[idx] = Math.floor(grooveDensity * 180);
        data[idx + 1] = Math.floor(trackMask * 180);
        data[idx + 2] = Math.floor((dist / 1024.0) * 180);
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  public generateLabelTexture(brightness: number): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    const baseBrightness = Math.floor(8 + brightness * 20);
    ctx.fillStyle = `rgb(${baseBrightness},${baseBrightness - 1},${baseBrightness - 2})`;
    ctx.fillRect(0, 0, 1024, 1024);
    
    const darkPalette = brightness < 0.3 ? [
      { base: '#1a1816', shadow: '#0a0908', highlight: '#2e2c29' },
      { base: '#141210', shadow: '#080706', highlight: '#24221f' },
      { base: '#1e1c19', shadow: '#0e0d0b', highlight: '#322f2b' },
      { base: '#161412', shadow: '#0a0908', highlight: '#2a2825' }
    ] : [
      { base: '#3a3530', shadow: '#1f1d1a', highlight: '#5a554a' },
      { base: '#4a4540', shadow: '#2a2724', highlight: '#6a655a' },
      { base: '#2a2724', shadow: '#1a1816', highlight: '#4a4540' },
      { base: '#35302a', shadow: '#1c1a16', highlight: '#555048' }
    ];
    
    const rows = 70;
    const cols = 70;
    const cellW = 1024 / cols;
    const cellH = 1024 / rows;
    
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * cellW + cellW / 2 + (Math.random() - 0.5) * (cellW * 0.6);
        const cy = r * cellH + cellH / 2 + (Math.random() - 0.5) * (cellH * 0.6);
        const rx = (cellW * 0.38) + Math.random() * (cellW * 0.22);
        const ry = (cellH * 0.32) + Math.random() * (cellH * 0.22);
        const angle = Math.random() * Math.PI;
        const colorScheme = darkPalette[Math.floor(Math.random() * darkPalette.length)];
        
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        ctx.beginPath();
        ctx.ellipse(1.5, 1.5, rx * 1.05, ry * 1.05, 0, 0, Math.PI * 2);
        ctx.fill();
        
        const grad = ctx.createRadialGradient(-rx * 0.3, -ry * 0.3, rx * 0.1, 0, 0, rx * 1.1);
        grad.addColorStop(0, colorScheme.highlight);
        grad.addColorStop(0.5, colorScheme.base);
        grad.addColorStop(1, colorScheme.shadow);
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }
}