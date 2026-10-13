// ==========================================================================
// COMMUNITY GALLERY: SHOWCASE, VOTING, & DESIGN PRESETS (MARVEL, DC, ORIGINALS)
// ==========================================================================

export const INITIAL_COMMUNITY_DROPS = [
  // ── MARVEL UNIVERSE DROPS ──
  {
    id: 'drop-marvel-ironman',
    category: 'marvel',
    badge: 'MARVEL',
    title: 'IRON MAN — STARK SUIT',
    creator: 'Tony_Stark',
    votes: 3840,
    hasVoted: false,
    heroIcon: 'arc',
    config: {
      baseColor: '#a60a14',
      accentColor: '#ffd700',
      colorwayId: 'cherry',
      finish: 'chrome',
      tabColor: '#ffd700',
      customName: 'STARK 3000',
      fontStyle: 'syne',
      fontSize: 115,
      fontY: 0,
      fontRot: -90,
      flavor: 'cherry',
      wavePattern: 'stark-arc',
      chillLevel: 75,
      dropletIntensity: 60
    }
  },
  {
    id: 'drop-marvel-spiderman',
    category: 'marvel',
    badge: 'MARVEL',
    title: 'SPIDER-MAN — WEB SLINGER',
    creator: 'Peter_Parker',
    votes: 4120,
    hasVoted: false,
    heroIcon: 'web',
    config: {
      baseColor: '#cf1020',
      accentColor: '#0052cc',
      colorwayId: 'original',
      finish: 'gloss',
      tabColor: '#0052cc',
      customName: 'QUEENS HERO',
      fontStyle: 'bebas',
      fontSize: 120,
      fontY: 0,
      fontRot: -90,
      flavor: 'original',
      wavePattern: 'web-lattice',
      chillLevel: 80,
      dropletIntensity: 75
    }
  },
  {
    id: 'drop-marvel-wolverine',
    category: 'marvel',
    badge: 'MARVEL',
    title: 'WOLVERINE — ADAMANTIUM',
    creator: 'Logan_WeaponX',
    votes: 3260,
    hasVoted: false,
    heroIcon: 'claws',
    config: {
      baseColor: '#f7b500',
      accentColor: '#002f6c',
      colorwayId: 'lime',
      finish: 'brushed',
      tabColor: '#002f6c',
      customName: 'SNIKT!',
      fontStyle: 'bebas',
      fontSize: 130,
      fontY: 0,
      fontRot: -90,
      flavor: 'lime',
      wavePattern: 'claws',
      chillLevel: 90,
      dropletIntensity: 85
    }
  },
  {
    id: 'drop-marvel-panther',
    category: 'marvel',
    badge: 'MARVEL',
    title: 'BLACK PANTHER — VIBRANIUM',
    creator: 'Shuri_Wakanda',
    votes: 3450,
    hasVoted: false,
    heroIcon: 'vibranium',
    config: {
      baseColor: '#0e0e14',
      accentColor: '#b042ff',
      colorwayId: 'zero',
      finish: 'matte',
      tabColor: '#b042ff',
      customName: 'WAKANDA 4EVER',
      fontStyle: 'syne',
      fontSize: 105,
      fontY: 0,
      fontRot: -90,
      flavor: 'zero',
      wavePattern: 'vibranium-weave',
      chillLevel: 75,
      dropletIntensity: 65
    }
  },
  {
    id: 'drop-marvel-thor',
    category: 'marvel',
    badge: 'MARVEL',
    title: 'THOR — LIGHTNING STORM',
    creator: 'Odinson_Brew',
    votes: 2790,
    hasVoted: false,
    heroIcon: 'lightning',
    config: {
      baseColor: '#202634',
      accentColor: '#00e1ff',
      colorwayId: 'starlight',
      finish: 'chrome',
      tabColor: '#00e1ff',
      customName: 'MJOLNIR',
      fontStyle: 'syne',
      fontSize: 115,
      fontY: 0,
      fontRot: -90,
      flavor: 'starlight',
      wavePattern: 'lightning',
      chillLevel: 85,
      dropletIntensity: 80
    }
  },

  // ── DC COMICS DROPS ──
  {
    id: 'drop-dc-batman',
    category: 'dc',
    badge: 'DC COMICS',
    title: 'BATMAN — DARK KNIGHT',
    creator: 'Wayne_Enterprises',
    votes: 4350,
    hasVoted: false,
    heroIcon: 'bat',
    config: {
      baseColor: '#0a0b0e',
      accentColor: '#f59e0b',
      colorwayId: 'zero',
      finish: 'matte',
      tabColor: '#f59e0b',
      customName: 'DARK KNIGHT',
      fontStyle: 'bebas',
      fontSize: 120,
      fontY: 0,
      fontRot: -90,
      flavor: 'zero',
      wavePattern: 'stealth-bat',
      chillLevel: 85,
      dropletIntensity: 70
    }
  },
  {
    id: 'drop-dc-superman',
    category: 'dc',
    badge: 'DC COMICS',
    title: 'SUPERMAN — MAN OF STEEL',
    creator: 'Kal_El_Metropolis',
    votes: 3980,
    hasVoted: false,
    heroIcon: 'shield',
    config: {
      baseColor: '#06357a',
      accentColor: '#e02424',
      colorwayId: 'original',
      finish: 'gloss',
      tabColor: '#e02424',
      customName: 'METROPOLIS',
      fontStyle: 'syne',
      fontSize: 110,
      fontY: 0,
      fontRot: -90,
      flavor: 'original',
      wavePattern: 'double',
      chillLevel: 75,
      dropletIntensity: 65
    }
  },
  {
    id: 'drop-dc-joker',
    category: 'dc',
    badge: 'DC COMICS',
    title: 'THE JOKER — ARKHAM SMILE',
    creator: 'ClownPrince_Gotham',
    votes: 3820,
    hasVoted: false,
    heroIcon: 'smile',
    config: {
      baseColor: '#4c1257',
      accentColor: '#22c55e',
      colorwayId: 'lime',
      finish: 'gloss',
      tabColor: '#22c55e',
      customName: 'HA HA HA!',
      fontStyle: 'syne',
      fontSize: 115,
      fontY: 0,
      fontRot: -90,
      flavor: 'lime',
      wavePattern: 'acid-laugh',
      chillLevel: 70,
      dropletIntensity: 60
    }
  },
  {
    id: 'drop-dc-flash',
    category: 'dc',
    badge: 'DC COMICS',
    title: 'THE FLASH — SPEED FORCE',
    creator: 'Barry_CentralCity',
    votes: 3120,
    hasVoted: false,
    heroIcon: 'flash',
    config: {
      baseColor: '#c91424',
      accentColor: '#ffd700',
      colorwayId: 'cherry',
      finish: 'chrome',
      tabColor: '#ffd700',
      customName: 'SPEED FORCE',
      fontStyle: 'syne',
      fontSize: 115,
      fontY: 0,
      fontRot: -90,
      flavor: 'cherry',
      wavePattern: 'lightning',
      chillLevel: 80,
      dropletIntensity: 75
    }
  },
  {
    id: 'drop-dc-wonderwoman',
    category: 'dc',
    badge: 'DC COMICS',
    title: 'WONDER WOMAN — THEMYSCIRA',
    creator: 'Diana_Amazon',
    votes: 2890,
    hasVoted: false,
    heroIcon: 'tiara',
    config: {
      baseColor: '#961122',
      accentColor: '#d4af37',
      colorwayId: 'original',
      finish: 'brushed',
      tabColor: '#d4af37',
      customName: 'AMAZONIA',
      fontStyle: 'syne',
      fontSize: 110,
      fontY: 0,
      fontRot: -90,
      flavor: 'original',
      wavePattern: 'amazon-crest',
      chillLevel: 75,
      dropletIntensity: 65
    }
  },
  {
    id: 'drop-dc-aquaman',
    category: 'dc',
    badge: 'DC COMICS',
    title: 'AQUAMAN — OCEAN TRI-DENT',
    creator: 'Arthur_Curry',
    votes: 2340,
    hasVoted: false,
    heroIcon: 'trident',
    config: {
      baseColor: '#034b4f',
      accentColor: '#f59e0b',
      colorwayId: 'lime',
      finish: 'brushed',
      tabColor: '#f59e0b',
      customName: 'ATLANTIS',
      fontStyle: 'bebas',
      fontSize: 120,
      fontY: 0,
      fontRot: -90,
      flavor: 'lime',
      wavePattern: 'ocean-tide',
      chillLevel: 95,
      dropletIntensity: 90
    }
  },

  // ── STUDIO ORIGINAL CREATIONS ──
  {
    id: 'drop-01',
    category: 'original',
    badge: 'ORIGINAL',
    title: 'MIDNIGHT CYBER CHERRY',
    creator: 'StudioZero',
    votes: 1420,
    hasVoted: false,
    heroIcon: 'none',
    config: {
      baseColor: '#121214',
      accentColor: '#f40009',
      colorwayId: 'zero',
      finish: 'matte',
      tabColor: '#f40009',
      customName: 'ZERO LIMITS',
      fontStyle: 'bebas',
      fontSize: 120,
      fontY: 0,
      fontRot: -90,
      flavor: 'zero',
      wavePattern: 'double',
      chillLevel: 90,
      dropletIntensity: 85
    }
  },
  {
    id: 'drop-02',
    category: 'original',
    badge: 'ORIGINAL',
    title: 'STARLIGHT NEBULA DROP',
    creator: 'AstroNova',
    votes: 980,
    hasVoted: false,
    heroIcon: 'none',
    config: {
      baseColor: '#3a0055',
      accentColor: '#ff007f',
      colorwayId: 'starlight',
      finish: 'gloss',
      tabColor: '#ffb703',
      customName: 'COSMOS',
      fontStyle: 'syne',
      fontSize: 110,
      fontY: 10,
      fontRot: -90,
      flavor: 'starlight',
      wavePattern: 'double',
      chillLevel: 70,
      dropletIntensity: 60
    }
  },
  {
    id: 'drop-03',
    category: 'original',
    badge: 'ORIGINAL',
    title: 'HERITAGE 1886 VINTAGE',
    creator: 'RetroCraft',
    votes: 845,
    hasVoted: false,
    heroIcon: 'none',
    config: {
      baseColor: '#c1121f',
      accentColor: '#ffffff',
      colorwayId: 'original',
      finish: 'gloss',
      tabColor: '#c5c9ce',
      customName: 'ATLANTA 1886',
      fontStyle: 'script',
      fontSize: 100,
      fontY: 0,
      fontRot: -90,
      flavor: 'original',
      wavePattern: 'classic',
      chillLevel: 65,
      dropletIntensity: 50
    }
  },
  {
    id: 'drop-04',
    category: 'original',
    badge: 'ORIGINAL',
    title: 'TOKYO NEON LIME',
    creator: 'Kai_Shibuya',
    votes: 720,
    hasVoted: false,
    heroIcon: 'none',
    config: {
      baseColor: '#0b1910',
      accentColor: '#00e676',
      colorwayId: 'lime',
      finish: 'gloss',
      tabColor: '#00e676',
      customName: 'NEON WAVE',
      fontStyle: 'syne',
      fontSize: 115,
      fontY: -10,
      fontRot: -90,
      flavor: 'lime',
      wavePattern: 'geometric',
      chillLevel: 85,
      dropletIntensity: 80
    }
  },
  {
    id: 'drop-05',
    category: 'original',
    badge: 'ORIGINAL',
    title: 'SILVER FOIL PURIST',
    creator: 'AlumDesign',
    votes: 560,
    hasVoted: false,
    heroIcon: 'none',
    config: {
      baseColor: '#b0b5be',
      accentColor: '#111111',
      colorwayId: 'diet',
      finish: 'brushed',
      tabColor: '#111111',
      customName: 'PURE RAW',
      fontStyle: 'bebas',
      fontSize: 125,
      fontY: 0,
      fontRot: -90,
      flavor: 'zero',
      wavePattern: 'minimal',
      chillLevel: 50,
      dropletIntensity: 40
    }
  },
  {
    id: 'drop-06',
    category: 'original',
    badge: 'ORIGINAL',
    title: 'WILD CHERRY PASSION',
    creator: 'RubyRed',
    votes: 615,
    hasVoted: false,
    heroIcon: 'none',
    config: {
      baseColor: '#8a0024',
      accentColor: '#ffffff',
      colorwayId: 'cherry',
      finish: 'gloss',
      tabColor: '#f40009',
      customName: 'CHERRY POP',
      fontStyle: 'script',
      fontSize: 105,
      fontY: 0,
      fontRot: -90,
      flavor: 'cherry',
      wavePattern: 'classic',
      chillLevel: 80,
      dropletIntensity: 75
    }
  }
];

export class CommunityGalleryManager {
  constructor(onLoadConfig) {
    this.onLoadConfig = onLoadConfig;
    this.storageKey = 'coke_creations_community_v3';
    this.currentFilter = 'all';
    this.containerElement = null;
    this.drops = this.loadDrops();
  }

  loadDrops() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const initialIds = new Set(INITIAL_COMMUNITY_DROPS.map(d => d.id));
        const userCustom = parsed.filter(d => !initialIds.has(d.id));
        const voteMap = new Map(parsed.map(d => [d.id, { votes: d.votes, hasVoted: d.hasVoted }]));
        const mergedInitial = INITIAL_COMMUNITY_DROPS.map(d => {
          if (voteMap.has(d.id)) {
            return { ...d, votes: voteMap.get(d.id).votes, hasVoted: voteMap.get(d.id).hasVoted };
          }
          return d;
        });
        return [...userCustom, ...mergedInitial];
      }
    } catch (e) {
      console.warn('Failed to load gallery from storage:', e);
    }
    return [...INITIAL_COMMUNITY_DROPS];
  }

  saveDrops() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.drops));
    } catch (e) {
      console.warn('Failed to save gallery to storage:', e);
    }
  }

  addCreation(title, creator, config, imageSnapshot) {
    const newDrop = {
      id: 'drop-' + Date.now(),
      category: 'original',
      badge: 'COMMUNITY DROP',
      title: title.toUpperCase(),
      creator: creator,
      votes: 1,
      hasVoted: true,
      heroIcon: 'none',
      config: { ...config },
      customImage: imageSnapshot
    };
    this.drops.unshift(newDrop);
    this.saveDrops();
    if (this.containerElement) {
      this.renderGallery(this.containerElement, this.currentFilter);
    }
    return newDrop;
  }

  toggleVote(dropId) {
    const drop = this.drops.find(d => d.id === dropId);
    if (!drop) return;
    if (drop.hasVoted) {
      drop.votes -= 1;
      drop.hasVoted = false;
    } else {
      drop.votes += 1;
      drop.hasVoted = true;
    }
    this.saveDrops();
    return drop;
  }

  setFilter(filterCategory) {
    this.currentFilter = filterCategory;
    if (this.containerElement) {
      this.renderGallery(this.containerElement, filterCategory);
    }
  }

  renderGallery(containerElement, filterCategory = this.currentFilter) {
    this.containerElement = containerElement;
    this.currentFilter = filterCategory;
    containerElement.innerHTML = '';

    const filtered = this.drops.filter(drop => {
      if (filterCategory === 'all') return true;
      return drop.category === filterCategory;
    });

    if (filtered.length === 0) {
      containerElement.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--text-muted);">
          <p style="font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 6px;">No creations found in this universe.</p>
          <p style="font-size: 12px;">Be the first to design and submit a limited edition drop!</p>
        </div>
      `;
      return;
    }

    filtered.forEach(drop => {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.dataset.dropId = drop.id;

      // Stylized SVG thumbnail if no custom image
      const thumbSrc = drop.customImage || this.generateThumbnailSvg(drop);
      const badgeText = drop.badge || (drop.category === 'marvel' ? 'MARVEL' : drop.category === 'dc' ? 'DC COMICS' : 'ORIGINAL');
      const badgeClass = `badge-${drop.category || 'original'}`;

      card.innerHTML = `
        <div class="gallery-card-thumb">
          <span class="gallery-category-badge ${badgeClass}">${badgeText}</span>
          <img src="${thumbSrc}" alt="${drop.title}" loading="lazy" />
        </div>
        <div class="gallery-card-details">
          <span class="gallery-card-title">${drop.title}</span>
          <span class="gallery-card-creator">BY @${drop.creator}</span>
          <div class="gallery-card-footer">
            <button class="gallery-inspect-btn btn-small" data-drop-id="${drop.id}">
              🔍 3D INSPECT
            </button>
            <button class="gallery-vote-btn ${drop.hasVoted ? 'voted' : ''}" data-drop-id="${drop.id}">
              <span>${drop.hasVoted ? '❤️' : '🤍'}</span>
              <strong class="vote-count">${drop.votes}</strong>
            </button>
          </div>
        </div>
      `;

      // Event listener to inspect in 3D
      const inspectBtn = card.querySelector('.gallery-inspect-btn');
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onLoadConfig) {
          this.onLoadConfig(drop.config, drop.title);
        }
      });

      // Event listener to vote
      const voteBtn = card.querySelector('.gallery-vote-btn');
      voteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const updated = this.toggleVote(drop.id);
        if (updated) {
          voteBtn.classList.toggle('voted', updated.hasVoted);
          voteBtn.querySelector('span').textContent = updated.hasVoted ? '❤️' : '🤍';
          voteBtn.querySelector('.vote-count').textContent = updated.votes;
        }
      });

      // Clicking card also loads design
      card.addEventListener('click', () => {
        if (this.onLoadConfig) {
          this.onLoadConfig(drop.config, drop.title);
        }
      });

      containerElement.appendChild(card);
    });
  }

  generateThumbnailSvg(drop) {
    const base = drop.config.baseColor || '#e60012';
    const accent = drop.config.accentColor || '#ffffff';
    const tabColor = drop.config.tabColor || '#d1d5db';
    const name = drop.config.customName || 'COKE';
    const heroIcon = drop.heroIcon || 'none';
    const pattern = drop.config.wavePattern || 'classic';

    // Hero-specific emblem watermark in SVG
    let heroSvg = '';
    if (heroIcon === 'arc') {
      // Iron Man Stark Arc Reactor
      heroSvg = `
        <circle cx="80" cy="115" r="28" stroke="${accent}" stroke-width="2.5" fill="none" opacity="0.65" />
        <circle cx="80" cy="115" r="18" stroke="${accent}" stroke-width="1.5" fill="none" opacity="0.8" />
        <circle cx="80" cy="115" r="8" fill="${accent}" opacity="0.9" />
        <path d="M 80 82 L 80 148 M 47 115 L 113 115" stroke="${accent}" stroke-width="1.2" opacity="0.4" />
      `;
    } else if (heroIcon === 'web') {
      // Spider-Man Web strands
      heroSvg = `
        <path d="M 80 120 L 35 75 M 80 120 L 125 75 M 80 120 L 80 65 M 80 120 L 35 165 M 80 120 L 125 165" stroke="${accent}" stroke-width="1.5" opacity="0.45" />
        <circle cx="80" cy="120" r="16" stroke="${accent}" stroke-width="1.5" fill="none" opacity="0.5" />
        <circle cx="80" cy="120" r="32" stroke="${accent}" stroke-width="1.5" fill="none" opacity="0.35" />
      `;
    } else if (heroIcon === 'claws') {
      // Wolverine Adamantium Claws slashes
      heroSvg = `
        <path d="M 52 80 L 68 155 M 74 75 L 82 160 M 96 80 L 96 155" stroke="${accent}" stroke-width="3.5" stroke-linecap="round" opacity="0.85" />
      `;
    } else if (heroIcon === 'vibranium') {
      // Black Panther Wakanda Vibranium Chevron necklace
      heroSvg = `
        <path d="M 50 95 L 60 115 L 70 95 L 80 120 L 90 95 L 100 115 L 110 95" stroke="${accent}" stroke-width="2.5" fill="none" stroke-linejoin="round" opacity="0.75" />
        <circle cx="80" cy="125" r="14" stroke="${accent}" stroke-width="1.5" fill="none" opacity="0.4" />
      `;
    } else if (heroIcon === 'lightning') {
      // Thor / Flash Lightning Bolt
      heroSvg = `
        <path d="M 84 75 L 70 112 L 85 112 L 72 155 L 94 105 L 79 105 Z" fill="${accent}" opacity="0.85" />
      `;
    } else if (heroIcon === 'bat') {
      // Batman Gotham Bat Emblem silhouette
      heroSvg = `
        <path d="M 80 102 Q 88 95 96 100 Q 112 102 120 115 Q 108 118 98 126 Q 92 135 80 128 Q 68 135 62 126 Q 52 118 40 115 Q 48 102 64 100 Q 72 95 80 102 Z" fill="${accent}" opacity="0.8" />
      `;
    } else if (heroIcon === 'shield') {
      // Superman S-Shield Pentagon
      heroSvg = `
        <path d="M 80 88 L 108 98 L 98 135 L 80 148 L 62 135 L 52 98 Z" stroke="${accent}" stroke-width="3" fill="none" opacity="0.85" />
        <path d="M 80 96 L 96 104 L 88 128 L 80 138 L 72 128 L 64 104 Z" fill="${accent}" opacity="0.4" />
      `;
    } else if (heroIcon === 'smile') {
      // Joker Acid Smile
      heroSvg = `
        <path d="M 45 110 Q 80 155 115 110 Q 80 135 45 110 Z" fill="${accent}" opacity="0.85" />
        <circle cx="60" cy="100" r="3.5" fill="${accent}" opacity="0.8" />
        <circle cx="100" cy="100" r="3.5" fill="${accent}" opacity="0.8" />
      `;
    } else if (heroIcon === 'flash') {
      // The Flash Lightning Crest
      heroSvg = `
        <circle cx="80" cy="115" r="26" stroke="${accent}" stroke-width="2" fill="none" opacity="0.6" />
        <path d="M 86 82 L 68 116 L 86 116 L 74 150 L 94 108 L 78 108 Z" fill="${accent}" opacity="0.9" />
      `;
    } else if (heroIcon === 'tiara') {
      // Wonder Woman Tiara Star
      heroSvg = `
        <path d="M 48 105 L 80 90 L 112 105 L 80 120 Z" stroke="${accent}" stroke-width="2.5" fill="none" opacity="0.8" />
        <polygon points="80,98 83,105 90,105 85,110 87,117 80,113 73,117 75,110 70,105 77,105" fill="${accent}" opacity="0.9" />
      `;
    } else if (heroIcon === 'trident') {
      // Aquaman Trident
      heroSvg = `
        <path d="M 80 80 L 80 155 M 65 92 L 65 110 Q 65 125 80 125 Q 95 125 95 110 L 95 92" stroke="${accent}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.8" />
      `;
    }

    // Dynamic wave ribbon in SVG based on pattern
    let waveSvg = '';
    if (pattern === 'stark-arc') {
      waveSvg = `
        <path d="M 28 115 L 60 135 L 95 110 L 132 135" stroke="${accent}" stroke-width="7" fill="none" stroke-linejoin="round" opacity="0.9" />
        <path d="M 28 135 L 60 155 L 95 130 L 132 155" stroke="rgba(255,255,255,0.4)" stroke-width="4" fill="none" stroke-linejoin="round" />
      `;
    } else if (pattern === 'web-lattice') {
      waveSvg = `
        <path d="M 28 125 Q 80 80, 132 135" stroke="${accent}" stroke-width="7" fill="none" opacity="0.9" />
        <path d="M 45 105 L 75 145 M 85 95 L 115 135" stroke="rgba(255,255,255,0.5)" stroke-width="2" />
      `;
    } else if (pattern === 'claws') {
      waveSvg = `
        <path d="M 40 90 L 65 160 M 65 85 L 90 155 M 90 90 L 115 160" stroke="${accent}" stroke-width="6" stroke-linecap="round" opacity="0.9" />
      `;
    } else if (pattern === 'lightning') {
      waveSvg = `
        <path d="M 30 105 L 65 110 L 55 135 L 95 125 L 85 155 L 132 140" stroke="${accent}" stroke-width="7" fill="none" stroke-linejoin="round" opacity="0.95" />
      `;
    } else if (pattern === 'stealth-bat') {
      waveSvg = `
        <path d="M 28 135 L 55 115 L 80 145 L 105 115 L 132 135" stroke="${accent}" stroke-width="7" fill="none" stroke-linejoin="round" opacity="0.9" />
      `;
    } else if (pattern === 'vibranium-weave') {
      waveSvg = `
        <path d="M 28 120 L 45 135 L 62 120 L 80 135 L 98 120 L 115 135 L 132 120" stroke="${accent}" stroke-width="6" fill="none" stroke-linejoin="round" opacity="0.9" />
      `;
    } else if (pattern === 'ocean-tide') {
      waveSvg = `
        <path d="M 28 130 Q 55 95, 80 130 Q 105 95, 132 130" stroke="${accent}" stroke-width="7" fill="none" opacity="0.9" />
      `;
    } else if (pattern === 'amazon-crest') {
      waveSvg = `
        <path d="M 28 120 Q 80 160, 132 120" stroke="${accent}" stroke-width="8" fill="none" opacity="0.9" />
      `;
    } else if (pattern === 'acid-laugh') {
      waveSvg = `
        <path d="M 28 130 L 45 105 L 62 145 L 80 110 L 98 145 L 115 105 L 132 130" stroke="${accent}" stroke-width="6" fill="none" stroke-linejoin="round" opacity="0.95" />
      `;
    } else if (pattern === 'geometric') {
      waveSvg = `<path d="M 28 120 L 55 95 L 80 135 L 105 105 L 132 140" stroke="${accent}" stroke-width="7" fill="none" stroke-linejoin="round" opacity="0.85" />`;
    } else if (pattern === 'double') {
      waveSvg = `
        <path d="M 28 118 Q 80 70, 132 128" stroke="${accent}" stroke-width="6" fill="none" opacity="0.85" />
        <path d="M 28 138 Q 80 90, 132 148" stroke="${accent}" stroke-width="4" fill="none" opacity="0.6" />
      `;
    } else if (pattern === 'minimal') {
      waveSvg = `
        <path d="M 28 124 L 132 124" stroke="${accent}" stroke-width="5" fill="none" opacity="0.9" />
        <path d="M 28 132 L 132 132" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none" />
      `;
    } else {
      waveSvg = `<path d="M 28 130 Q 80 80, 132 140" stroke="${accent}" stroke-width="8" fill="none" opacity="0.85" />`;
    }

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 260" width="160" height="260">
        <defs>
          <linearGradient id="g_${drop.id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${base}" stop-opacity="0.92" />
            <stop offset="35%" stop-color="${base}" stop-opacity="1" />
            <stop offset="70%" stop-color="${base}" stop-opacity="1" />
            <stop offset="100%" stop-color="${base}" stop-opacity="0.88" />
          </linearGradient>
          <linearGradient id="rim_${drop.id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#9ca3af" />
            <stop offset="50%" stop-color="#e5e7eb" />
            <stop offset="100%" stop-color="#6b7280" />
          </linearGradient>
          <filter id="glow_${drop.id}">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Can Cylinder Body -->
        <rect x="26" y="30" width="108" height="200" rx="14" fill="url(#g_${drop.id})" stroke="#1f242d" stroke-width="1.2" />

        <!-- Highlights & Shadow Sheen -->
        <path d="M 38 32 L 48 32 L 48 228 L 38 228 Z" fill="#ffffff" opacity="0.14" />
        <path d="M 120 32 L 126 32 L 126 228 L 120 228 Z" fill="#000000" opacity="0.22" />

        <!-- Hero Emblem Watermark -->
        ${heroSvg}

        <!-- Dynamic Wave Pattern -->
        ${waveSvg}

        <!-- Top Lid & Outer Curl -->
        <ellipse cx="80" cy="30" rx="46" ry="9" fill="url(#rim_${drop.id})" stroke="#4b5563" stroke-width="0.8" />
        <ellipse cx="80" cy="31" rx="38" ry="6.5" fill="#374151" opacity="0.8" />

        <!-- Authentic Stay-On Pull Tab -->
        <rect x="74" y="24" width="12" height="15" rx="3" fill="${tabColor}" stroke="#1f2937" stroke-width="1" />
        <circle cx="80" cy="33" r="2.5" fill="#111827" />

        <!-- Bottom Base Curl -->
        <ellipse cx="80" cy="230" rx="42" ry="7" fill="url(#rim_${drop.id})" opacity="0.9" stroke="#374151" stroke-width="0.8" />

        <!-- Stamped Vertical Typography -->
        <text x="80" y="152" font-family="'Syne', 'Bebas Neue', sans-serif" font-weight="900" font-size="16" letter-spacing="1" fill="${accent}" text-anchor="middle" transform="rotate(-90 80 152)" filter="url(#glow_${drop.id})">${name}</text>
      </svg>
    `;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
}
