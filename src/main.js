import confetti from 'canvas-confetti';
import { StudioScene } from './scene.js';
import { CanTextureManager } from './textureManager.js';
import { SodaAudioEngine } from './audio.js';
import { CommunityGalleryManager } from './gallery.js';
import { CyborgChatbot } from './cyborgChatbot.js';

// ==========================================================================
// COLORWAY PRESETS
// ==========================================================================
const COLORWAY_PRESETS = [
  {
    id: 'original',
    name: 'Original Taste',
    sub: 'Iconic Crimson',
    base: '#E60012',
    accent: '#FFFFFF',
    finish: 'gloss',
    tab: '#c5c9ce',
    flavor: 'original'
  },
  {
    id: 'zero',
    name: 'Zero Sugar',
    sub: 'Midnight Matte',
    base: '#121214',
    accent: '#F40009',
    finish: 'matte',
    tab: '#F40009',
    flavor: 'zero'
  },
  {
    id: 'diet',
    name: 'Diet Crisp',
    sub: 'Brushed Aluminum',
    base: '#b0b5bc',
    accent: '#E60012',
    finish: 'brushed',
    tab: '#111111',
    flavor: 'zero'
  },
  {
    id: 'starlight',
    name: 'Starlight Galactic',
    sub: 'Cosmic Gradient',
    base: '#3a0055',
    accent: '#ff007f',
    finish: 'gloss',
    tab: '#ffb703',
    flavor: 'starlight'
  },
  {
    id: 'cherry',
    name: 'Wild Cherry',
    sub: 'Bordeaux Fizz',
    base: '#7b001c',
    accent: '#FFFFFF',
    finish: 'gloss',
    tab: '#F40009',
    flavor: 'cherry'
  },
  {
    id: 'lime',
    name: 'Cyber Lime',
    sub: 'Neon Citrus',
    base: '#0b130e',
    accent: '#00e676',
    finish: 'chrome',
    tab: '#00e676',
    flavor: 'lime'
  }
];

class CocaColaCreationsApp {
  constructor() {
    this.dom = {
      container: document.getElementById('webgl-canvas-container'),
      topNav: document.getElementById('top-nav'),
      chipEdition: document.getElementById('chip-edition-name'),
      chipFinish: document.getElementById('chip-finish-name'),

      // Controls
      btnSound: document.getElementById('btn-sound-toggle'),
      btnOpenGallery: document.getElementById('btn-open-gallery'),
      btnCloseGallery: document.getElementById('btn-close-gallery'),
      galleryDrawer: document.getElementById('gallery-drawer'),
      galleryContainer: document.getElementById('community-gallery-container'),

      btnSubmitCreation: document.getElementById('btn-submit-creation'),
      submitModal: document.getElementById('submit-modal'),
      btnCloseModal: document.getElementById('btn-close-modal'),
      modalPreviewImg: document.getElementById('export-preview-img'),
      btnDownloadRender: document.getElementById('btn-download-render'),
      btnConfirmSubmit: document.getElementById('btn-confirm-submit'),
      inputCreator: document.getElementById('input-creator-handle'),
      inputCanTitle: document.getElementById('input-can-title'),

      // Camera & Pop
      camBtns: document.querySelectorAll('.cam-btn[data-cam]'),
      btnToggleSpin: document.getElementById('btn-toggle-spin'),
      btnTogglePop: document.getElementById('btn-toggle-pop'),
      lblPopStatus: document.getElementById('lbl-pop-status'),
      btnTogglePour: document.getElementById('btn-toggle-pour'),
      lblPourStatus: document.getElementById('lbl-pour-status'),

      // Quick Chill
      quickChillSlider: document.getElementById('quick-chill-slider'),
      quickChillVal: document.getElementById('quick-chill-val'),

      // Drawer Tabs
      tabBtns: document.querySelectorAll('.tab-btn'),
      tabPanels: document.querySelectorAll('.tab-panel'),

      // Colorways & Finishes
      presetsContainer: document.getElementById('presets-colorways'),
      inputBaseColor: document.getElementById('input-base-color'),
      labelBaseHex: document.getElementById('label-base-hex'),
      inputAccentColor: document.getElementById('input-accent-color'),
      labelAccentHex: document.getElementById('label-accent-hex'),
      targetBaseColor: document.getElementById('target-base-color'),
      targetAccentColor: document.getElementById('target-accent-color'),
      tagBaseStatus: document.getElementById('tag-base-status'),
      tagAccentStatus: document.getElementById('tag-accent-status'),
      lblScaleTarget: document.getElementById('lbl-scale-target'),
      colorScaleHueSlider: document.getElementById('color-scale-hue-slider'),
      formulaColorSwatches: document.querySelectorAll('.formula-swatch-btn'),
      targetPullTabColor: document.getElementById('target-pulltab-color'),
      inputPullTabColor: document.getElementById('input-pulltab-color'),
      labelPullTabHex: document.getElementById('label-pulltab-hex'),
      pullTabHueSlider: document.getElementById('pulltab-hue-slider'),
      finishBtns: document.querySelectorAll('.finish-btn'),
      pullTabBtns: document.querySelectorAll('.swatch-btn[data-tab-color]'),

      // Typography
      inputCustomName: document.getElementById('input-custom-name'),
      charCount: document.getElementById('char-count'),
      fontCards: document.querySelectorAll('.font-card'),
      sliderFontSize: document.getElementById('slider-font-size'),
      lblFontSize: document.getElementById('lbl-font-size'),
      sliderFontY: document.getElementById('slider-font-y'),
      lblFontY: document.getElementById('lbl-font-y'),
      sliderFontRot: document.getElementById('slider-font-rot'),
      lblFontRot: document.getElementById('lbl-font-rot'),
      checkCurvedText: document.getElementById('check-curved-text'),

      // Flavors & Patterns
      flavorCards: document.querySelectorAll('.flavor-card'),
      patternBtns: document.querySelectorAll('.pattern-btn'),
      checkSealMember: document.getElementById('check-seal-member'),
      checkSealRecycle: document.getElementById('check-seal-recycle'),

      // Art & Drawing
      viewportDragOverlay: document.getElementById('viewport-drag-overlay'),
      wrapperDropzone: document.getElementById('wrapper-dropzone'),
      inputWrapperFile: document.getElementById('input-wrapper-file'),
      btnBrowseWrapper: document.getElementById('btn-browse-wrapper'),
      wrapperControlsPanel: document.getElementById('wrapper-controls-panel'),
      wrapperThumbImg: document.getElementById('wrapper-thumb-img'),
      wrapperFilename: document.getElementById('wrapper-filename'),
      wrapperResolution: document.getElementById('wrapper-resolution'),
      btnRemoveWrapper: document.getElementById('btn-remove-wrapper'),
      wrapperFitPills: document.querySelectorAll('#wrapper-fit-pills .pill-seg-btn'),
      wrapperBlendPills: document.querySelectorAll('#wrapper-blend-pills .pill-seg-btn'),
      sliderWrapperOpacity: document.getElementById('slider-wrapper-opacity'),
      lblWrapperOpacity: document.getElementById('lbl-wrapper-opacity'),
      sliderWrapperScale: document.getElementById('slider-wrapper-scale'),
      lblWrapperScale: document.getElementById('lbl-wrapper-scale'),
      sliderWrapperRot: document.getElementById('slider-wrapper-rot'),
      lblWrapperRot: document.getElementById('lbl-wrapper-rot'),
      sliderWrapperY: document.getElementById('slider-wrapper-y'),
      lblWrapperY: document.getElementById('lbl-wrapper-y'),
      checkHideWaves: document.getElementById('check-hide-waves'),
      checkHideText: document.getElementById('check-hide-text'),
      btnSampleCyber: document.getElementById('btn-sample-cyber'),
      btnSampleSakura: document.getElementById('btn-sample-sakura'),
      btnSampleGraffiti: document.getElementById('btn-sample-graffiti'),
      btnToggleDrawMode: document.getElementById('btn-toggle-draw-mode'),
      drawModeOverlay: document.getElementById('draw-mode-overlay'),
      btnExitDraw: document.getElementById('btn-exit-draw'),
      btnClearDrawing: document.getElementById('btn-clear-drawing'),
      brushDots: document.querySelectorAll('.brush-dot'),
      sliderBrushSize: document.getElementById('slider-brush-size'),
      lblBrushSize: document.getElementById('lbl-brush-size'),
      stickerBtns: document.querySelectorAll('.sticker-btn'),

      // Frost / Condensation
      sliderFrostChill: document.getElementById('slider-frost-chill'),
      lblFrostChill: document.getElementById('lbl-frost-chill'),
      sliderFrostDroplets: document.getElementById('slider-frost-droplets'),
      lblFrostDroplets: document.getElementById('lbl-frost-droplets'),
      sliderFizzSpeed: document.getElementById('slider-fizz-speed'),
      lblFizzSpeed: document.getElementById('lbl-fizz-speed'),
      checkAmbientCubes: document.getElementById('check-ambient-cubes'),

      // Footer
      btnRandomize: document.getElementById('btn-randomize'),
      btnSnapshotQuick: document.getElementById('btn-snapshot-quick'),

      // Toast
      toastBubble: document.getElementById('toast-notification'),
      toastMessage: document.getElementById('toast-message'),
      toastIcon: document.getElementById('toast-icon')
    };

    // 1. Initialize Audio Engine
    this.audio = new SodaAudioEngine();

    // 2. Initialize 3D Scene with Pop-up & Pour Callbacks
    this.scene = new StudioScene(
      this.dom.container,
      (isPopped) => {
        if (this.dom.btnTogglePop) {
          this.dom.btnTogglePop.classList.toggle('popped', isPopped);
          this.dom.lblPopStatus.textContent = isPopped ? 'POPPED (CLOSE)' : 'POP OPEN';
        }
        if (isPopped) {
          this.audio.playCanOpen();
        } else {
          if (this.dom.btnTogglePour) {
            this.dom.btnTogglePour.classList.remove('pouring');
            this.dom.lblPourStatus.textContent = 'POUR COKE';
          }
          this.audio.stopPourSound();
        }
      },
      (isPouring) => {
        if (this.dom.btnTogglePour) {
          this.dom.btnTogglePour.classList.toggle('pouring', isPouring);
          if (isPouring) {
            this.dom.btnTogglePour.classList.remove('full');
            this.dom.lblPourStatus.textContent = 'POURING (0%)';
          } else if (this.scene.pourProgress >= 1.0) {
            this.dom.btnTogglePour.classList.add('full');
            this.dom.lblPourStatus.textContent = 'DISMISS GLASS (OR CLICK IT)';
            this.audio.playGlassFull();
            this.showToast('🥂 Glass 100% Full! Click the glass to send it back to the background.', '🧊');
          } else {
            this.dom.lblPourStatus.textContent = 'POUR COKE';
          }
        }
        if (isPouring) {
          this.audio.startPourSound();
        } else {
          this.audio.stopPourSound();
        }
      },
      (progress, elapsed) => {
        if (this.dom.lblPourStatus && this.scene.isPouring) {
          const pct = Math.min(100, Math.round(progress * 100));
          this.dom.lblPourStatus.textContent = `POURING (${pct}%)`;
        }
      },
      (isPrepping) => {
        if (this.dom.btnTogglePour) {
          this.dom.btnTogglePour.classList.toggle('prepping', isPrepping);
          if (isPrepping) {
            this.dom.btnTogglePour.classList.remove('full');
            this.dom.btnTogglePour.classList.remove('pouring');
            this.dom.btnTogglePour.classList.remove('dismissing');
            this.dom.lblPourStatus.textContent = '🧊 PREPARING GLASS & ICE...';
          }
        }
      },
      (iceIndex) => {
        this.audio.playIceDrop(1500 + iceIndex * 75);
      },
      (isDismissing) => {
        if (this.dom.btnTogglePour) {
          this.dom.btnTogglePour.classList.toggle('dismissing', isDismissing);
          if (isDismissing) {
            this.dom.btnTogglePour.classList.remove('full');
            this.dom.btnTogglePour.classList.remove('prepping');
            this.dom.btnTogglePour.classList.remove('pouring');
            this.dom.lblPourStatus.textContent = '👋 SENDING GLASS BACK...';
            this.audio.playGlassSlideAway();
            this.showToast('👋 Glass dismissed back to background!', '✨');
          } else {
            this.dom.btnTogglePour.classList.remove('full');
            this.dom.btnTogglePour.classList.remove('prepping');
            this.dom.btnTogglePour.classList.remove('pouring');
            this.dom.btnTogglePour.classList.remove('dismissing');
            this.dom.lblPourStatus.textContent = 'POUR COKE';
            this.showToast('Ready for another pour! Click POUR COKE anytime.', '🥤');
          }
        }
      }
    );

    // 3. Initialize Texture Manager
    this.textureMgr = new CanTextureManager(
      (canvas) => this.scene.updateCanTexture(canvas),
      (bumpCanvas, bumpScale) => this.scene.updateCondensationMap(bumpCanvas, bumpScale)
    );

    // 4. Initialize Community Gallery Manager
    this.gallery = new CommunityGalleryManager((config, title) => this.loadConfigFromCommunity(config, title));

    this.COLORWAY_PRESETS = COLORWAY_PRESETS;
    this.initColorways();
    this.bindEvents();
    this.gallery.renderGallery(this.dom.galleryContainer);

    // 5. Initialize Cyborg AI Companion & Can Customizer Chatbot
    this.cyborg = new CyborgChatbot(this);

    // Trigger initial can crack sound after user first interaction
    window.addEventListener('click', () => {
      this.audio.ensureContext();
    }, { once: true });
  }

  initColorways() {
    this.dom.presetsContainer.innerHTML = '';
    COLORWAY_PRESETS.forEach(preset => {
      const card = document.createElement('button');
      card.className = `preset-card ${preset.id === 'original' ? 'active' : ''}`;
      card.dataset.presetId = preset.id;
      card.innerHTML = `
        <span class="preset-swatch" style="background: ${preset.base};"></span>
        <div class="preset-info">
          <strong>${preset.name}</strong>
          <small>${preset.sub}</small>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectColorway(preset);
      });

      this.dom.presetsContainer.appendChild(card);
    });
  }

  setColorFormulaTarget(target) {
    this.activeColorFormulaTarget = target;
    const isBase = target === 'base';
    if (this.dom.targetBaseColor) this.dom.targetBaseColor.classList.toggle('active', isBase);
    if (this.dom.targetAccentColor) this.dom.targetAccentColor.classList.toggle('active', !isBase);
    if (this.dom.tagBaseStatus) this.dom.tagBaseStatus.textContent = isBase ? 'ACTIVE' : 'SELECT';
    if (this.dom.tagAccentStatus) this.dom.tagAccentStatus.textContent = !isBase ? 'ACTIVE' : 'SELECT';
    if (this.dom.lblScaleTarget) this.dom.lblScaleTarget.textContent = isBase ? 'Primary Body' : 'Dynamic Wave Trim';
  }

  hslToHex(h, s = 100, l = 50) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  }

  applyColorFromScale(hex) {
    if (this.activeColorFormulaTarget === 'base') {
      this.dom.inputBaseColor.value = hex;
      this.dom.labelBaseHex.textContent = hex.toUpperCase();
      this.textureMgr.updateState({ baseColor: hex });
      this.scene.setShoulderColor(hex);
      document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    } else {
      this.dom.inputAccentColor.value = hex;
      this.dom.labelAccentHex.textContent = hex.toUpperCase();
      this.textureMgr.updateState({ accentColor: hex });
    }
    this.cyborg?.updateScheme(this.textureMgr.state.baseColor, this.textureMgr.state.accentColor, this.textureMgr.state.finish);
  }

  setPullTab(hex) {
    if (this.dom.inputPullTabColor) this.dom.inputPullTabColor.value = hex;
    if (this.dom.labelPullTabHex) this.dom.labelPullTabHex.textContent = hex.toUpperCase();
    this.scene.setPullTabColor(hex);
    this.dom.pullTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tabColor.toLowerCase() === hex.toLowerCase());
    });
  }

  applyCustomWrapperFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      this.showToast('Please upload a valid image file (PNG, JPG, SVG, WebP)', '⚠️');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.textureMgr.setCustomWrapperImage(img, file.name);

        if (this.dom.wrapperControlsPanel) this.dom.wrapperControlsPanel.classList.remove('hidden');
        if (this.dom.wrapperThumbImg) this.dom.wrapperThumbImg.src = e.target.result;
        if (this.dom.wrapperFilename) this.dom.wrapperFilename.textContent = file.name;
        if (this.dom.wrapperResolution) this.dom.wrapperResolution.textContent = `${img.width} × ${img.height} px`;

        // Switch to Art/Graphics tab
        const tabArtBtn = document.getElementById('tab-btn-graphics');
        if (tabArtBtn) tabArtBtn.click();

        this.audio.playCelebration();
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
        this.showToast(`✨ Wrapped "${file.name}" onto 3D can!`, '🎨');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeCustomWrapper() {
    this.textureMgr.removeCustomWrapper();
    if (this.dom.wrapperControlsPanel) this.dom.wrapperControlsPanel.classList.add('hidden');
    if (this.dom.wrapperThumbImg) this.dom.wrapperThumbImg.src = '';
    if (this.dom.inputWrapperFile) this.dom.inputWrapperFile.value = '';
    this.audio.playClick();
    this.showToast('Custom wrapper removed', '🗑️');
  }

  generateSampleArt(type) {
    const c = document.createElement('canvas');
    c.width = 1024;
    c.height = 1024;
    const ctx = c.getContext('2d');

    if (type === 'cyber') {
      const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
      grad.addColorStop(0, '#0a0017');
      grad.addColorStop(0.5, '#1e0038');
      grad.addColorStop(1, '#001a33');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.strokeStyle = '#00d2ff';
      ctx.lineWidth = 2;
      for (let x = 0; x <= 1024; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }
      for (let y = 0; y <= 1024; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(1024, y);
        ctx.stroke();
      }

      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.arc(512, 400, 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 68px "Syne", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CYBER COKE', 512, 700);
      ctx.font = '800 32px monospace';
      ctx.fillStyle = '#00e676';
      ctx.fillText('LIMITED METAVERSE DROP', 512, 760);

    } else if (type === 'sakura') {
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, '#fff0f5');
      grad.addColorStop(0.5, '#ffd1dc');
      grad.addColorStop(1, '#ff99aa');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.strokeStyle = '#4a2c2a';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(100, 100);
      ctx.bezierCurveTo(300, 250, 500, 200, 800, 450);
      ctx.bezierCurveTo(600, 600, 750, 800, 950, 900);
      ctx.stroke();

      for (let i = 0; i < 90; i++) {
        const px = (Math.sin(i * 123) * 0.5 + 0.5) * 1024;
        const py = (Math.cos(i * 456) * 0.5 + 0.5) * 1024;
        ctx.fillStyle = i % 2 === 0 ? '#ff4081' : '#ffffff';
        ctx.beginPath();
        ctx.ellipse(px, py, 16, 26, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#b30006';
      ctx.font = '900 64px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('桜 SAKURA BLOOM', 512, 540);

    } else {
      ctx.fillStyle = '#ffde59';
      ctx.fillRect(0, 0, 1024, 1024);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      for (let x = 20; x < 1024; x += 40) {
        for (let y = 20; y < 1024; y += 40) {
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = '#ff1493';
      ctx.beginPath();
      ctx.arc(320, 320, 140, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.arc(700, 680, 180, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#111111';
      ctx.font = '900 86px "Bebas Neue", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('STREET POP ART', 512, 480);
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 82px "Bebas Neue", sans-serif';
      ctx.fillText('STREET POP ART', 510, 477);
    }

    const img = new Image();
    img.onload = () => {
      const names = { cyber: 'Cyber-Grid.png', sakura: 'Sakura-Bloom.png', graffiti: 'Pop-Graffiti.png' };
      const name = names[type] || 'sample.png';
      this.textureMgr.setCustomWrapperImage(img, name);
      if (this.dom.wrapperControlsPanel) this.dom.wrapperControlsPanel.classList.remove('hidden');
      if (this.dom.wrapperThumbImg) this.dom.wrapperThumbImg.src = c.toDataURL();
      if (this.dom.wrapperFilename) this.dom.wrapperFilename.textContent = name;
      if (this.dom.wrapperResolution) this.dom.wrapperResolution.textContent = '1024 × 1024 px';

      const tabArtBtn = document.getElementById('tab-btn-graphics');
      if (tabArtBtn) tabArtBtn.click();

      this.audio.playCelebration();
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      this.showToast(`✨ Loaded ${name} sample wrapper!`, '🎨');
    };
    img.src = c.toDataURL();
  }

  selectColorway(preset) {
    this.audio.playClick();
    // Update active UI card
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    const activeCard = document.querySelector(`.preset-card[data-preset-id="${preset.id}"]`);
    if (activeCard) activeCard.classList.add('active');

    // Update form controls
    this.dom.inputBaseColor.value = preset.base;
    this.dom.labelBaseHex.textContent = preset.base.toUpperCase();
    this.dom.inputAccentColor.value = preset.accent;
    this.dom.labelAccentHex.textContent = preset.accent.toUpperCase();

    // Update finish buttons
    this.dom.finishBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.finish === preset.finish);
    });
    this.scene.setCanFinish(preset.finish);

    // Update pull tab & shoulder
    this.setPullTab(preset.tab);
    this.scene.setShoulderColor(preset.base);

    // Update chips
    this.dom.chipEdition.textContent = preset.name.toUpperCase();
    this.dom.chipFinish.textContent = preset.finish.toUpperCase() + ' METALLIC';

    // Update Texture state
    this.textureMgr.updateState({
      baseColor: preset.base,
      accentColor: preset.accent,
      colorwayId: preset.id,
      finish: preset.finish,
      flavor: preset.flavor
    });

    // Sync flavor cards
    this.dom.flavorCards.forEach(c => {
      c.classList.toggle('active', c.dataset.flavor === preset.flavor);
    });

    this.cyborg?.updateScheme(preset.base, preset.accent, preset.finish);
    this.showToast(`Switched to ${preset.name}`, '🎨');
  }

  loadConfigFromCommunity(config, title) {
    this.audio.playCanOpen();
    this.textureMgr.updateState(config);

    this.scene.setCanFinish(config.finish || 'gloss');
    if (config.tabColor) this.setPullTab(config.tabColor);
    if (config.baseColor) this.scene.setShoulderColor(config.baseColor);

    // Sync UI elements
    this.dom.inputBaseColor.value = config.baseColor;
    this.dom.labelBaseHex.textContent = config.baseColor;
    this.dom.inputAccentColor.value = config.accentColor;
    this.dom.labelAccentHex.textContent = config.accentColor;
    this.dom.inputCustomName.value = config.customName || '';
    this.dom.charCount.textContent = `${this.dom.inputCustomName.value.length}/18`;

    this.dom.chipEdition.textContent = title || 'COMMUNITY DROP';
    this.dom.chipFinish.textContent = (config.finish || 'GLOSS').toUpperCase() + ' METALLIC';

    // Sync finish buttons
    if (this.dom.finishBtns) {
      this.dom.finishBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.finish === (config.finish || 'gloss'));
      });
    }

    // Sync pull tab swatch buttons
    if (this.dom.pullTabBtns && config.tabColor) {
      this.dom.pullTabBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tabColor.toLowerCase() === config.tabColor.toLowerCase());
      });
    }

    this.cyborg?.updateScheme(config.baseColor || '#E60012', config.accentColor || '#FFFFFF', config.finish || 'gloss');

    // Sync pattern buttons
    if (this.dom.patternBtns && config.wavePattern) {
      this.dom.patternBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.pattern === config.wavePattern);
      });
    }

    // Sync flavor cards
    if (this.dom.flavorCards && config.flavor) {
      this.dom.flavorCards.forEach(c => {
        c.classList.toggle('active', c.dataset.flavor === config.flavor);
      });
    }

    // Sync font cards
    if (this.dom.fontCards && config.fontStyle) {
      this.dom.fontCards.forEach(c => {
        c.classList.toggle('active', c.dataset.font === config.fontStyle);
      });
    }

    // Close gallery
    this.dom.galleryDrawer.classList.add('hidden');
    this.showToast(`Loaded "${title}" in 3D`, '🚀');

    // Confetti celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 }
    });
  }

  bindEvents() {
    // 1. Navigation & Sound
    this.dom.btnSound.addEventListener('click', () => {
      const on = this.audio.toggleSound();
      this.dom.btnSound.querySelector('.label').textContent = on ? 'SOUND ON' : 'SOUND MUTED';
      this.dom.btnSound.querySelector('.icon').textContent = on ? '🔊' : '🔇';
      this.showToast(on ? 'Sound FX Enabled' : 'Sound FX Muted', on ? '🔊' : '🔇');
    });

    // 2. Community Gallery Drawer
    this.dom.btnOpenGallery.addEventListener('click', () => {
      this.audio.playClick();
      this.dom.galleryDrawer.classList.remove('hidden');
      this.dom.galleryDrawer.setAttribute('aria-hidden', 'false');
    });

    this.dom.btnCloseGallery.addEventListener('click', () => {
      this.audio.playClick();
      this.dom.galleryDrawer.classList.add('hidden');
      this.dom.galleryDrawer.setAttribute('aria-hidden', 'true');
    });

    // Community Gallery Filter Chips
    const filterChips = document.querySelectorAll('.gallery-filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        this.audio.playClick();
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.gallery.setFilter(chip.dataset.filter);
      });
    });

    // 3. Camera Controls
    this.dom.camBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playClick();
        this.dom.camBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.scene.setCameraPreset(btn.dataset.cam);
      });
    });

    this.dom.btnToggleSpin.addEventListener('click', () => {
      this.audio.playClick();
      const spinning = this.scene.toggleAutoRotate();
      this.dom.btnToggleSpin.classList.toggle('active', spinning);
      this.showToast(spinning ? '360° Spin Active' : 'Spin Paused', '↻');
    });

    if (this.dom.btnTogglePop) {
      this.dom.btnTogglePop.addEventListener('click', () => {
        const opened = this.scene.toggleCanPop();
        if (opened) {
          this.audio.playCanOpen();
          this.showToast('💥 Can Popped Open! Crisp Metal Pop & Pressurized Snap', '⚡');
          this.scene.setCameraPreset('top');
          this.dom.camBtns.forEach(b => b.classList.remove('active'));
          document.getElementById('cam-btn-top')?.classList.add('active');
        } else {
          this.audio.playClick();
          this.showToast('Tab Closed', '🔄');
        }
      });
    }

    if (this.dom.btnTogglePour) {
      this.dom.btnTogglePour.addEventListener('click', () => {
        if (this.scene.glassGroup && this.scene.glassGroup.visible && this.scene.pourProgress >= 1.0 && !this.scene.isGlassDismissing) {
          this.scene.dismissGlass();
          return;
        }
        const isStarted = this.scene.togglePour();
        if (isStarted) {
          if (this.scene.cameraRotation.x > 0.6) {
            this.scene.setCameraPreset('hero');
            this.dom.camBtns.forEach(b => b.classList.remove('active'));
            document.getElementById('cam-btn-hero')?.classList.add('active');
          }
          this.showToast('🧊 Glass glides from background & ice rocks drop in (3s)...', '🧊');
        } else {
          this.showToast('Pouring Paused', '⏸️');
        }
      });
    }

    // 4. Quick Chill Dial & Drawer Slider Sync
    const updateChill = (val) => {
      if (this.dom.quickChillSlider) this.dom.quickChillSlider.value = val;
      if (this.dom.sliderFrostChill) this.dom.sliderFrostChill.value = val;
      if (this.dom.quickChillVal) this.dom.quickChillVal.textContent = `${val}%`;
      if (this.dom.lblFrostChill) this.dom.lblFrostChill.textContent = val > 70 ? `Ice Cold (${val}%)` : val > 30 ? `Chilled (${val}%)` : `Room Temp (${val}%)`;
      this.textureMgr.updateState({ chillLevel: parseInt(val, 10) });
    };

    if (this.dom.quickChillSlider) {
      this.dom.quickChillSlider.addEventListener('input', (e) => {
        updateChill(e.target.value);
      });
    }

    if (this.dom.sliderFrostChill) {
      this.dom.sliderFrostChill.addEventListener('input', (e) => {
        updateChill(e.target.value);
      });
    }

    // 5. Drawer Tab Switcher
    this.dom.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playClick();
        const tabId = btn.dataset.tab;

        this.dom.tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        this.dom.tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById(tabId).classList.add('active');
      });
    });

    // 6. Custom Colors
    this.dom.inputBaseColor.addEventListener('input', (e) => {
      const hex = e.target.value;
      this.dom.labelBaseHex.textContent = hex.toUpperCase();
      this.textureMgr.updateState({ baseColor: hex });
      this.scene.setShoulderColor(hex);
      document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    });

    this.dom.inputAccentColor.addEventListener('input', (e) => {
      const hex = e.target.value;
      this.dom.labelAccentHex.textContent = hex.toUpperCase();
      this.textureMgr.updateState({ accentColor: hex });
    });

    // Target Selection for Color Scale (Primary Body vs Wave Trim)
    if (this.dom.targetBaseColor) {
      this.dom.targetBaseColor.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          this.setColorFormulaTarget('base');
          this.audio.playClick();
        }
      });
      this.dom.inputBaseColor.addEventListener('focus', () => {
        this.setColorFormulaTarget('base');
      });
    }

    if (this.dom.targetAccentColor) {
      this.dom.targetAccentColor.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          this.setColorFormulaTarget('accent');
          this.audio.playClick();
        }
      });
      this.dom.inputAccentColor.addEventListener('focus', () => {
        this.setColorFormulaTarget('accent');
      });
    }

    // Continuous Gradient Hue Spectrum Slider
    if (this.dom.colorScaleHueSlider) {
      this.dom.colorScaleHueSlider.addEventListener('input', (e) => {
        const hue = parseFloat(e.target.value);
        const hex = this.hslToHex(hue, 100, 50);
        this.applyColorFromScale(hex);
      });
    }

    // Quick Color Scale Swatches
    if (this.dom.formulaColorSwatches) {
      this.dom.formulaColorSwatches.forEach(btn => {
        btn.addEventListener('click', () => {
          this.audio.playClick();
          const hex = btn.dataset.color;
          this.applyColorFromScale(hex);
        });
      });
    }

    // 7. Material Finish Options
    this.dom.finishBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playClick();
        this.dom.finishBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const finish = btn.dataset.finish;
        this.scene.setCanFinish(finish);
        this.textureMgr.updateState({ finish: finish });
        this.dom.chipFinish.textContent = finish.toUpperCase() + ' METALLIC';
        this.cyborg?.updateScheme(this.textureMgr.state.baseColor, this.textureMgr.state.accentColor, finish);
      });
    });

    // 8. Pull Tab Color Options & Spectrum Scale
    if (this.dom.inputPullTabColor) {
      this.dom.inputPullTabColor.addEventListener('input', (e) => {
        this.setPullTab(e.target.value);
      });
    }

    if (this.dom.pullTabHueSlider) {
      this.dom.pullTabHueSlider.addEventListener('input', (e) => {
        const hue = parseFloat(e.target.value);
        const hex = this.hslToHex(hue, 100, 50);
        this.setPullTab(hex);
      });
    }

    this.dom.pullTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playClick();
        const col = btn.dataset.tabColor;
        this.setPullTab(col);
      });
    });

    // 9. Typography Controls
    this.dom.inputCustomName.addEventListener('input', (e) => {
      const val = e.target.value;
      this.dom.charCount.textContent = `${val.length}/18`;
      this.textureMgr.updateState({ customName: val });
    });

    this.dom.fontCards.forEach(card => {
      card.addEventListener('click', () => {
        this.audio.playClick();
        this.dom.fontCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.textureMgr.updateState({ fontStyle: card.dataset.font });
      });
    });

    this.dom.sliderFontSize.addEventListener('input', (e) => {
      this.dom.lblFontSize.textContent = `${e.target.value}%`;
      this.textureMgr.updateState({ fontSize: parseInt(e.target.value, 10) });
    });

    this.dom.sliderFontY.addEventListener('input', (e) => {
      this.dom.lblFontY.textContent = e.target.value === '0' ? 'Center' : `${e.target.value}px`;
      this.textureMgr.updateState({ fontY: parseInt(e.target.value, 10) });
    });

    this.dom.sliderFontRot.addEventListener('input', (e) => {
      this.dom.lblFontRot.textContent = `${e.target.value}°`;
      this.textureMgr.updateState({ fontRot: parseInt(e.target.value, 10) });
    });

    // 10. Flavor Edition Badges & Patterns
    this.dom.flavorCards.forEach(card => {
      card.addEventListener('click', () => {
        this.audio.playClick();
        this.dom.flavorCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.textureMgr.updateState({ flavor: card.dataset.flavor });
      });
    });

    this.dom.patternBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playClick();
        this.dom.patternBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.textureMgr.updateState({ wavePattern: btn.dataset.pattern });
      });
    });

    this.dom.checkSealMember.addEventListener('change', (e) => {
      this.textureMgr.updateState({ showMemberSeal: e.target.checked });
    });

    this.dom.checkSealRecycle.addEventListener('change', (e) => {
      this.textureMgr.updateState({ showRecycleSeal: e.target.checked });
    });

    // 11. Custom Image Wrapper & Drag-and-Drop
    let dragCounter = 0;
    window.addEventListener('dragenter', (e) => {
      e.preventDefault();
      dragCounter++;
      if (this.dom.viewportDragOverlay) this.dom.viewportDragOverlay.classList.remove('hidden');
    });

    window.addEventListener('dragleave', (e) => {
      e.preventDefault();
      dragCounter--;
      if (dragCounter <= 0) {
        dragCounter = 0;
        if (this.dom.viewportDragOverlay) this.dom.viewportDragOverlay.classList.add('hidden');
      }
    });

    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();
      dragCounter = 0;
      if (this.dom.viewportDragOverlay) this.dom.viewportDragOverlay.classList.add('hidden');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.applyCustomWrapperFile(e.dataTransfer.files[0]);
      }
    });

    if (this.dom.wrapperDropzone) {
      this.dom.wrapperDropzone.addEventListener('click', (e) => {
        if (e.target !== this.dom.inputWrapperFile) {
          this.dom.inputWrapperFile.click();
        }
      });

      this.dom.wrapperDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dom.wrapperDropzone.classList.add('drag-active');
      });

      this.dom.wrapperDropzone.addEventListener('dragleave', () => {
        this.dom.wrapperDropzone.classList.remove('drag-active');
      });

      this.dom.wrapperDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dom.wrapperDropzone.classList.remove('drag-active');
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.applyCustomWrapperFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (this.dom.btnBrowseWrapper && this.dom.inputWrapperFile) {
      this.dom.btnBrowseWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dom.inputWrapperFile.click();
      });
    }

    if (this.dom.inputWrapperFile) {
      this.dom.inputWrapperFile.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          this.applyCustomWrapperFile(e.target.files[0]);
        }
      });
    }

    if (this.dom.btnRemoveWrapper) {
      this.dom.btnRemoveWrapper.addEventListener('click', () => {
        this.removeCustomWrapper();
      });
    }

    // Sample Art Presets
    if (this.dom.btnSampleCyber) {
      this.dom.btnSampleCyber.addEventListener('click', () => this.generateSampleArt('cyber'));
    }
    if (this.dom.btnSampleSakura) {
      this.dom.btnSampleSakura.addEventListener('click', () => this.generateSampleArt('sakura'));
    }
    if (this.dom.btnSampleGraffiti) {
      this.dom.btnSampleGraffiti.addEventListener('click', () => this.generateSampleArt('graffiti'));
    }

    // Wrapper Mode & Blend Pills
    if (this.dom.wrapperFitPills) {
      this.dom.wrapperFitPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.audio.playClick();
          this.dom.wrapperFitPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.textureMgr.updateCustomWrapper({ fit: pill.dataset.fit });
        });
      });
    }

    if (this.dom.wrapperBlendPills) {
      this.dom.wrapperBlendPills.forEach(pill => {
        pill.addEventListener('click', () => {
          this.audio.playClick();
          this.dom.wrapperBlendPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.textureMgr.updateCustomWrapper({ blend: pill.dataset.blend });
        });
      });
    }

    // Wrapper Sliders
    if (this.dom.sliderWrapperOpacity) {
      this.dom.sliderWrapperOpacity.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.dom.lblWrapperOpacity.textContent = `${val}%`;
        this.textureMgr.updateCustomWrapper({ opacity: val / 100 });
      });
    }

    if (this.dom.sliderWrapperScale) {
      this.dom.sliderWrapperScale.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.dom.lblWrapperScale.textContent = `${val}%`;
        this.textureMgr.updateCustomWrapper({ scale: val / 100 });
      });
    }

    if (this.dom.sliderWrapperRot) {
      this.dom.sliderWrapperRot.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.dom.lblWrapperRot.textContent = `${val}°`;
        this.textureMgr.updateCustomWrapper({ rotation: val });
      });
    }

    if (this.dom.sliderWrapperY) {
      this.dom.sliderWrapperY.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.dom.lblWrapperY.textContent = `${val}px`;
        this.textureMgr.updateCustomWrapper({ verticalOffset: val });
      });
    }

    if (this.dom.checkHideWaves) {
      this.dom.checkHideWaves.addEventListener('change', (e) => {
        this.textureMgr.updateCustomWrapper({ hideWaves: e.target.checked });
      });
    }

    if (this.dom.checkHideText) {
      this.dom.checkHideText.addEventListener('change', (e) => {
        this.textureMgr.updateCustomWrapper({ hideText: e.target.checked });
      });
    }

    // 12. Artwork, Stamps & Drawing Tool
    let isPainting = false;
    this.dom.btnToggleDrawMode.addEventListener('click', () => {
      this.audio.playClick();
      isPainting = !isPainting;
      this.dom.btnToggleDrawMode.classList.toggle('active', isPainting);
      this.dom.drawModeOverlay.classList.toggle('hidden', !isPainting);

      if (isPainting) {
        this.showToast('Painting Active: Click or drag on the viewport', '🖌️');
        // Orient front facing
        this.scene.setCameraPreset('hero');
      }
    });

    this.dom.btnExitDraw.addEventListener('click', () => {
      isPainting = false;
      this.dom.btnToggleDrawMode.classList.remove('active');
      this.dom.drawModeOverlay.classList.add('hidden');
    });

    this.dom.btnClearDrawing.addEventListener('click', () => {
      this.audio.playClick();
      this.textureMgr.clearArtwork();
      this.showToast('Cleared custom artwork', '🧹');
    });

    this.dom.brushDots.forEach(dot => {
      dot.addEventListener('click', () => {
        this.dom.brushDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        this.textureMgr.updateState({ brushColor: dot.dataset.brushColor });
      });
    });

    this.dom.sliderBrushSize.addEventListener('input', (e) => {
      this.dom.lblBrushSize.textContent = `${e.target.value}px`;
      this.textureMgr.updateState({ brushSize: parseInt(e.target.value, 10) });
    });

    // Sticker Stamps
    this.dom.stickerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.audio.playClick();
        const stamp = btn.dataset.stamp;
        // Place sticker at center front
        const rx = 850 + Math.random() * 340;
        const ry = 420 + Math.random() * 260;
        this.textureMgr.addSticker(stamp, rx, ry);
        this.showToast(`Stamped ${stamp.toUpperCase()}`, '⭐');
      });
    });

    // Direct draw on 3D Viewport when Draw Mode is active
    let prevPoint = null;
    this.dom.container.addEventListener('mousedown', (e) => {
      if (!isPainting) return;
      prevPoint = this.mapScreenToCanvasCoords(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      prevPoint = null;
    });

    this.dom.container.addEventListener('mousemove', (e) => {
      if (!isPainting || !prevPoint) return;
      const currentPoint = this.mapScreenToCanvasCoords(e.clientX, e.clientY);
      if (currentPoint) {
        this.textureMgr.drawStroke(prevPoint.x, prevPoint.y, currentPoint.x, currentPoint.y);
        prevPoint = currentPoint;
      }
    });

    // 12. Droplets & Carbonation Sliders
    this.dom.sliderFrostDroplets.addEventListener('input', (e) => {
      this.dom.lblFrostDroplets.textContent = `${e.target.value}%`;
      this.textureMgr.updateState({ dropletIntensity: parseInt(e.target.value, 10) });
    });

    this.dom.sliderFizzSpeed.addEventListener('input', (e) => {
      const speed = parseInt(e.target.value, 10) / 50;
      this.dom.lblFizzSpeed.textContent = e.target.value > 70 ? 'Intense' : e.target.value > 20 ? 'Active' : 'Off';
      this.scene.setAtmosphereSettings(this.dom.checkAmbientCubes.checked, speed);
    });

    this.dom.checkAmbientCubes.addEventListener('change', (e) => {
      this.scene.setAtmosphereSettings(e.target.checked, parseInt(this.dom.sliderFizzSpeed.value, 10) / 50);
    });

    // 13. Randomize Inspiration Button
    this.dom.btnRandomize.addEventListener('click', () => {
      const randomPreset = COLORWAY_PRESETS[Math.floor(Math.random() * COLORWAY_PRESETS.length)];
      this.selectColorway(randomPreset);

      const words = ['PULSE', 'FUSION', 'NEBULA', 'VELOCITY', 'AURORA', 'GLITCH', 'ELEVATE', 'CHILL', 'HYPER', 'ZEN'];
      const randomWord = words[Math.floor(Math.random() * words.length)];
      this.dom.inputCustomName.value = randomWord;
      this.dom.charCount.textContent = `${randomWord.length}/18`;
      this.textureMgr.updateState({ customName: randomWord });

      this.audio.playCanOpen();
      this.showToast(`Surprise Drop Generated: ${randomWord}`, '🎲');
    });

    // 14. Quick Snapshot 4K
    this.dom.btnSnapshotQuick.addEventListener('click', () => {
      this.audio.playCanOpen();
      const snapshotUrl = this.scene.takeSnapshot(2560, 1440);
      const link = document.createElement('a');
      link.download = `coca-cola-creation-${this.dom.inputCustomName.value.toLowerCase() || 'custom'}.png`;
      link.href = snapshotUrl;
      link.click();

      this.showToast('4K Render Downloaded!', '📸');
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
    });

    // 15. Export & Submit Modal
    this.dom.btnSubmitCreation.addEventListener('click', () => {
      this.audio.playCanOpen();
      const snapshotUrl = this.scene.takeSnapshot(1920, 1080);
      this.dom.modalPreviewImg.src = snapshotUrl;
      this.dom.inputCanTitle.value = `${this.dom.inputCustomName.value || 'CREATION'} EDITION`;

      this.dom.submitModal.classList.remove('hidden');
      this.dom.submitModal.setAttribute('aria-hidden', 'false');
    });

    this.dom.btnCloseModal.addEventListener('click', () => {
      this.audio.playClick();
      this.dom.submitModal.classList.add('hidden');
      this.dom.submitModal.setAttribute('aria-hidden', 'true');
    });

    this.dom.btnDownloadRender.addEventListener('click', () => {
      this.audio.playClick();
      const link = document.createElement('a');
      link.download = `coca-cola-creation-${this.dom.inputCanTitle.value.toLowerCase() || 'custom'}.png`;
      link.href = this.dom.modalPreviewImg.src;
      link.click();
      this.showToast('Poster Saved to Downloads', '💾');
    });

    this.dom.btnConfirmSubmit.addEventListener('click', () => {
      const handle = this.dom.inputCreator.value.trim() || 'AnonymousCreator';
      const title = this.dom.inputCanTitle.value.trim() || 'Untitled Drop';

      this.gallery.addCreation(title, handle, this.textureMgr.state, this.dom.modalPreviewImg.src);
      this.gallery.renderGallery(this.dom.galleryContainer);

      this.dom.submitModal.classList.add('hidden');
      this.audio.playCanOpen();

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });

      this.showToast(`🎉 "${title}" submitted to Community Drops!`, '🚀');
    });
  }

  // Maps mouse position on screen to coordinate space on the wrap canvas
  mapScreenToCanvasCoords(clientX, clientY) {
    const rect = this.dom.container.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;

    // Centered front area of can
    const canvasX = 700 + relX * 650;
    const canvasY = 200 + relY * 620;

    return { x: canvasX, y: canvasY };
  }

  showToast(message, icon = '✨') {
    this.dom.toastMessage.textContent = message;
    this.dom.toastIcon.textContent = icon;
    this.dom.toastBubble.classList.remove('hidden');

    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.dom.toastBubble.classList.add('hidden');
    }, 2800);
  }
}

// Bootstrapping
window.addEventListener('DOMContentLoaded', () => {
  window.__app = new CocaColaCreationsApp();
});
