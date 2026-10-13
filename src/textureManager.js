// ==========================================================================
// TEXTURE MANAGER: 2048x1024 CAN WRAP CANVAS & PROCEDURAL CONDENSATION
// ==========================================================================

export class CanTextureManager {
  constructor(onTextureUpdated, onCondensationUpdated) {
    this.onTextureUpdated = onTextureUpdated;
    this.onCondensationUpdated = onCondensationUpdated;

    // 1. Main Texture Canvas (2048 x 1024 wrap)
    this.canvasWidth = 2048;
    this.canvasHeight = 1024;
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx = this.canvas.getContext('2d');

    // 2. Artwork & Graffiti Canvas (persists user drawing)
    this.artCanvas = document.createElement('canvas');
    this.artCanvas.width = this.canvasWidth;
    this.artCanvas.height = this.canvasHeight;
    this.artCtx = this.artCanvas.getContext('2d');

    // 3. Condensation Normal/Bump Canvas
    this.bumpCanvas = document.createElement('canvas');
    this.bumpCanvas.width = 1024;
    this.bumpCanvas.height = 1024;
    this.bumpCtx = this.bumpCanvas.getContext('2d');

    // Default Customization State
    this.state = {
      baseColor: '#E60012',
      accentColor: '#FFFFFF',
      colorwayId: 'original',
      finish: 'gloss',

      // Typography
      customName: 'CREATOR',
      fontStyle: 'script', // 'script' | 'bebas' | 'syne' | 'outfit'
      fontSize: 100,
      fontY: 0,
      fontRot: -90,
      curvedText: true,

      // Edition & Flavor
      flavor: 'original', // 'original' | 'zero' | 'cherry' | 'starlight' | 'lime'
      wavePattern: 'classic', // 'classic' | 'double' | 'geometric' | 'minimal'
      showMemberSeal: true,
      showRecycleSeal: true,

      // Chill & Droplets
      chillLevel: 75,
      dropletIntensity: 65,

      // Drawing Tool
      isDrawing: false,
      brushColor: '#ffffff',
      brushSize: 14
    };

    // Pre-generate droplets
    this.generateCondensationMap();
    this.render();
  }

  updateState(partialState) {
    Object.assign(this.state, partialState);
    if ('chillLevel' in partialState || 'dropletIntensity' in partialState) {
      this.generateCondensationMap();
    }
    this.render();
  }

  // --------------------------------------------------------------------------
  // CONDENSATION PROCEDURAL GENERATOR
  // --------------------------------------------------------------------------
  generateCondensationMap() {
    const w = this.bumpCanvas.width;
    const h = this.bumpCanvas.height;
    const ctx = this.bumpCtx;

    // Neutral gray background for bump map
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, w, h);

    const chill = this.state.chillLevel / 100;
    if (chill <= 0.05) {
      if (this.onCondensationUpdated) this.onCondensationUpdated(this.bumpCanvas, 0);
      return;
    }

    // Micro-droplet noise
    const microCount = Math.floor(450 * chill);
    for (let i = 0; i < microCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 1.5 + Math.random() * 4 * chill;

      const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.7, '#a0a0a0');
      grad.addColorStop(1, '#808080');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Larger bead droplets
    const beadCount = Math.floor(80 * chill);
    for (let i = 0; i < beadCount; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 4 + Math.random() * 8 * chill;

      const grad = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, 0, x, y, r);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.5, '#cccccc');
      grad.addColorStop(0.85, '#555555');
      grad.addColorStop(1, '#808080');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Running drip rivulets
    const dripCount = Math.floor(10 * chill);
    for (let i = 0; i < dripCount; i++) {
      const startX = Math.random() * w;
      const startY = Math.random() * (h * 0.6);
      const len = 40 + Math.random() * 120 * chill;

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2 + Math.random() * 3;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(
        startX + (Math.random() - 0.5) * 10, startY + len * 0.5,
        startX + (Math.random() - 0.5) * 8, startY + len * 0.8,
        startX, startY + len
      );
      ctx.stroke();

      // Tear drop bead at bottom of drip
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(startX, startY + len, ctx.lineWidth * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    const bumpScale = 0.02 + (this.state.dropletIntensity / 100) * 0.08 * chill;
    if (this.onCondensationUpdated) {
      this.onCondensationUpdated(this.bumpCanvas, bumpScale);
    }
  }

  // --------------------------------------------------------------------------
  // MAIN CAN WRAP RENDER PIPELINE
  // --------------------------------------------------------------------------
  render() {
    const ctx = this.ctx;
    const w = this.canvasWidth;
    const h = this.canvasHeight;

    // 1. Base Can Colorway / Gradient
    this.renderBaseBackground(ctx, w, h);

    // 2. Dynamic Ribbon Waves
    this.renderWavePatterns(ctx, w, h);

    // 3. Iconic Background Branding Details
    this.renderInsigniasAndNutrition(ctx, w, h);

    // 4. Personalized Custom Typography ("Share a Can with...")
    this.renderPersonalizedName(ctx, w, h);

    // 5. User Graffiti & Artwork Layer
    ctx.drawImage(this.artCanvas, 0, 0);

    // Notify scene of texture update
    if (this.onTextureUpdated) {
      this.onTextureUpdated(this.canvas);
    }
  }

  renderBaseBackground(ctx, w, h) {
    const baseCol = this.state.baseColor || '#e60012';
    ctx.fillStyle = baseCol;
    ctx.fillRect(0, 0, w, h);

    if (this.state.flavor === 'starlight') {
      // Cosmic Nebula subtle overlay that tints with baseColor
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgba(29, 0, 51, 0.4)');
      grad.addColorStop(0.3, 'rgba(86, 0, 89, 0.25)');
      grad.addColorStop(0.5, 'rgba(255, 0, 127, 0.35)');
      grad.addColorStop(0.7, 'rgba(86, 0, 89, 0.25)');
      grad.addColorStop(1, 'rgba(29, 0, 51, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Starfield dust
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      for (let i = 0; i < 150; i++) {
        const sx = (Math.sin(i * 99) * 0.5 + 0.5) * w;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * h;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }
    } else {
      // Clean studio highlight band — preserves authentic 100% color fidelity
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.12)');
      grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.18)');
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.12)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
  }

  renderWavePatterns(ctx, w, h) {
    const pattern = this.state.wavePattern;
    const accentCol = this.state.accentColor || '#ffffff';

    ctx.save();

    if (pattern === 'classic') {
      // 1. Classic Dynamic Ribbon Wave
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.56);
      ctx.bezierCurveTo(w * 0.22, h * 0.42, w * 0.42, h * 0.76, w * 0.62, h * 0.48);
      ctx.bezierCurveTo(w * 0.70, h * 0.38, w * 0.75, h * 0.46, w * 0.77, h * 0.52);
      ctx.bezierCurveTo(w * 0.74, h * 0.56, w * 0.68, h * 0.48, w * 0.62, h * 0.55);
      ctx.bezierCurveTo(w * 0.42, h * 0.82, w * 0.22, h * 0.50, 0, h * 0.62);
      ctx.closePath();
      ctx.fill();

      // Secondary translucent accent wave
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.64);
      ctx.bezierCurveTo(w * 0.25, h * 0.54, w * 0.46, h * 0.86, w * 0.70, h * 0.58);
      ctx.bezierCurveTo(w * 0.74, h * 0.55, w * 0.75, h * 0.60, w * 0.75, h * 0.63);
      ctx.bezierCurveTo(w * 0.73, h * 0.66, w * 0.46, h * 0.90, 0, h * 0.68);
      ctx.closePath();
      ctx.fill();

    } else if (pattern === 'double') {
      // 2. Harmonic Double Wave
      ctx.strokeStyle = accentCol;
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.45);
      ctx.bezierCurveTo(w * 0.25, h * 0.32, w * 0.50, h * 0.72, w * 0.76, h * 0.50);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.55);
      ctx.bezierCurveTo(w * 0.25, h * 0.42, w * 0.50, h * 0.82, w * 0.76, h * 0.60);
      ctx.stroke();

    } else if (pattern === 'stark-arc') {
      // 3. Iron Man Stark Armor Curves & Arc Reactor Circuit Ribbon
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.38);
      ctx.lineTo(w * 0.28, h * 0.48);
      ctx.lineTo(w * 0.52, h * 0.36);
      ctx.lineTo(w * 0.76, h * 0.52);
      ctx.lineTo(w * 0.76, h * 0.58);
      ctx.lineTo(w * 0.52, h * 0.42);
      ctx.lineTo(w * 0.28, h * 0.54);
      ctx.lineTo(0, h * 0.44);
      ctx.closePath();
      ctx.fill();

      // Lower complementary Stark armor plating band
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.62);
      ctx.lineTo(w * 0.28, h * 0.68);
      ctx.lineTo(w * 0.52, h * 0.56);
      ctx.lineTo(w * 0.75, h * 0.68);
      ctx.lineTo(w * 0.75, h * 0.72);
      ctx.lineTo(w * 0.52, h * 0.60);
      ctx.lineTo(w * 0.28, h * 0.72);
      ctx.lineTo(0, h * 0.66);
      ctx.closePath();
      ctx.fill();

      // Glowing Arc Reactor emblem on can flank
      const arcX = w * 0.30;
      const arcY = h * 0.50;
      ctx.strokeStyle = accentCol;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(arcX, arcY, 44, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(arcX, arcY, 28, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.arc(arcX, arcY, 12, 0, Math.PI * 2);
      ctx.fill();

    } else if (pattern === 'web-lattice') {
      // 4. Spider-Man Fluid Tensile Web Ribbon
      ctx.strokeStyle = accentCol;
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.48);
      ctx.bezierCurveTo(w * 0.20, h * 0.35, w * 0.45, h * 0.68, w * 0.75, h * 0.45);
      ctx.stroke();

      // Web radial strands across can
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3;
      const webCx = w * 0.32;
      const webCy = h * 0.52;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(webCx, webCy);
        ctx.lineTo(webCx + Math.cos(a) * 160, webCy + Math.sin(a) * 160);
        ctx.stroke();
      }
      for (let r = 40; r <= 140; r += 35) {
        ctx.beginPath();
        ctx.arc(webCx, webCy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

    } else if (pattern === 'lightning') {
      // 5. Speed Force / Thor Lightning Bolt Ribbons
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.32);
      ctx.lineTo(w * 0.22, h * 0.36);
      ctx.lineTo(w * 0.18, h * 0.54);
      ctx.lineTo(w * 0.42, h * 0.46);
      ctx.lineTo(w * 0.36, h * 0.68);
      ctx.lineTo(w * 0.62, h * 0.56);
      ctx.lineTo(w * 0.56, h * 0.78);
      ctx.lineTo(w * 0.76, h * 0.64);
      ctx.lineTo(w * 0.72, h * 0.70);
      ctx.lineTo(w * 0.50, h * 0.84);
      ctx.lineTo(w * 0.54, h * 0.64);
      ctx.lineTo(w * 0.32, h * 0.74);
      ctx.lineTo(w * 0.36, h * 0.54);
      ctx.lineTo(0, h * 0.42);
      ctx.closePath();
      ctx.fill();

      // Electric outer energy aura
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 3;
      ctx.stroke();

    } else if (pattern === 'stealth-bat') {
      // 6. Batman Dark Knight Stealth Batwing Chevrons
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.52);
      ctx.lineTo(w * 0.20, h * 0.40);
      ctx.lineTo(w * 0.35, h * 0.58);
      ctx.lineTo(w * 0.50, h * 0.38);
      ctx.lineTo(w * 0.65, h * 0.58);
      ctx.lineTo(w * 0.76, h * 0.46);
      ctx.lineTo(w * 0.76, h * 0.52);
      ctx.lineTo(w * 0.65, h * 0.64);
      ctx.lineTo(w * 0.50, h * 0.44);
      ctx.lineTo(w * 0.35, h * 0.64);
      ctx.lineTo(w * 0.20, h * 0.46);
      ctx.lineTo(0, h * 0.58);
      ctx.closePath();
      ctx.fill();

      // Carbon fiber secondary pinstripe
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 3;
      ctx.stroke();

    } else if (pattern === 'claws') {
      // 7. Wolverine Triple Adamantium Slash Bands
      ctx.fillStyle = accentCol;
      const slashWidth = 24;
      for (let s = 0; s < 3; s++) {
        const offX = s * 65;
        const offY = s * 22;
        ctx.beginPath();
        ctx.moveTo(w * 0.16 + offX, h * 0.26 + offY);
        ctx.lineTo(w * 0.22 + offX + slashWidth, h * 0.24 + offY);
        ctx.lineTo(w * 0.48 + offX + slashWidth, h * 0.82 + offY);
        ctx.lineTo(w * 0.42 + offX, h * 0.84 + offY);
        ctx.closePath();
        ctx.fill();

        // High metallic white gleam inside each slash
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(w * 0.19 + offX, h * 0.26 + offY);
        ctx.lineTo(w * 0.21 + offX, h * 0.26 + offY);
        ctx.lineTo(w * 0.46 + offX, h * 0.82 + offY);
        ctx.lineTo(w * 0.44 + offX, h * 0.82 + offY);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = accentCol;
      }

    } else if (pattern === 'vibranium-weave') {
      // 8. Black Panther Wakandan Kinetic Tribal Chevron Wave
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      for (let cx = 0; cx < w * 0.76; cx += 56) {
        ctx.moveTo(cx, h * 0.46);
        ctx.lineTo(cx + 28, h * 0.55);
        ctx.lineTo(cx + 56, h * 0.46);
        ctx.lineTo(cx + 56, h * 0.52);
        ctx.lineTo(cx + 28, h * 0.61);
        ctx.lineTo(cx, h * 0.52);
      }
      ctx.closePath();
      ctx.fill();

      // Glowing violet energy ring
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 3;
      ctx.stroke();

    } else if (pattern === 'ocean-tide') {
      // 9. Aquaman Rolling Oceanic Tide Crests
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.54);
      ctx.bezierCurveTo(w * 0.15, h * 0.38, w * 0.28, h * 0.70, w * 0.42, h * 0.46);
      ctx.bezierCurveTo(w * 0.55, h * 0.32, w * 0.68, h * 0.66, w * 0.76, h * 0.48);
      ctx.lineTo(w * 0.76, h * 0.55);
      ctx.bezierCurveTo(w * 0.68, h * 0.72, w * 0.55, h * 0.38, w * 0.42, h * 0.52);
      ctx.bezierCurveTo(w * 0.28, h * 0.76, w * 0.15, h * 0.44, 0, h * 0.60);
      ctx.closePath();
      ctx.fill();

      // Frothing ocean spray crest
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 4;
      ctx.stroke();

    } else if (pattern === 'amazon-crest') {
      // 10. Wonder Woman Winged Eagle Armor Crest
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.48);
      ctx.quadraticCurveTo(w * 0.25, h * 0.66, w * 0.38, h * 0.44);
      ctx.quadraticCurveTo(w * 0.52, h * 0.66, w * 0.76, h * 0.48);
      ctx.lineTo(w * 0.76, h * 0.55);
      ctx.quadraticCurveTo(w * 0.52, h * 0.74, w * 0.38, h * 0.52);
      ctx.quadraticCurveTo(w * 0.25, h * 0.74, 0, h * 0.55);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

    } else if (pattern === 'acid-laugh') {
      // 11. The Joker Arkham Chaotic Jagged Laughter Pulse
      ctx.strokeStyle = accentCol;
      ctx.lineWidth = 14;
      ctx.lineJoin = 'miter';
      ctx.beginPath();
      ctx.moveTo(0, h * 0.52);
      const points = [
        [w * 0.08, h * 0.42], [w * 0.16, h * 0.64], [w * 0.24, h * 0.34],
        [w * 0.32, h * 0.68], [w * 0.40, h * 0.38], [w * 0.48, h * 0.62],
        [w * 0.56, h * 0.40], [w * 0.64, h * 0.60], [w * 0.75, h * 0.46]
      ];
      points.forEach(([px, py]) => ctx.lineTo(px, py));
      ctx.stroke();

      // Toxic sparkle outline
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3.5;
      ctx.stroke();

    } else if (pattern === 'geometric') {
      // 12. High-Tech Diamond Cut Geometric Facets
      ctx.fillStyle = accentCol;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.48);
      ctx.lineTo(w * 0.18, h * 0.38);
      ctx.lineTo(w * 0.36, h * 0.58);
      ctx.lineTo(w * 0.54, h * 0.38);
      ctx.lineTo(w * 0.75, h * 0.56);
      ctx.lineTo(w * 0.75, h * 0.63);
      ctx.lineTo(w * 0.54, h * 0.45);
      ctx.lineTo(w * 0.36, h * 0.65);
      ctx.lineTo(w * 0.18, h * 0.45);
      ctx.lineTo(0, h * 0.55);
      ctx.closePath();
      ctx.fill();

      // Tech grid accent dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let x = 40; x < w * 0.72; x += 44) {
        ctx.beginPath();
        ctx.arc(x, h * 0.52 + Math.sin(x * 0.02) * 40, 4, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (pattern === 'minimal') {
      // 13. Minimal Clean Twin Precision Racing Stripes
      ctx.fillStyle = accentCol;
      ctx.fillRect(0, h * 0.48, w * 0.76, 12);
      ctx.fillRect(0, h * 0.54, w * 0.76, 5);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(w * 0.28, h * 0.45, 120, 26);
    }

    ctx.restore();
  }

  renderInsigniasAndNutrition(ctx, w, h) {
    ctx.save();

    // 1. Top Rim Branding Header (Wraps across entire can top)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = '700 22px "Outfit", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('COCA-COLA CREATIONS LAB // LIMITED RELEASE', 100, 90);
    ctx.fillText('EST. 1886 // ATLANTA, GA', w - 480, 90);

    // CRUCIAL: Immediately reset letterSpacing to '0px' so subsequent text doesn't stretch or overlap
    ctx.letterSpacing = '0px';

    // Decorative top thin rule
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(60, 115);
    ctx.lineTo(w - 60, 115);
    ctx.stroke();

    // 2. Flavor Tag Ribbon
    const flavorNames = {
      original: 'ORIGINAL TASTE',
      zero: 'ZERO SUGAR // ZERO CALORIES',
      cherry: 'WILD CHERRY FIZZ',
      starlight: 'STARLIGHT COSMIC DROP',
      lime: 'CRISP NEON LIME ZERO'
    };
    const flavorText = flavorNames[this.state.flavor] || 'ORIGINAL TASTE';

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 32px "Syne", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText(flavorText, 100, 170);

    // 3. Bottom Can Badges (Volume, Member Drop, Recycle Emblem) - Perfectly Spaced with Zero Overlap
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(60, h - 130);
    ctx.lineTo(w - 60, h - 130);
    ctx.stroke();

    ctx.letterSpacing = '0px';

    // Volume badge (Left side of can: x = 100..320)
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 24px "Outfit", sans-serif';
    ctx.fillText('330 mL (11.2 FL OZ)', 100, h - 75);

    // Member Seal (Center-left: x = 640..920)
    if (this.state.showMemberSeal) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.font = '700 18px "Outfit", sans-serif';
      ctx.fillText('★ MEMBER CERTIFIED DROP #2026', 640, h - 75);
    }

    // Recyclable Seal (Center-right: x = 1180..1500)
    if (this.state.showRecycleSeal) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '600 16px "Outfit", sans-serif';
      ctx.fillText('♻ 100% INFINITELY RECYCLABLE ALUMINUM', 1180, h - 75);
    }

    // 4. Authentic Solid Black Nutrition Facts Panel on Back of Can
    // Completely opaque dark panel to eliminate any ribbon bleed or overlap
    const boxW = 320;
    const boxH = 300;
    const boxX = w - 410; // Positioned cleanly on back: x = 1638..1958
    const boxY = Math.round(h * 0.24); // y = 246..546
    const innerX = boxX + 16;
    const innerRightX = boxX + boxW - 16;
    const innerW = boxW - 32; // 288px width for interior content

    // Solid opaque black background box
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(boxX, boxY, boxW, boxH);

    // Clean white boundary border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    // Title: "Nutrition Facts"
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 22px "Outfit", sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText('Nutrition Facts', innerX, boxY + 28);

    // Heavy rule under title
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(innerX, boxY + 34, innerW, 4);

    // Serving size
    ctx.font = '500 12px "Outfit", sans-serif';
    ctx.fillText('Serving size', innerX, boxY + 50);
    ctx.textAlign = 'right';
    ctx.fillText('1 can (330 mL)', innerRightX, boxY + 50);
    ctx.textAlign = 'left';

    // Thin divider
    ctx.fillRect(innerX, boxY + 56, innerW, 1);

    // Amount per serving
    ctx.font = '700 10px "Outfit", sans-serif';
    ctx.fillText('Amount per serving', innerX, boxY + 68);

    // Calories headline
    ctx.font = '900 20px "Outfit", sans-serif';
    ctx.fillText('Calories', innerX, boxY + 90);
    ctx.textAlign = 'right';
    ctx.fillText('140', innerRightX, boxY + 90);
    ctx.textAlign = 'left';

    // Medium divider
    ctx.fillRect(innerX, boxY + 96, innerW, 3);

    // % Daily Value label
    ctx.font = '700 10px "Outfit", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('% Daily Value*', innerRightX, boxY + 110);
    ctx.textAlign = 'left';

    // Thin divider
    ctx.fillRect(innerX, boxY + 114, innerW, 1);

    // Nutrient Table (all strictly within [innerX, innerRightX])
    const drawNutrient = (label, amount, dv, yPos, isBold = true, indent = 0) => {
      ctx.font = isBold ? '700 11px "Outfit", sans-serif' : '400 11px "Outfit", sans-serif';
      ctx.fillText(label, innerX + indent, yPos);
      if (amount) {
        const labelW = ctx.measureText(label).width;
        ctx.font = '400 11px "Outfit", sans-serif';
        ctx.fillText(' ' + amount, innerX + indent + labelW, yPos);
      }
      if (dv) {
        ctx.textAlign = 'right';
        ctx.font = '700 11px "Outfit", sans-serif';
        ctx.fillText(dv, innerRightX, yPos);
        ctx.textAlign = 'left';
      }
    };

    drawNutrient('Total Fat', '0g', '0%', boxY + 128);
    drawNutrient('Sodium', '45mg', '2%', boxY + 143);
    drawNutrient('Total Carbohydrate', '39g', '14%', boxY + 158);
    drawNutrient('Total Sugars', '39g', '', boxY + 173, false, 10);
    drawNutrient('Incl. 39g Added Sugars', '', '78%', boxY + 188, false, 18);
    drawNutrient('Protein', '0g', '', boxY + 203);

    // Divider before barcode
    ctx.fillRect(innerX, boxY + 210, innerW, 2);

    // Barcode Mock (Clean white panel with black bars and centered UPC text)
    const barW = innerW;
    const barH = 58;
    const barX = innerX;
    const barY = boxY + 218;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(barX, barY, barW, barH);

    ctx.fillStyle = '#000000';
    const barMargin = 12;
    const availableBarW = barW - barMargin * 2;
    for (let bx = 0; bx < availableBarW; bx += 3 + (bx % 5)) {
      ctx.fillRect(barX + barMargin + bx, barY + 5, (bx % 3 === 0 ? 3 : 1.5), 36);
    }

    ctx.font = '600 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('0   4 9 0 0 0   0 0 0 4 5   2', barX + barW / 2, barY + 51);
    ctx.textAlign = 'left';

    ctx.restore();
  }

  renderPersonalizedName(ctx, w, h) {
    const text = this.state.customName.toUpperCase() || 'COCA-COLA';
    const centerX = w * 0.5; // Perfectly centered on front face of cylinder
    const centerY = h * 0.52 + this.state.fontY;

    ctx.save();
    ctx.translate(centerX, centerY);

    // Rotation (typically vertical text running along the can)
    ctx.rotate((this.state.fontRot * Math.PI) / 180);

    // Font Family selection
    let fontStr = '';
    const baseScale = this.state.fontSize / 100;

    switch (this.state.fontStyle) {
      case 'script':
        ctx.font = `italic ${Math.floor(130 * baseScale)}px "Pacifico", cursive`;
        break;
      case 'bebas':
        ctx.font = `700 ${Math.floor(160 * baseScale)}px "Bebas Neue", sans-serif`;
        break;
      case 'syne':
        ctx.font = `800 ${Math.floor(110 * baseScale)}px "Syne", sans-serif`;
        break;
      case 'outfit':
      default:
        ctx.font = `800 ${Math.floor(120 * baseScale)}px "Outfit", sans-serif`;
        break;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Drop shadow glow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 8;

    // Fill Personalized Text
    ctx.fillStyle = this.state.accentColor || '#ffffff';
    ctx.fillText(text, 0, 0);

    // Secondary subtle outline
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeText(text, 0, 0);

    ctx.restore();
  }

  // --------------------------------------------------------------------------
  // USER GRAFFITI & STAMPS (CO-CREATION CANVAS)
  // --------------------------------------------------------------------------
  drawStroke(fromX, fromY, toX, toY) {
    const ctx = this.artCtx;
    ctx.strokeStyle = this.state.brushColor;
    ctx.lineWidth = this.state.brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    this.render();
  }

  addSticker(stampType, x = 1024, y = 512) {
    const ctx = this.artCtx;
    ctx.save();
    ctx.translate(x, y);

    const size = 60;

    switch (stampType) {
      case 'lightning':
        ctx.fillStyle = '#ffd166';
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(-size * 0.4, 0);
        ctx.lineTo(size * 0.1, 0);
        ctx.lineTo(-0.2 * size, size);
        ctx.lineTo(size * 0.4, -0.2 * size);
        ctx.lineTo(-0.1 * size, -0.2 * size);
        ctx.closePath();
        ctx.fill();
        break;

      case 'star':
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * size, -Math.sin(((18 + i * 72) * Math.PI) / 180) * size);
          ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (size * 0.45), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (size * 0.45));
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'flame':
        ctx.fillStyle = '#ff5400';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffd000';
        ctx.beginPath();
        ctx.arc(0, size * 0.15, size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'ice':
        ctx.strokeStyle = '#70d6ff';
        ctx.lineWidth = 6;
        for (let a = 0; a < 6; a++) {
          const ang = (a * Math.PI) / 3;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(ang) * size, Math.sin(ang) * size);
          ctx.stroke();
        }
        break;

      case 'smile':
        ctx.fillStyle = '#ffbe0b';
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(-size * 0.25, -size * 0.2, size * 0.1, 0, Math.PI * 2);
        ctx.arc(size * 0.25, -size * 0.2, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.45, 0.2, Math.PI - 0.2);
        ctx.stroke();
        break;

      case 'crown':
        ctx.fillStyle = '#ffb703';
        ctx.beginPath();
        ctx.moveTo(-size * 0.6, size * 0.4);
        ctx.lineTo(-size * 0.7, -size * 0.3);
        ctx.lineTo(-size * 0.25, size * 0.1);
        ctx.lineTo(0, -size * 0.5);
        ctx.lineTo(size * 0.25, size * 0.1);
        ctx.lineTo(size * 0.7, -size * 0.3);
        ctx.lineTo(size * 0.6, size * 0.4);
        ctx.closePath();
        ctx.fill();
        break;

      case 'heart':
        ctx.fillStyle = '#f72585';
        ctx.beginPath();
        ctx.moveTo(0, size * 0.4);
        ctx.bezierCurveTo(-size * 0.7, -size * 0.1, -size * 0.4, -size * 0.7, 0, -size * 0.2);
        ctx.bezierCurveTo(size * 0.4, -size * 0.7, size * 0.7, -size * 0.1, 0, size * 0.4);
        ctx.fill();
        break;

      case 'barcode':
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-size, -size * 0.4, size * 2, size * 0.8);
        ctx.fillStyle = '#000000';
        for (let bx = -size * 0.85; bx < size * 0.85; bx += 6) {
          ctx.fillRect(bx, -size * 0.3, 3, size * 0.6);
        }
        break;
    }

    ctx.restore();
    this.render();
  }

  clearArtwork() {
    this.artCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.render();
  }
}
