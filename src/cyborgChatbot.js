// ==========================================================================
// CYBORG AI CHATBOT & CAN ARCHITECT COMPANION (v2.0 PRO)
// Features:
// 1. Pop-Culture & Thematic Editions Engine (Batman, Spider-Man, Iron Man, Barbie, etc.)
// 2. User Preference Memory & Personalization Profile (Signature Can generator)
// 3. Interactive In-Message Variation Chips for 1-click styling
// 4. Procedural Concept Synthesizer for arbitrary user themes
// 5. Dynamic Scheme Syncing with Cyborg 3D/SVG Avatar
// ==========================================================================

import confetti from 'canvas-confetti';

const NAMED_COLORS = {
  // Classics & Coca-Cola
  'red': '#E60012',
  'coke red': '#F40009',
  'crimson': '#DC143C',
  'scarlet': '#FF2400',
  'cherry': '#7B001C',
  'bordeaux': '#58111A',
  'ruby': '#9B111E',

  // Blacks & Greys
  'black': '#121214',
  'matte black': '#141418',
  'dark': '#0E0E12',
  'charcoal': '#22252A',
  'onyx': '#0F0F12',
  'silver': '#B0B5BC',
  'aluminum': '#C5C9CE',
  'grey': '#7A7E85',
  'gray': '#7A7E85',
  'white': '#FFFFFF',

  // Neons & Cyber
  'cyber lime': '#00E676',
  'lime': '#00E676',
  'neon green': '#39FF14',
  'green': '#00C853',
  'emerald': '#00B074',
  'mint': '#00F5D4',
  'cyan': '#00E5FF',
  'aqua': '#00F0FF',
  'ice': '#70D6FF',
  'sky blue': '#4CC9F0',
  'electric blue': '#0066FF',
  'blue': '#0055FF',
  'navy': '#001A4D',
  'royal blue': '#1B3BFF',

  // Warm & Cosmic
  'starlight': '#3A0055',
  'cosmic purple': '#4A0E4E',
  'purple': '#7B2CBF',
  'violet': '#9D4EDD',
  'lavender': '#C77DFF',
  'hot pink': '#FF007F',
  'magenta': '#F72585',
  'pink': '#FF4D8D',
  'rose': '#E63946',
  'gold': '#FFD700',
  'golden': '#FFC300',
  'yellow': '#FFEA00',
  'neon yellow': '#CCFF00',
  'amber': '#FFB703',
  'orange': '#FB8500',
  'tangerine': '#FF5400',
  'copper': '#B87333',
  'bronze': '#CD7F32'
};

// ==========================================================================
// COMPREHENSIVE POP-CULTURE, SUPERHERO & THEMATIC EDITIONS CATALOG
// ==========================================================================
const THEMES_CATALOG = {
  batman: {
    patterns: [/\b(batman|dark knight|gotham|bruce wayne|batmobile|bat-can|bat can)\b/i],
    title: 'Batman: The Dark Knight Edition',
    base: '#111116',
    accent: '#FFD700',
    tab: '#FFD700',
    finish: 'matte',
    name: 'GOTHAM',
    fontStyle: 'bebas',
    chill: 80,
    quote: "🦇 **Gotham Protocol Engaged!** I've transformed your can into the **Batman: The Dark Knight Edition**!\n\n• **Stealth Matte Armor** (`#111116`)\n• **Tactical Bat-Gold Trim & Pull-Tab** (`#FFD700`)\n• **Bebas Gotham Insignia**\n• **Rainy Gotham Condensation** (80% chill)",
    tags: ['Batman Dark Knight', 'Matte Black', 'Tactical Gold', 'Gotham 80%'],
    variations: [
      { label: '🦇 Classic Dark Knight', prompt: 'Make Batman Dark Knight edition' },
      { label: '⚡ Batman Beyond (Neon)', prompt: 'Make Batman Beyond neon red and chrome with name BEYOND' },
      { label: '🛡️ Batmobile Titanium', prompt: 'Make Batman brushed metal finish with gold tab' },
      { label: '❄️ Mr. Freeze Gotham', prompt: 'Make Batman with 100% freezing frost' }
    ]
  },
  spiderman: {
    patterns: [/\b(spiderman|spider-man|spider man|peter parker|web slinger|spider)\b/i],
    title: 'Spider-Man: Web-Slinger Edition',
    base: '#C41212',
    accent: '#0055FF',
    tab: '#0055FF',
    finish: 'gloss',
    name: 'SPIDER-CAN',
    fontStyle: 'syne',
    chill: 75,
    quote: "🕸️ **Thwip! Friendly Neighborhood Can Activated!**\n\n• **Iconic Web-Head Red** (`#C41212`)\n• **Electric Spider-Blue Trim & Tab** (`#0055FF`)\n• **Dynamic Web Typography**\n• **75% Crisp Cold Chill**",
    tags: ['Spider-Man', 'Hero Red', 'Electric Blue', 'Spider-Can'],
    variations: [
      { label: '🕸️ Classic Spider-Man', prompt: 'Make Spider-Man edition' },
      { label: '⚡ Miles Morales (Neon)', prompt: 'Make matte black base with neon red accent named MILES' },
      { label: '🖤 Symbiote Venom', prompt: 'Make matte black with white trim and chrome finish named VENOM' }
    ]
  },
  ironman: {
    patterns: [/\b(iron man|ironman|tony stark|stark tech|arc reactor|avengers)\b/i],
    title: 'Iron Man: Stark Tech Edition',
    base: '#850000',
    accent: '#FFD700',
    tab: '#00E5FF',
    finish: 'brushed',
    name: 'MARK LXXXV',
    fontStyle: 'bebas',
    chill: 60,
    quote: "⚡ **Stark Industries Protocol Online!**\n\n• **Hot-Rod Crimson Titanium** (`#850000`)\n• **24K Arc Gold Trim** (`#FFD700`)\n• **Arc Reactor Cyan Pull-Tab** (`#00E5FF`)\n• **Brushed Metallic Armor Plating**",
    tags: ['Iron Man', 'Crimson Gold', 'Arc Reactor', 'Brushed Titanium'],
    variations: [
      { label: '⚡ Mark 85 Titanium', prompt: 'Make Iron Man edition' },
      { label: '🪞 Hot-Rod Mirror Chrome', prompt: 'Make Iron Man with chrome mirror finish' },
      { label: '🖤 Stealth Armor Iron Man', prompt: 'Make matte black base with gold trim named STEALTH' }
    ]
  },
  barbie: {
    patterns: [/\b(barbie|barbiecore|pink dream|pretty pink|princess)\b/i],
    title: 'Barbie: Pink Glam Dream Edition',
    base: '#FF1493',
    accent: '#FFFFFF',
    tab: '#FF69B4',
    finish: 'gloss',
    name: 'BARBIE',
    fontStyle: 'script',
    chill: 70,
    quote: "💖 **Hi Barbie! You look gorgeous!**\n\n• **Signature Hot Magenta Pink** (`#FF1493`)\n• **Ultra-Glam White Trim** (`#FFFFFF`)\n• **Flowing Elegant Script Typography**\n• **High-Gloss Candy Coat**",
    tags: ['Barbie Dream', 'Hot Pink', 'White Script', 'High Gloss'],
    variations: [
      { label: '💖 Barbie Classic', prompt: 'Make Barbie edition' },
      { label: '✨ Pastel Barbie Chic', prompt: 'Make pastel pink base with white trim and gloss finish' },
      { label: '🪞 Chrome Pink Barbie', prompt: 'Make hot pink with chrome finish named BARBIE' }
    ]
  },
  cyberpunk: {
    patterns: [/\b(cyberpunk|night city|2077|cyber neon|cyber)\b/i],
    title: 'Cyberpunk 2077: Night City Drop',
    base: '#0D0E15',
    accent: '#00F0FF',
    tab: '#FDF001',
    finish: 'chrome',
    name: 'CYBERPUNK',
    fontStyle: 'syne',
    chill: 85,
    quote: "🦾 **Wake up, Samurai! We have a can to chrome!**\n\n• **Night City Obsidian** (`#0D0E15`)\n• **Bioluminescent Neon Cyan Trim** (`#00F0FF`)\n• **Kiroshi Optics Yellow Tab** (`#FDF001`)\n• **Mirror Chrome Specular Finish**",
    tags: ['Cyberpunk 2077', 'Neon Cyan', 'Yellow Tab', 'Mirror Chrome'],
    variations: [
      { label: '🦾 Cyberpunk Night City', prompt: 'Make Cyberpunk 2077 edition' },
      { label: '⚡ Cyber Lime Chrome', prompt: 'Make it Cyber Lime with chrome finish' },
      { label: '🌆 Neon Pink Outrun', prompt: 'Make neon purple with hot pink trim named NIGHT CITY' }
    ]
  },
  matrix: {
    patterns: [/\b(matrix|neo|digital rain|keanu)\b/i],
    title: 'The Matrix: Digital Rain Edition',
    base: '#050D08',
    accent: '#00FF41',
    tab: '#00FF41',
    finish: 'chrome',
    name: 'THE MATRIX',
    fontStyle: 'syne',
    chill: 90,
    quote: "🟩 **Red Pill or Blue Pill?**\n\n• **Terminal Deep Obsidian** (`#050D08`)\n• **Phosphor Matrix Green Code Trim** (`#00FF41`)\n• **Futuristic Syne Typography**\n• **Freezing 90% Digital Frost**",
    tags: ['The Matrix', 'Phosphor Green', 'Terminal Black', 'Cyber Chrome'],
    variations: [
      { label: '🟩 Digital Rain Matrix', prompt: 'Make Matrix edition' },
      { label: '🖤 Stealth Terminal', prompt: 'Make matte black with neon green accent' }
    ]
  },
  ferrari: {
    patterns: [/\b(ferrari|f1|racing|formula 1|scuderia|race car)\b/i],
    title: 'Scuderia Ferrari: Corsa Racing Edition',
    base: '#E10600',
    accent: '#FFF200',
    tab: '#111111',
    finish: 'gloss',
    name: 'SCUDERIA',
    fontStyle: 'bebas',
    chill: 75,
    quote: "🏎️ **Pit Stop Complete! 1.8s Record Turnaround!**\n\n• **Corsa Racing Red** (`#E10600`)\n• **Modena Aerodynamic Yellow Trim** (`#FFF200`)\n• **Carbon Black Pull-Tab** (`#111111`)\n• **High-Speed Gloss Coating**",
    tags: ['Ferrari Racing', 'Corsa Red', 'Modena Yellow', 'Gloss Finish'],
    variations: [
      { label: '🏎️ Ferrari Scuderia', prompt: 'Make Ferrari racing edition' },
      { label: '🖤 Carbon Black Racing', prompt: 'Make matte black with red trim named MONZA' }
    ]
  },
  gold: {
    patterns: [/\b(gold|golden|24k|luxury|rolex|billionaire|royale|vip)\b/i],
    title: '24K Gold: Sovereign Royale Edition',
    base: '#D4AF37',
    accent: '#1A1A1A',
    tab: '#D4AF37',
    finish: 'chrome',
    name: '24K ROYALE',
    fontStyle: 'bebas',
    chill: 70,
    quote: "👑 **Pure Luxury Sovereign Edition!**\n\n• **Mirror-Polished 24K Gold** (`#D4AF37`)\n• **Obsidian Onyx Velvet Trim** (`#1A1A1A`)\n• **Solid Gold Pull-Tab**\n• **Reflective Specular Chrome**",
    tags: ['24K Gold', 'Sovereign Royale', 'Obsidian Trim', 'Mirror Specular'],
    variations: [
      { label: '👑 24K Pure Gold', prompt: 'Make 24K gold royale edition' },
      { label: '🖤 Matte Black & Gold', prompt: 'Make matte black with gold trim and gold tab' },
      { label: '✨ Brushed Champagne Gold', prompt: 'Make brushed finish with gold base named ROYALE' }
    ]
  },
  ocean: {
    patterns: [/\b(ocean|atlantis|deep sea|aquatic|water|marine|submariner)\b/i],
    title: 'Atlantis: Deep Ocean Trench Edition',
    base: '#002B5B',
    accent: '#00EAFF',
    tab: '#70D6FF',
    finish: 'gloss',
    name: 'ATLANTIS',
    fontStyle: 'outfit',
    chill: 100,
    quote: "🌊 **Submerging into the Mariana Trench!**\n\n• **Abyssal Trench Navy** (`#002B5B`)\n• **Bioluminescent Aqua Wave Trim** (`#00EAFF`)\n• **Ice Cyan Pull-Tab** (`#70D6FF`)\n• **100% Freezing Ocean Condensation**",
    tags: ['Atlantis Ocean', 'Deep Navy', 'Bioluminescent Aqua', '100% Frost'],
    variations: [
      { label: '🌊 Deep Atlantis (100% Frost)', prompt: 'Make ocean atlantis edition' },
      { label: '🧊 Iceberg Crisp', prompt: 'Make cyan base with white trim and 100% chill' }
    ]
  },
  synthwave: {
    patterns: [/\b(synthwave|vaporwave|outrun|retro 80s|miami vice|retro wave|80s)\b/i],
    title: 'Outrun: Retro Synthwave Edition',
    base: '#2B0938',
    accent: '#FF007F',
    tab: '#00F5D4',
    finish: 'gloss',
    name: 'OUTRUN',
    fontStyle: 'syne',
    chill: 80,
    quote: "🌴 **Cruising down the Miami Sunset Strip!**\n\n• **Retro Dusk Purple** (`#2B0938`)\n• **Laser Neon Pink Wave** (`#FF007F`)\n• **Miami Teal Pull-Tab** (`#00F5D4`)\n• **80s Synthwave Aesthetic**",
    tags: ['Synthwave 80s', 'Dusk Purple', 'Laser Pink', 'Miami Teal'],
    variations: [
      { label: '🌴 Retro Outrun', prompt: 'Make synthwave vaporwave edition' },
      { label: '🎨 Wrap Synthwave Graphic', prompt: 'Wrap retro vaporwave art' }
    ]
  },
  halloween: {
    patterns: [/\b(halloween|spooky|pumpkin|ghost|horror|creepy|witch)\b/i],
    title: 'Haunted: Halloween Jack Edition',
    base: '#140A22',
    accent: '#FF7518',
    tab: '#39FF14',
    finish: 'matte',
    name: 'SPOOKY',
    fontStyle: 'bebas',
    chill: 80,
    quote: "🎃 **The Witching Hour Approaches!**\n\n• **Haunted Crypt Violet** (`#140A22`)\n• **Jack-o'-Lantern Pumpkin Flame** (`#FF7518`)\n• **Ectoplasm Toxic Lime Tab** (`#39FF14`)\n• **Stealth Matte Shroud**",
    tags: ['Halloween Spooky', 'Pumpkin Orange', 'Toxic Lime Tab', 'Matte Violet'],
    variations: [
      { label: '🎃 Pumpkin Spooky', prompt: 'Make halloween spooky edition' },
      { label: '👻 Vampire Blood Red', prompt: 'Make ruby base with black trim named DRACULA' }
    ]
  },
  christmas: {
    patterns: [/\b(christmas|holiday|xmas|winter wonderland|santa|festive)\b/i],
    title: 'Holiday: Christmas Pine Edition',
    base: '#0B6623',
    accent: '#C41E3A',
    tab: '#FFD700',
    finish: 'gloss',
    name: 'HOLIDAY',
    fontStyle: 'script',
    chill: 100,
    quote: "❄️ **Season's Greetings from Coca-Cola Creations!**\n\n• **Evergreen Pine Forest** (`#0B6623`)\n• **Santa Ribbon Crimson** (`#C41E3A`)\n• **Gold Star Pull-Tab** (`#FFD700`)\n• **100% Freezing Winter Frost**",
    tags: ['Holiday Christmas', 'Pine Green', 'Santa Red', '100% Snow Chill'],
    variations: [
      { label: '❄️ Festive Holiday Pine', prompt: 'Make christmas holiday edition' },
      { label: '🎅 Classic Santa Red & Frost', prompt: 'Make iconic red base with white trim and 100% chill named SANTA' }
    ]
  },
  sakura: {
    patterns: [/\b(sakura|cherry blossom|anime|kawaii|tokyo|japanese)\b/i],
    title: 'Sakura: Tokyo Blossom Edition',
    base: '#FFA6C9',
    accent: '#FFFFFF',
    tab: '#FF5388',
    finish: 'gloss',
    name: 'SAKURA',
    fontStyle: 'script',
    chill: 65,
    quote: "🌸 **Springtime in Tokyo!**\n\n• **Delicate Sakura Petal Pink** (`#FFA6C9`)\n• **Porcelain White Cloud Waves** (`#FFFFFF`)\n• **Cherry Blossom Pull-Tab** (`#FF5388`)\n• **Soft Flowing Script Typography**",
    tags: ['Sakura Blossom', 'Petal Pink', 'Porcelain White', 'Script Gloss'],
    variations: [
      { label: '🌸 Tokyo Sakura', prompt: 'Make sakura cherry blossom edition' },
      { label: '🍵 Matcha Zen & Sakura', prompt: 'Make matcha green with sakura pink trim' }
    ]
  },
  matcha: {
    patterns: [/\b(matcha|green tea|zen|tea|organic)\b/i],
    title: 'Matcha: Kyoto Zen Edition',
    base: '#3A5A40',
    accent: '#FDFBF7',
    tab: '#A3B18A',
    finish: 'matte',
    name: 'MATCHA ZEN',
    fontStyle: 'outfit',
    chill: 70,
    quote: "🍵 **Kyoto Zen Ceremony!**\n\n• **Organic Ceremonial Green** (`#3A5A40`)\n• **Silk Cream Porcelain Trim** (`#FDFBF7`)\n• **Sage Green Pull-Tab** (`#A3B18A`)\n• **Soothing Satin Matte Texture**",
    tags: ['Kyoto Matcha', 'Ceremonial Green', 'Silk Cream', 'Satin Matte'],
    variations: [
      { label: '🍵 Kyoto Matcha Zen', prompt: 'Make matcha zen edition' },
      { label: '🧊 Iced Matcha Latte', prompt: 'Make matcha with 100% ice cold chill' }
    ]
  },
  coffee: {
    patterns: [/\b(coffee|mocha|cold brew|espresso|cappuccino|chocolate|latte)\b/i],
    title: 'Cold Brew: Dark Roast Espresso Edition',
    base: '#2E1C14',
    accent: '#FFFDD0',
    tab: '#D4A373',
    finish: 'matte',
    name: 'COLD BREW',
    fontStyle: 'bebas',
    chill: 95,
    quote: "☕ **Dark Roast Nitro Cold Brew!**\n\n• **Espresso Bean Dark Roast** (`#2E1C14`)\n• **Sweet Vanilla Foam Cream Trim** (`#FFFDD0`)\n• **Caramel Pull-Tab** (`#D4A373`)\n• **Nitro Chilled (95% frost)**",
    tags: ['Nitro Cold Brew', 'Espresso Dark', 'Cream Trim', '95% Chill'],
    variations: [
      { label: '☕ Dark Roast Nitro', prompt: 'Make coffee cold brew edition' },
      { label: '🍫 Rich Mocha Chocolate', prompt: 'Make chocolate mocha edition' }
    ]
  },
  minecraft: {
    patterns: [/\b(minecraft|craft|pixel|8-bit|diamond sword)\b/i],
    title: 'Minecraft: Diamond Miner Edition',
    base: '#1E3F20',
    accent: '#00E5FF',
    tab: '#00E5FF',
    finish: 'matte',
    name: 'MINECRAFT',
    fontStyle: 'bebas',
    chill: 80,
    quote: "⛏️ **Crafting Recipe Synthesized!**\n\n• **Overworld Grass Green** (`#1E3F20`)\n• **Rare Diamond Ore Aqua Trim & Tab** (`#00E5FF`)\n• **Blocky Pixel Aesthetic**\n• **Matte Voxel Texture**",
    tags: ['Minecraft', 'Diamond Aqua', 'Grass Green', 'Voxel Matte'],
    variations: [
      { label: '⛏️ Diamond Minecraft', prompt: 'Make minecraft edition' },
      { label: '🔥 Netherite Edition', prompt: 'Make matte black with purple trim named NETHER' }
    ]
  },
  dragon: {
    patterns: [/\b(dragon|inferno|fire|flame|phoenix|volcano)\b/i],
    title: 'Inferno: Dragon Scale Edition',
    base: '#1A0404',
    accent: '#FF3300',
    tab: '#FFD700',
    finish: 'matte',
    name: 'INFERNO',
    fontStyle: 'bebas',
    chill: 10,
    quote: "🐉 **Dragonfire Unleashed!**\n\n• **Volcanic Obsidian Scales** (`#1A0404`)\n• **Blazing Magma Flame Trim** (`#FF3300`)\n• **Molten Gold Tab** (`#FFD700`)\n• **Warm Ambient Smoke (0% frost)**",
    tags: ['Inferno Dragon', 'Volcanic Red', 'Molten Gold', 'Warm Temp'],
    variations: [
      { label: '🐉 Dragon Inferno', prompt: 'Make dragon inferno edition' },
      { label: '❄️ Frost Dragon', prompt: 'Make white base with cyan flame trim and 100% chill' }
    ]
  },
  minimal: {
    patterns: [/\b(minimal|minimalist|clean|apple|simple|modernist)\b/i],
    title: 'Minimalist: Monochrome Studio Edition',
    base: '#FFFFFF',
    accent: '#111111',
    tab: '#E60012',
    finish: 'matte',
    name: 'MINIMAL',
    fontStyle: 'outfit',
    chill: 70,
    quote: "⚡ **Less is More! Architecture Studio Edition.**\n\n• **Pure Architectural White** (`#FFFFFF`)\n• **Precision Monochrome Black Trim** (`#111111`)\n• **Iconic Crimson Accent Pull-Tab** (`#E60012`)\n• **Velvet Matte Touch**",
    tags: ['Minimalist', 'Architectural White', 'Monochrome', 'Velvet Matte'],
    variations: [
      { label: '⚡ Clean White Minimal', prompt: 'Make clean minimalist edition' },
      { label: '🖤 Pitch Black Minimal', prompt: 'Make matte black with white trim named MINIMAL' }
    ]
  }
};

export class CyborgChatbot {
  constructor(app) {
    this.app = app;
    this.isOpen = false;
    this.messages = [];
    this.anchor = document.getElementById('cyborg-companion-anchor');
    this.characterWrap = document.getElementById('cyborg-character');
    this.panel = document.getElementById('cyborg-chat-panel');
    this.messagesContainer = document.getElementById('cyborg-chat-messages');
    this.input = document.getElementById('cyborg-chat-input');
    this.form = document.getElementById('cyborg-chat-form');
    this.btnClose = document.getElementById('btn-close-cyborg-chat');
    this.btnClear = document.getElementById('btn-cyborg-clear');
    this.typingIndicator = document.getElementById('cyborg-typing-indicator');
    this.quickPrompts = document.getElementById('cyborg-quick-prompts');

    // User Preferences Memory
    this.preferences = this.loadPreferences();

    this.init();
  }

  // Persistent User Preferences in LocalStorage
  loadPreferences() {
    try {
      const saved = localStorage.getItem('coke_cyborg_user_prefs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return {
      userName: '',
      favoriteColors: [],
      favoriteFinish: '',
      favoriteTheme: '',
      preferredChill: 80,
      customCreationsCount: 0
    };
  }

  savePreferences() {
    try {
      localStorage.setItem('coke_cyborg_user_prefs', JSON.stringify(this.preferences));
    } catch (e) {
      // Ignore
    }
  }

  init() {
    if (!this.anchor || !this.panel) return;

    // 1. Setup initial color scheme from textureManager
    const currentState = this.app.textureMgr ? this.app.textureMgr.state : { baseColor: '#E60012', accentColor: '#FFFFFF', finish: 'gloss' };
    this.updateScheme(currentState.baseColor, currentState.accentColor, currentState.finish);

    // 2. Click Cyborg to Toggle Chat Panel
    this.anchor.addEventListener('click', (e) => {
      e.stopPropagation();
      this.togglePanel();
    });

    // 3. Close & Clear buttons
    if (this.btnClose) {
      this.btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.togglePanel(false);
      });
    }

    if (this.btnClear) {
      this.btnClear.addEventListener('click', (e) => {
        e.stopPropagation();
        this.clearMessages();
      });
    }

    // 4. Form Submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleUserSubmit();
      });
    }

    // 5. Quick Prompts Bar (Top Bar)
    if (this.quickPrompts) {
      // Add exciting thematic prompt pills to the top bar
      this.renderQuickPromptsBar();
      this.quickPrompts.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-prompt-chip');
        if (btn && btn.dataset.prompt) {
          const prompt = btn.dataset.prompt;
          if (this.input) this.input.value = prompt;
          this.handleUserSubmit();
        }
      });
    }

    // 6. Interactive Message Action Chips (inside chat bubbles)
    if (this.messagesContainer) {
      this.messagesContainer.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.msg-action-chip');
        if (actionBtn && actionBtn.dataset.prompt) {
          const prompt = actionBtn.dataset.prompt;
          if (this.input) this.input.value = prompt;
          this.handleUserSubmit();
        }
      });
    }

    // 7. Close when clicking outside panel
    document.addEventListener('click', (e) => {
      if (this.isOpen && this.panel && !this.panel.contains(e.target) && !this.anchor.contains(e.target)) {
        this.togglePanel(false);
      }
    });

    // 8. Seed Initial Welcome Message with Persona
    const greetingName = this.preferences.userName ? ` **${this.preferences.userName}**` : '';
    this.addBotMessage(
      `⚡ **Greetings${greetingName}!** I'm your Coca-Cola Cyborg Co-Creator.\n\nTell me what you'd like to build! I can fabricate **pop-culture editions (Batman, Spider-Man, Barbie, Cyberpunk, Ferrari)**, remember your **personal design preferences**, customize colors, finishes, chill & frost, or pour ice-cold Coke for you.\n\n*Try asking: "can i make a batman edition can" or click below:*`,
      ['AI Co-Creator v2.5', 'Preferences Active'],
      [
        { label: '🦇 Batman Dark Knight', prompt: 'can i make a batman edition can' },
        { label: '🕸️ Spider-Man Edition', prompt: 'Make a spider-man edition can' },
        { label: '💖 Barbie Pink Dream', prompt: 'Make a barbie edition can' },
        { label: '👑 24K Gold Royale', prompt: 'Make a 24k gold royale can' },
        { label: '👤 Build My Signature Can', prompt: 'Make a can for me based on my preferences' }
      ]
    );
  }

  renderQuickPromptsBar() {
    if (!this.quickPrompts) return;
    const chips = [
      { label: '🦇 Batman Edition', prompt: 'can i make a batman edition can' },
      { label: '🕸️ Spider-Man', prompt: 'Make a spider-man edition can' },
      { label: '💖 Barbie Pink', prompt: 'Make a barbie edition can' },
      { label: '🦾 Cyberpunk 2077', prompt: 'Make Cyberpunk 2077 edition' },
      { label: '🏎️ Ferrari Racing', prompt: 'Make Ferrari racing edition' },
      { label: '👑 24K Gold Royale', prompt: 'Make 24K gold royale edition' },
      { label: '🌊 Deep Atlantis', prompt: 'Make ocean atlantis edition' },
      { label: '👤 My Signature Can', prompt: 'Make a can for me based on my preferences' },
      { label: 'Pop & Pour Coke', prompt: 'Pop open and pour Coke into glass' },
      { label: 'Surprise Me 🎲', prompt: 'Surprise me with a random design' }
    ];

    this.quickPrompts.innerHTML = chips.map(c => 
      `<button class="quick-prompt-chip" data-prompt="${this.escapeHtml(c.prompt)}">${this.escapeHtml(c.label)}</button>`
    ).join('');
  }

  // Update Cyborg's armor, glowing core & energy scheme dynamically to match Can
  updateScheme(baseColor, accentColor, finish = 'gloss') {
    if (!this.anchor && !this.panel) return;

    const baseHex = baseColor || '#E60012';
    const accentHex = accentColor || '#FFFFFF';

    // Darkened variant for 3D depth shadows
    const darkBase = this.shadeColor(baseHex, -45);
    const glowColor = this.hexToRgba(accentHex, 0.45);

    const targets = [this.anchor, this.panel];
    targets.forEach(el => {
      if (!el) return;
      el.style.setProperty('--bot-scheme-base', baseHex);
      el.style.setProperty('--bot-scheme-base-dark', darkBase);
      el.style.setProperty('--bot-scheme-accent', accentHex);
      el.style.setProperty('--bot-scheme-glow', glowColor);
      el.style.setProperty('--bot-finish', finish);
    });
  }

  togglePanel(forceState) {
    this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
    if (this.panel) {
      this.panel.classList.toggle('hidden', !this.isOpen);
      if (this.isOpen) {
        this.app.audio?.playCyborgBeep?.('open');
        this.pulseCyborg();
        setTimeout(() => {
          this.input?.focus();
          this.scrollToBottom();
        }, 120);
      } else {
        this.app.audio?.playClick?.();
      }
    }
  }

  pulseCyborg() {
    if (!this.characterWrap) return;
    this.characterWrap.classList.remove('cyborg-action-pulse');
    void this.characterWrap.offsetWidth;
    this.characterWrap.classList.add('cyborg-action-pulse');
  }

  handleUserSubmit() {
    if (!this.input) return;
    const text = this.input.value.trim();
    if (!text) return;

    this.input.value = '';
    this.addUserMessage(text);
    this.showTyping(true);
    this.pulseCyborg();
    this.app.audio?.playCyborgBeep?.('ack');

    // 320ms latency to feel like dynamic AI calibration
    setTimeout(() => {
      this.showTyping(false);
      const result = this.processInstruction(text);
      this.addBotMessage(result.reply, result.tags, result.variations || []);

      if (result.executed) {
        this.pulseCyborg();
        this.app.audio?.playCyborgBeep?.('apply');

        if (result.confetti) {
          confetti({
            particleCount: 45,
            spread: 70,
            origin: { x: 0.82, y: 0.8 }
          });
        }
      }
    }, 340);
  }

  addUserMessage(text) {
    const msg = { sender: 'user', text, time: this.getCurrentTime() };
    this.messages.push(msg);

    const div = document.createElement('div');
    div.className = 'cyborg-msg cyborg-msg-user';
    div.innerHTML = `
      <div class="msg-bubble user-bubble">
        <div class="msg-text">${this.escapeHtml(text)}</div>
        <div class="msg-time">${msg.time}</div>
      </div>
    `;
    this.messagesContainer?.appendChild(div);
    this.scrollToBottom();
  }

  addBotMessage(markdownText, tags = [], variations = []) {
    const msg = { sender: 'bot', text: markdownText, time: this.getCurrentTime(), tags, variations };
    this.messages.push(msg);

    const tagsHtml = tags && tags.length > 0 
      ? `<div class="msg-tags">${tags.map(t => `<span class="msg-tag">✓ ${this.escapeHtml(t)}</span>`).join('')}</div>`
      : '';

    const actionsHtml = variations && variations.length > 0
      ? `<div class="msg-action-chips">
          <span class="action-chips-label">VARIATIONS:</span>
          ${variations.map(v => `<button class="msg-action-chip" data-prompt="${this.escapeHtml(v.prompt)}">${this.escapeHtml(v.label)}</button>`).join('')}
         </div>`
      : '';

    const div = document.createElement('div');
    div.className = 'cyborg-msg cyborg-msg-bot';
    div.innerHTML = `
      <div class="msg-avatar">
        <span>🤖</span>
      </div>
      <div class="msg-content">
        <div class="msg-bubble bot-bubble">
          <div class="msg-text">${this.formatMarkdown(markdownText)}</div>
          ${tagsHtml}
          ${actionsHtml}
          <div class="msg-time">${msg.time}</div>
        </div>
      </div>
    `;
    this.messagesContainer?.appendChild(div);
    this.scrollToBottom();
  }

  clearMessages() {
    if (!this.messagesContainer) return;
    this.messages = [];
    this.messagesContainer.innerHTML = '';
    this.addBotMessage(
      "Chat history cleared! Tell me what you'd like to build — try asking for a **Batman**, **Spider-Man**, or **Barbie** edition, or customize colors and finishes!",
      ['Chat Reset'],
      [
        { label: '🦇 Batman Edition', prompt: 'can i make a batman edition can' },
        { label: '👑 24K Gold Royale', prompt: 'Make 24K gold royale edition' },
        { label: '👤 Build My Signature Can', prompt: 'Make a can for me based on my preferences' }
      ]
    );
    this.app.audio?.playClick?.();
  }

  showTyping(show) {
    if (this.typingIndicator) {
      this.typingIndicator.classList.toggle('hidden', !show);
      if (show) this.scrollToBottom();
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  // ==========================================================================
  // NATURAL LANGUAGE INSTRUCTION PARSER & CO-CREATOR BRAIN
  // ==========================================================================
  processInstruction(rawInput) {
    const input = rawInput.trim();
    // Normalize question prefixes like "can i make a...", "could you make...", "i want to make..."
    let clean = input.toLowerCase()
      .replace(/^(can\s+i\s+(?:please\s+)?(?:make|create|have|build|design|customize|get)|could\s+you\s+(?:please\s+)?(?:make|create|build|turn\s+this\s+into)|i\s+want\s+(?:to\s+)?(?:make|create|have|build|get)|is\s+it\s+possible\s+to\s+make|please\s+(?:make|create|build)|how\s+do\s+i\s+make)\s+/i, '')
      .trim();

    const lower = clean;
    const applied = [];
    let executed = false;
    let triggerConfetti = false;

    // ------------------------------------------------------------------------
    // 1. USER PREFERENCE COMMANDS & PERSONAL SIGNATURE CAN
    // ------------------------------------------------------------------------
    // Set user name: "my name is Bruce", "call me Tony", "remember my name is..."
    const nameMatch = rawInput.match(/\b(?:my name is|call me|i am|i'm|remember my name is)\s+([a-zA-Z]{2,16})\b/i);
    if (nameMatch) {
      const uName = nameMatch[1].trim();
      this.preferences.userName = uName.charAt(0).toUpperCase() + uName.slice(1).toLowerCase();
      this.savePreferences();
      this.app.showToast(`Saved creator name: ${this.preferences.userName}`, '👤');
      return {
        executed: true,
        confetti: true,
        reply: `👋 **Honored to meet you, ${this.preferences.userName}!** I've logged your creator profile. Now whenever you ask me to **"build a can for me"**, I'll personalize the design with your signature badge!`,
        tags: [`Creator: ${this.preferences.userName}`],
        variations: [
          { label: '🎨 Build My Signature Can', prompt: 'Make a can for me based on my preferences' },
          { label: '🖤 I prefer Matte finish', prompt: 'I prefer matte finish' },
          { label: '⭐ Set my favorite colors', prompt: 'My favorite colors are black and gold' }
        ]
      };
    }

    // Set favorite colors: "my favorite color is [color]", "i like [color] and [color]"
    const favColorMatch = rawInput.match(/\b(?:my favorite colors? (?:is|are)|i love|i prefer colors?)\s+([a-zA-Z\s,]+)\b/i);
    if (favColorMatch && !/(finish|theme|coke)/i.test(favColorMatch[1])) {
      const colStr = favColorMatch[1];
      const foundColors = [];
      for (const [name, hex] of Object.entries(NAMED_COLORS)) {
        if (colStr.toLowerCase().includes(name)) {
          foundColors.push({ name, hex });
        }
      }
      if (foundColors.length > 0) {
        this.preferences.favoriteColors = foundColors.map(c => c.hex);
        this.savePreferences();
        return {
          executed: true,
          confetti: true,
          reply: `🎨 **Preferences Updated!** I've recorded your favorite palette:\n\n` +
            foundColors.map(c => `• **${c.name.toUpperCase()}** (\`${c.hex}\`)`).join('\n') +
            `\n\n*Say **"build a can for me"** anytime to generate your bespoke drop!*`,
          tags: foundColors.map(c => `Pref Color: ${c.name}`),
          variations: [
            { label: '✨ Apply to Can Now', prompt: `Make base ${foundColors[0].name} ${foundColors[1] ? 'with ' + foundColors[1].name + ' trim' : ''}` },
            { label: '👤 Build My Signature Can', prompt: 'Make a can for me based on my preferences' }
          ]
        };
      }
    }

    // Set favorite finish: "i prefer matte", "always use chrome", "i like gloss"
    const favFinishMatch = rawInput.match(/\b(?:i prefer|always use|my favorite finish is)\s+(matte|gloss|brushed|chrome)\b/i);
    if (favFinishMatch) {
      const f = favFinishMatch[1].toLowerCase();
      this.preferences.favoriteFinish = f;
      this.savePreferences();
      this.updateFinish(f);
      return {
        executed: true,
        confetti: true,
        reply: `⚙️ **Finish Preference Saved!** I've set your preferred surface finish to **${f.toUpperCase()} METALLIC** and applied it to the 3D can.`,
        tags: [`Pref Finish: ${f.toUpperCase()}`],
        variations: [
          { label: '👤 Build My Signature Can', prompt: 'Make a can for me based on my preferences' }
        ]
      };
    }

    // View Preferences: "what are my preferences?", "show my profile", "what do you know about me"
    if (/(what are my preferences|show my profile|my preferences|what do you know about me|my style profile)/i.test(lower)) {
      const name = this.preferences.userName || 'Creator (Unset)';
      const colors = this.preferences.favoriteColors.length > 0 
        ? this.preferences.favoriteColors.join(', ') 
        : 'None recorded yet';
      const finish = this.preferences.favoriteFinish ? this.preferences.favoriteFinish.toUpperCase() : 'Gloss (Default)';
      const chill = this.preferences.preferredChill || 80;

      return {
        executed: true,
        reply: `📋 **Your Personal Creator Profile:**\n\n` +
          `• **Creator Name:** ${name}\n` +
          `• **Favorite Colors:** ${colors}\n` +
          `• **Preferred Finish:** ${finish}\n` +
          `• **Chill Preference:** ${chill}% Ice Cold\n\n` +
          `*To update, just tell me: "My name is...", "My favorite color is...", or "I prefer matte finish"!*`,
        tags: [`Profile: ${name}`, `Finish: ${finish}`],
        variations: [
          { label: '🎨 Build My Signature Can', prompt: 'Make a can for me based on my preferences' },
          { label: '🗑️ Reset Preferences', prompt: 'Reset my preferences' }
        ]
      };
    }

    // Reset Preferences
    if (/(reset my preferences|clear my preferences|forget my preferences)/i.test(lower)) {
      this.preferences = { userName: '', favoriteColors: [], favoriteFinish: '', favoriteTheme: '', preferredChill: 80, customCreationsCount: 0 };
      this.savePreferences();
      return {
        executed: true,
        reply: `🧹 **Preferences Reset.** Your creator profile and saved style presets have been cleared.`,
        tags: ['Preferences Cleared']
      };
    }

    // "Make a can for me" / "My signature can" / "Personal edition"
    if (/(make a can for me|my signature can|my personal edition|design for me|based on my preferences|can for me)/i.test(lower)) {
      const creatorName = this.preferences.userName || 'CREATOR';
      const baseHex = this.preferences.favoriteColors[0] || '#141418'; // Default sleek dark
      const accentHex = this.preferences.favoriteColors[1] || '#00E5FF'; // Default cyber cyan
      const finish = this.preferences.favoriteFinish || 'matte';
      const chill = this.preferences.preferredChill || 85;

      this.applyBaseColor(baseHex);
      this.applyAccentColor(accentHex);
      this.app.setPullTab(accentHex);
      this.updateFinish(finish);
      this.setChillLevel(chill);

      // Set custom name to creator
      this.app.textureMgr.updateState({ customName: creatorName.toUpperCase() });
      if (this.app.dom.inputCustomName) this.app.dom.inputCustomName.value = creatorName.toUpperCase();
      if (this.app.dom.charCount) this.app.dom.charCount.textContent = `${creatorName.length}/18`;

      this.updateScheme(baseHex, accentHex, finish);

      return {
        executed: true,
        confetti: true,
        reply: `🌟 **Fabricating Your Signature Edition, ${creatorName}!**\n\n` +
          `Synthesized an exclusive bespoke can from your personal style profile:\n` +
          `• **Primary Body:** \`${baseHex}\`\n` +
          `• **Signature Trim & Pull-Tab:** \`${accentHex}\`\n` +
          `• **Surface Finish:** **${finish.toUpperCase()} METALLIC**\n` +
          `• **Nameplate:** **${creatorName.toUpperCase()}**\n` +
          `• **Temperature:** ${chill}% Ice Cold\n\n` +
          `*Your signature drop is ready for inspection in 3D!*`,
        tags: [`Signature: ${creatorName}`, `${finish.toUpperCase()}`, `${baseHex}`],
        variations: [
          { label: '🪞 Try in Mirror Chrome', prompt: 'Make finish chrome' },
          { label: '🌊 Pour Coca-Cola', prompt: 'Pop open and pour Coke into glass' },
          { label: '🎲 Surprise Me', prompt: 'Surprise me with a random design' }
        ]
      };
    }

    // ------------------------------------------------------------------------
    // 2. THEMES & POP-CULTURE CATALOG MATCHING (Batman, Spider-Man, etc.)
    // ------------------------------------------------------------------------
    for (const [key, theme] of Object.entries(THEMES_CATALOG)) {
      const matched = theme.patterns.some(pattern => pattern.test(lower));
      if (matched) {
        // Apply full theme parameters
        this.applyBaseColor(theme.base);
        this.applyAccentColor(theme.accent);
        if (theme.tab) this.app.setPullTab(theme.tab);
        if (theme.finish) this.updateFinish(theme.finish);
        if (theme.chill !== undefined) this.setChillLevel(theme.chill);
        if (theme.name) {
          this.app.textureMgr.updateState({ customName: theme.name, fontStyle: theme.fontStyle || 'bebas' });
          if (this.app.dom.inputCustomName) this.app.dom.inputCustomName.value = theme.name;
          if (this.app.dom.charCount) this.app.dom.charCount.textContent = `${theme.name.length}/18`;
          this.updateFontCards(theme.fontStyle || 'bebas');
        }

        this.updateScheme(theme.base, theme.accent, theme.finish);
        this.app.showToast(`✨ Loaded ${theme.title}!`, '🎨');

        return {
          executed: true,
          confetti: true,
          reply: theme.quote,
          tags: theme.tags,
          variations: theme.variations
        };
      }
    }

    // ------------------------------------------------------------------------
    // 3. HELP & GREETINGS
    // ------------------------------------------------------------------------
    if (/^(hi|hello|hey|yo|greetings|help|what can you do|commands|options)/i.test(lower)) {
      const userName = this.preferences.userName ? ` **${this.preferences.userName}**` : '';
      return {
        executed: true,
        reply: `🤖 **Greetings${userName}! I am your Coca-Cola Can Architect.** Here is what I can do for you:\n\n` +
          `• **Pop-Culture & Themed Editions:** *'Batman edition', 'Spider-Man can', 'Barbie pink', 'Iron Man', 'Ferrari', 'Cyberpunk', '24K Gold Royale'*\n` +
          `• **Personal Preferences:** *'My name is Bruce', 'My favorite color is gold', 'Build a can for me'*\n` +
          `• **Colors & Trims:** *'Make base neon green', 'accent to purple', 'pull tab red'*\n` +
          `• **Typography & Name:** *'Set name to TITAN', 'script font', 'bebas bold'*\n` +
          `• **Materials & Chill:** *'Matte finish', 'Chrome mirror', '100% freezing cold'*\n` +
          `• **3D Controls:** *'Pop open can', 'Pour Coke into glass', 'Spin the can', 'Top view'*`,
        tags: ['Help & Capabilities'],
        variations: [
          { label: '🦇 Batman Dark Knight', prompt: 'can i make a batman edition can' },
          { label: '🕸️ Spider-Man Edition', prompt: 'Make a spider-man edition can' },
          { label: '💖 Barbie Pink Dream', prompt: 'Make a barbie edition can' },
          { label: '👤 Build My Signature Can', prompt: 'Make a can for me based on my preferences' }
        ]
      };
    }

    // ------------------------------------------------------------------------
    // 4. SURPRISE ME / RANDOMIZE
    // ------------------------------------------------------------------------
    if (/(surprise me|random|randomize|shuffle|something crazy|wild design)/i.test(lower)) {
      const themeKeys = Object.keys(THEMES_CATALOG);
      const randomKey = themeKeys[Math.floor(Math.random() * themeKeys.length)];
      const randomTheme = THEMES_CATALOG[randomKey];

      this.applyBaseColor(randomTheme.base);
      this.applyAccentColor(randomTheme.accent);
      if (randomTheme.tab) this.app.setPullTab(randomTheme.tab);
      if (randomTheme.finish) this.updateFinish(randomTheme.finish);
      if (randomTheme.name) {
        this.app.textureMgr.updateState({ customName: randomTheme.name, fontStyle: randomTheme.fontStyle || 'bebas' });
        if (this.app.dom.inputCustomName) this.app.dom.inputCustomName.value = randomTheme.name;
        this.updateFontCards(randomTheme.fontStyle || 'bebas');
      }

      this.updateScheme(randomTheme.base, randomTheme.accent, randomTheme.finish);
      this.app.showToast('🎲 Cyborg randomized the design!', '✨');

      return {
        executed: true,
        confetti: true,
        reply: `🎲 **Surprise Drop! Synthesized the ${randomTheme.title}!**\n\n${randomTheme.quote}`,
        tags: randomTheme.tags,
        variations: randomTheme.variations
      };
    }

    // ------------------------------------------------------------------------
    // 5. 3D CAN ACTIONS (Pop, Pour, Spin, Camera, Snapshot)
    // ------------------------------------------------------------------------
    // Pour Coke
    if (/(pour|pour coke|fill glass|drink coke|pour drink)/i.test(lower)) {
      if (this.app.dom.btnTogglePour) {
        this.app.dom.btnTogglePour.click();
        executed = true;
        applied.push('Started 4s Coke Pour');
      }
    }

    // Dismiss Glass
    if (/(dismiss glass|send glass back|remove glass|hide glass)/i.test(lower)) {
      if (this.app.scene.isGlassInScene || this.app.scene.pourProgress >= 1.0) {
        this.app.scene.dismissGlass();
        executed = true;
        applied.push('Glass Dismissed');
      }
    }

    // Pop Open / Close
    if (/(pop open|crack open|open can|open the can)/i.test(lower) && !this.app.scene.isPopped) {
      if (this.app.dom.btnTogglePop) {
        this.app.dom.btnTogglePop.click();
        executed = true;
        applied.push('Popped Tab Open');
      }
    } else if (/(close can|unpop|close tab)/i.test(lower) && this.app.scene.isPopped) {
      if (this.app.dom.btnTogglePop) {
        this.app.dom.btnTogglePop.click();
        executed = true;
        applied.push('Closed Tab');
      }
    }

    // Auto-Rotate / Spin
    if (/(start spin|spin can|spin the can|rotate can|auto rotate|turn can)/i.test(lower)) {
      if (!this.app.scene.autoRotate) {
        this.app.scene.toggleAutoRotate();
        if (this.app.dom.btnToggleSpin) this.app.dom.btnToggleSpin.classList.add('active');
        executed = true;
        applied.push('Auto-Rotate Active');
      }
    } else if (/(stop spin|pause spin|stop rotate|freeze rotation|hold still)/i.test(lower)) {
      if (this.app.scene.autoRotate) {
        this.app.scene.toggleAutoRotate();
        if (this.app.dom.btnToggleSpin) this.app.dom.btnToggleSpin.classList.remove('active');
        executed = true;
        applied.push('Auto-Rotate Paused');
      }
    }

    // Camera Perspectives
    if (/(top view|from above|lid view)/i.test(lower)) {
      document.getElementById('cam-btn-top')?.click();
      executed = true;
      applied.push('Camera: Top Down');
    } else if (/(hero view|front view|default view|reset camera)/i.test(lower)) {
      document.getElementById('cam-btn-hero')?.click();
      executed = true;
      applied.push('Camera: Hero Perspective');
    } else if (/(angle view|side view|45 degree)/i.test(lower)) {
      document.getElementById('cam-btn-angle')?.click();
      executed = true;
      applied.push('Camera: 45° Angle');
    }

    // Snapshot / Export
    if (/(snapshot|screenshot|photo|take picture|render image|export)/i.test(lower)) {
      if (this.app.dom.btnSubmitCreation) {
        this.app.dom.btnSubmitCreation.click();
        executed = true;
        applied.push('Export Studio Opened');
      }
    }

    // Procedural Sample Art Wrapper
    if (/(cyber art|art wrapper|wrap art|psychedelic|retro art|sample art)/i.test(lower)) {
      const artType = /psychedelic/i.test(lower) ? 'psych' : /retro/i.test(lower) ? 'retro' : 'cyber';
      this.app.generateSampleArt(artType);
      executed = true;
      triggerConfetti = true;
      applied.push(`Wrapped ${artType.toUpperCase()} Graphic`);
    }

    // ------------------------------------------------------------------------
    // 6. OFFICIAL PRESETS / FLAVOR EDITIONS
    // ------------------------------------------------------------------------
    const presetMatches = [
      { trigger: /(original|classic coke|iconic crimson)/i, id: 'original' },
      { trigger: /(zero sugar|zero coke|midnight matte)/i, id: 'zero' },
      { trigger: /(diet|diet crisp|brushed aluminum)/i, id: 'diet' },
      { trigger: /(starlight|galaxy|galactic|space coke)/i, id: 'starlight' },
      { trigger: /(wild cherry|cherry coke|cherry)/i, id: 'cherry' },
      { trigger: /(cyber lime|lime coke|citrus lime)/i, id: 'lime' }
    ];

    for (const p of presetMatches) {
      if (p.trigger.test(lower)) {
        const found = this.app.COLORWAY_PRESETS?.find(item => item.id === p.id);
        if (found) {
          this.app.selectColorway(found);
          this.updateScheme(found.base, found.accent, found.finish);
          executed = true;
          triggerConfetti = true;
          applied.push(`Edition: ${found.name}`);
          break;
        }
      }
    }

    // ------------------------------------------------------------------------
    // 7. CUSTOM NAME & TYPOGRAPHY
    // ------------------------------------------------------------------------
    const nameRegexes = [
      /(?:name\s+(?:it\s+)?(?:to|is|as|:)?\s*["']?([a-zA-Z0-9\s!@#$%^&*()_+=-]{1,18})["']?)/i,
      /(?:write\s+["']?([a-zA-Z0-9\s!@#$%^&*()_+=-]{1,18})["']?\s+(?:on|to))/i,
      /(?:call it\s+["']?([a-zA-Z0-9\s!@#$%^&*()_+=-]{1,18})["']?)/i,
      /(?:set title\s+(?:to|is)?\s*["']?([a-zA-Z0-9\s!@#$%^&*()_+=-]{1,18})["']?)/i,
      /(?:text\s+(?:to|is|:)?\s*["']?([a-zA-Z0-9\s!@#$%^&*()_+=-]{1,18})["']?)/i
    ];

    for (const rx of nameRegexes) {
      const match = input.match(rx);
      if (match && match[1]) {
        let extracted = match[1].trim();
        extracted = extracted.replace(/^(?:it|to|is|as)\s+/i, '').trim();
        extracted = extracted.replace(/\s+(with|and|make|chill|finish|matte|gloss|chrome).*$/i, '').trim();
        if (extracted.length > 0 && extracted.length <= 18) {
          this.app.textureMgr.updateState({ customName: extracted });
          if (this.app.dom.inputCustomName) this.app.dom.inputCustomName.value = extracted;
          if (this.app.dom.charCount) this.app.dom.charCount.textContent = `${extracted.length}/18`;
          executed = true;
          applied.push(`Name: "${extracted}"`);
          break;
        }
      }
    }

    // Font Style
    if (/(script font|cursive font|handwritten|pacifico)/i.test(lower)) {
      this.app.textureMgr.updateState({ fontStyle: 'script' });
      this.updateFontCards('script');
      executed = true;
      applied.push('Font: Pacifico Script');
    } else if (/(bebas font|bold font|impact font)/i.test(lower)) {
      this.app.textureMgr.updateState({ fontStyle: 'bebas' });
      this.updateFontCards('bebas');
      executed = true;
      applied.push('Font: Bebas Neue');
    } else if (/(syne font|modern font|futuristic font)/i.test(lower)) {
      this.app.textureMgr.updateState({ fontStyle: 'syne' });
      this.updateFontCards('syne');
      executed = true;
      applied.push('Font: Syne Modern');
    } else if (/(outfit font|clean font|minimal font)/i.test(lower)) {
      this.app.textureMgr.updateState({ fontStyle: 'outfit' });
      this.updateFontCards('outfit');
      executed = true;
      applied.push('Font: Outfit Clean');
    }

    // ------------------------------------------------------------------------
    // 8. FINISH & SURFACE MATERIAL
    // ------------------------------------------------------------------------
    if (/\b(matte|flat|satin)\b/i.test(lower) && !/\b(gloss|brushed|chrome)\b/i.test(lower)) {
      this.updateFinish('matte');
      executed = true;
      applied.push('Finish: Matte');
    } else if (/\b(gloss|glossy|shiny)\b/i.test(lower)) {
      this.updateFinish('gloss');
      executed = true;
      applied.push('Finish: Ultra Gloss');
    } else if (/\b(brushed|metallic|aluminum|brushed metal)\b/i.test(lower)) {
      this.updateFinish('brushed');
      executed = true;
      applied.push('Finish: Brushed Metal');
    } else if (/\b(chrome|mirror|specular)\b/i.test(lower)) {
      this.updateFinish('chrome');
      executed = true;
      applied.push('Finish: Mirror Chrome');
    }

    // ------------------------------------------------------------------------
    // 9. CHILL & DROPLETS
    // ------------------------------------------------------------------------
    const chillPctMatch = lower.match(/(?:chill|cold|temperature|frost)\s*(?:to|is|at)?\s*(\d{1,3})%?/i) ||
                          lower.match(/(\d{1,3})%\s*(?:chill|cold|frost)/i);

    if (chillPctMatch) {
      const val = Math.min(100, Math.max(0, parseInt(chillPctMatch[1], 10)));
      this.setChillLevel(val);
      executed = true;
      applied.push(`Chill Level: ${val}%`);
    } else if (/(freezing|ice cold|super cold|maximum chill|frosty|100% chill|extra droplets|frost)/i.test(lower) && !/no frost|remove/i.test(lower)) {
      this.setChillLevel(100);
      executed = true;
      applied.push('Chill Level: 100% Ice Cold');
    } else if (/(room temp|warm|no chill|0% chill|dry can|remove droplets|no frost|melt)/i.test(lower)) {
      this.setChillLevel(0);
      executed = true;
      applied.push('Chill Level: 0% Room Temp');
    } else if (/(more droplets|heavy frost|condensation|chilled)/i.test(lower)) {
      this.setChillLevel(85);
      executed = true;
      applied.push('Chill Level: 85% Frosty');
    }

    // ------------------------------------------------------------------------
    // 10. COLORS (Base, Accent, Pull-Tab)
    // ------------------------------------------------------------------------
    const tabMatch = lower.match(/(?:tab|pull tab|pull-tab)\s+(?:color\s+)?(?:to\s+)?([#a-z0-9]+)/i);
    if (tabMatch) {
      const col = this.resolveColor(tabMatch[1]);
      if (col) {
        this.app.setPullTab(col);
        executed = true;
        applied.push(`Pull Tab: ${col}`);
      }
    }

    const baseMatch = lower.match(/(?:base|body|primary|can color|background)\s+(?:color\s+)?(?:to\s+)?([#a-z0-9\s]+)/i);
    if (baseMatch) {
      const col = this.resolveColor(baseMatch[1]);
      if (col) {
        this.applyBaseColor(col);
        executed = true;
        applied.push(`Base Color: ${col}`);
      }
    }

    const accentMatch = lower.match(/(?:accent|trim|wave|secondary|highlight|text color)\s+(?:color\s+)?(?:to\s+)?([#a-z0-9\s]+)/i);
    if (accentMatch) {
      const col = this.resolveColor(accentMatch[1]);
      if (col) {
        this.applyAccentColor(col);
        executed = true;
        applied.push(`Accent Trim: ${col}`);
      }
    }

    if (!baseMatch && !accentMatch && !tabMatch) {
      const generalColorMatch = lower.match(/(?:make it|turn it|color it|paint it|set to)\s+([#a-z0-9\s]+)/i) ||
                                lower.match(/\b(neon green|cyber lime|matte black|hot pink|gold|purple|crimson|cyan|ice|yellow|orange|silver|white|ruby|emerald)\b/i);
      if (generalColorMatch) {
        const col = this.resolveColor(generalColorMatch[1]);
        if (col) {
          this.applyBaseColor(col);
          executed = true;
          applied.push(`Base Color: ${col}`);
        }
      }
    }

    // ------------------------------------------------------------------------
    // 11. COMPOSE FINAL CYBORG RESPONSE
    // ------------------------------------------------------------------------
    if (executed && applied.length > 0) {
      const uGreeting = this.preferences.userName ? ` for **${this.preferences.userName}**` : '';
      this.app.showToast(`✨ Cyborg applied ${applied.length} change${applied.length > 1 ? 's' : ''}!`, '🤖');
      return {
        executed: true,
        confetti: triggerConfetti,
        reply: `🚀 **Affirmative!** I have re-engineered your can specifications${uGreeting}:\n\n` +
               applied.map(a => `• **${a}**`).join('\n') +
               `\n\n*All 3D shaders, metallic reflections, and lighting have been refreshed.*`,
        tags: applied,
        variations: [
          { label: '🪞 Toggle Chrome', prompt: 'Make finish chrome' },
          { label: '🖤 Toggle Matte', prompt: 'Make finish matte' },
          { label: '🌊 Pour Coke into Glass', prompt: 'Pop open and pour Coke into glass' },
          { label: '🎲 Surprise Me', prompt: 'Surprise me with a random design' }
        ]
      };
    }

    // ------------------------------------------------------------------------
    // 12. PROCEDURAL CONCEPT SYNTHESIZER (Fallback for any creative theme)
    // ------------------------------------------------------------------------
    // If user asked for an unseen concept like "can i make a samurai edition", "neon tiger", "aurora borealis":
    const conceptExtract = lower.replace(/\b(can|edition|style|theme|look|like|soda|can i make|i want)\b/gi, '').trim();
    if (conceptExtract.length >= 3) {
      // Procedurally generate a bespoke aesthetic!
      const procTheme = this.synthesizeProceduralTheme(conceptExtract);
      this.applyBaseColor(procTheme.base);
      this.applyAccentColor(procTheme.accent);
      this.app.setPullTab(procTheme.tab);
      this.updateFinish(procTheme.finish);
      this.setChillLevel(procTheme.chill);
      this.app.textureMgr.updateState({ customName: procTheme.title.toUpperCase(), fontStyle: procTheme.fontStyle });
      if (this.app.dom.inputCustomName) this.app.dom.inputCustomName.value = procTheme.title.toUpperCase();

      this.updateScheme(procTheme.base, procTheme.accent, procTheme.finish);
      this.app.showToast(`✨ Generated ${procTheme.title} Edition!`, '🎨');

      return {
        executed: true,
        confetti: true,
        reply: `🎨 **Concept Synthesized!** I've architected a custom **${procTheme.title} Edition** for you:\n\n` +
               `• **Chassis Tone:** \`${procTheme.base}\`\n` +
               `• **Dynamic Trim:** \`${procTheme.accent}\`\n` +
               `• **Pull-Tab Accent:** \`${procTheme.tab}\`\n` +
               `• **Finish:** **${procTheme.finish.toUpperCase()} METALLIC**\n` +
               `• **Nameplate:** **${procTheme.title.toUpperCase()}**`,
        tags: [`Concept: ${procTheme.title}`, procTheme.finish.toUpperCase(), procTheme.base],
        variations: [
          { label: '🪞 Chrome Variant', prompt: `Make ${procTheme.title} chrome finish` },
          { label: '🖤 Matte Variant', prompt: `Make ${procTheme.title} matte finish` },
          { label: '❄️ 100% Freezing Chill', prompt: 'Make it 100% freezing frost' }
        ]
      };
    }

    // General Fallback
    return {
      executed: false,
      reply: `⚠️ I heard: *"${this.escapeHtml(input)}"*.\n\nYou can ask me for any theme or customization, for example:\n• *"Can I make a Batman edition can"* 🦇\n• *"Make a Spider-Man or Barbie can"* 🕸️\n• *"My favorite color is cyan and I prefer matte finish"* 👤\n• *"Build my signature can"* ⭐\n• *"Make base neon green and finish to chrome"* 🎨`,
      tags: ['Need clarification'],
      variations: [
        { label: '🦇 Batman Dark Knight', prompt: 'can i make a batman edition can' },
        { label: '🕸️ Spider-Man Edition', prompt: 'Make a spider-man edition can' },
        { label: '💖 Barbie Pink Dream', prompt: 'Make a barbie edition can' },
        { label: '👤 Build My Signature Can', prompt: 'Make a can for me based on my preferences' }
      ]
    };
  }

  // ==========================================================================
  // PROCEDURAL CONCEPT GENERATOR FOR ARBITRARY USER THEMES
  // ==========================================================================
  synthesizeProceduralTheme(conceptStr) {
    let hash = 0;
    for (let i = 0; i < conceptStr.length; i++) {
      hash = (hash << 5) - hash + conceptStr.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const hue = absHash % 360;
    const compHue = (hue + 140) % 360;

    const baseHex = this.app.hslToHex(hue, 85, 18); // Sleek dark body
    const accentHex = this.app.hslToHex(compHue, 95, 58); // High contrast vibrant trim
    const tabHex = this.app.hslToHex((hue + 45) % 360, 100, 50);

    const finishes = ['matte', 'gloss', 'brushed', 'chrome'];
    const finish = finishes[absHash % finishes.length];

    const fonts = ['bebas', 'syne', 'outfit', 'script'];
    const fontStyle = fonts[absHash % fonts.length];

    const cleanTitle = conceptStr.replace(/[^a-zA-Z0-9\s]/g, '').trim().slice(0, 14);

    return {
      title: cleanTitle.toUpperCase() || 'CUSTOM DROP',
      base: baseHex,
      accent: accentHex,
      tab: tabHex,
      finish,
      fontStyle,
      chill: 75 + (absHash % 25)
    };
  }

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================
  resolveColor(colorPhrase) {
    if (!colorPhrase) return null;
    const clean = colorPhrase.trim().toLowerCase();

    const hexMatch = clean.match(/#([0-9a-f]{3}|[0-9a-f]{6})\b/i);
    if (hexMatch) return hexMatch[0].toUpperCase();

    for (const [name, hex] of Object.entries(NAMED_COLORS)) {
      if (clean.includes(name)) {
        return hex;
      }
    }
    return null;
  }

  applyBaseColor(hex) {
    this.app.textureMgr.updateState({ baseColor: hex });
    this.app.scene.setShoulderColor(hex);
    if (this.app.dom.inputBaseColor) this.app.dom.inputBaseColor.value = hex;
    if (this.app.dom.labelBaseHex) this.app.dom.labelBaseHex.textContent = hex.toUpperCase();
    document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
    this.updateScheme(hex, this.app.textureMgr.state.accentColor, this.app.textureMgr.state.finish);
  }

  applyAccentColor(hex) {
    this.app.textureMgr.updateState({ accentColor: hex });
    if (this.app.dom.inputAccentColor) this.app.dom.inputAccentColor.value = hex;
    if (this.app.dom.labelAccentHex) this.app.dom.labelAccentHex.textContent = hex.toUpperCase();
    this.updateScheme(this.app.textureMgr.state.baseColor, hex, this.app.textureMgr.state.finish);
  }

  updateFinish(finish) {
    this.app.scene.setCanFinish(finish);
    this.app.textureMgr.updateState({ finish });
    this.app.dom.finishBtns?.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.finish === finish);
    });
    if (this.app.dom.chipFinish) {
      this.app.dom.chipFinish.textContent = finish.toUpperCase() + ' METALLIC';
    }
    this.updateScheme(this.app.textureMgr.state.baseColor, this.app.textureMgr.state.accentColor, finish);
  }

  setChillLevel(val) {
    if (this.app.dom.sliderFrostChill) this.app.dom.sliderFrostChill.value = val;
    if (this.app.dom.quickChillSlider) this.app.dom.quickChillSlider.value = val;
    if (this.app.dom.quickChillVal) this.app.dom.quickChillVal.textContent = `${val}%`;
    if (this.app.dom.lblFrostChill) {
      this.app.dom.lblFrostChill.textContent = val > 70 ? `Ice Cold (${val}%)` : val > 30 ? `Chilled (${val}%)` : `Room Temp (${val}%)`;
    }
    this.app.textureMgr.updateState({ chillLevel: val });
  }

  updateFontCards(fontStyle) {
    this.app.dom.fontCards?.forEach(card => {
      card.classList.toggle('active', card.dataset.font === fontStyle);
    });
  }

  shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.min(255, Math.max(0, parseInt(R * (100 + percent) / 100, 10)));
    G = Math.min(255, Math.max(0, parseInt(G * (100 + percent) / 100, 10)));
    B = Math.min(255, Math.max(0, parseInt(B * (100 + percent) / 100, 10)));

    const RR = (R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16);
    const GG = (G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16);
    const BB = (B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16);

    return "#" + RR + GG + BB;
  }

  hexToRgba(hex, alpha = 0.5) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
  }

  getCurrentTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="chat-code">$1</code>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n• /g, '<br/>• ');
  }
}
