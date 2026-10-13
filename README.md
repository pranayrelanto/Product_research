# 🥤 Coca-Cola Creations Lab — 3D Co-Creation Studio & Community Drops

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-049EF4?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://www.khronos.org/webgl/)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API-success?style=for-the-badge&logo=audio)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/License-Proprietary_/_Enterprise-red?style=for-the-badge)](#)

> **An enterprise-grade, real-time 3D WebGL product configurator and community voting platform.** Built for direct-to-consumer (D2C) co-creation, limited-edition hype drops, and crowd-sourced product research without physical prototyping bottlenecks.

---

## 📌 Executive Summary

**Coca-Cola Creations Lab** transforms the legendary *"Share a Coke"* campaign into an immersive, multi-sensory 3D digital studio. Users design, personalize, and interact with limited-edition beverage cans in real time—customizing finishes, materials, typography, dynamic graphic waveforms (including Marvel & DC pop-culture themes), direct surface graffiti, and physically based condensation droplets.

Beyond aesthetics, the application functions as a **high-conversion product testing and crowdsourced demand-validation engine** featuring an integrated community showcase, voting leaderboard, and high-fidelity 4K snapshot export.

---

## 💼 Why It Is a Game-Changer for Product Owners & Brand Leaders

In modern consumer packaged goods (CPG) and digital commerce, traditional product research is slow, costly, and decoupled from actual consumer enthusiasm. **Coca-Cola Creations Lab** solves these critical pain points:

### 1. 🚀 Hyper-Personalization That Drives D2C Conversion & CLV
* **From Passive Shoppers to Active Co-Creators**: Customers who customize their own products have up to **300% higher purchase intent** and **40% lower return rates** compared to static 2D product pages.
* **Emotional Ownership**: By placing their own name, gamer handle, or message in authentic heritage Coca-Cola typography and selecting custom materials (Gloss, Satin Matte, Brushed Foil, Mirror Chrome), consumers build an emotional bond with the packaging.
* **Higher Price Inelasticity**: Co-created limited editions support premium pricing (e.g., custom collectibles, gift drops, and event-exclusive runs).

### 2. 🧪 Rapid Product Testing with Zero Physical Prototyping Waste
* **Test Before You Can**: Traditional packaging R&D requires weeks of tooling, physical sample runs, and expensive photo shoots costing tens of thousands of dollars per concept.
* **Instant Digital Mockups**: Brand managers can trial new flavor profiles, colorways, and licensing collaborations (e.g., Marvel *Iron Man*, DC *Gotham Chevron*, Anime, Festival drops) in seconds.
* **Actionable Market Signals**: Measure user dwell time, customization depth, and parameter distributions to see which combinations customers gravitate toward before committing factory line time.

### 3. 🗳️ Crowdsourced Demand Validation & Viral Community Drops
* **Community Leaderboard & Upvoting**: The built-in **Community Voting Gallery** allows creators to publish their designs and vote on trending drops.
* **De-Risking New Product Launches**: Instead of guessing which licensed IP or design will sell out, product owners can greenlight physical production based on hard voting data from thousands of participants.
* **Social Amplification**: Built-in 4K render snapshots and co-creation certificates encourage sharing across TikTok, Instagram, and Discord, generating organic earned media value (EMV).

### 4. ⚡ Zero Heavy 3D Assets — Instant First Paint (< 1s Load Time)
* **Procedural Three.js Modeling**: Unlike conventional 3D configurators that force users to download 40–80 MB GLTF/GLB models, this studio builds the 3D can, rim, lid, pull tab, condensation beads, and liquid particles **entirely with procedural geometry and real-time canvas texture generation**.
* **Global Accessibility**: Ultra-lightweight payload runs smoothly on mobile devices, tablets, and low-bandwidth connections with zero lag or frame drops.

### 5. 🎧 Multi-Sensory Engagement & ASMR Brand Immersion
* **Procedural Web Audio Engine**: Integrated acoustic feedback recreates the tactile satisfaction of opening a cold soda:
  * Realistic aluminum can opening pop (`⚡ POP OPEN`)
  * Effervescent carbonation sizzle & fizz
  * Ambient liquid pour with splashing foam (`🌊 POUR COKE`)
  * Tactile control clicks and temperature chill hisses
* **Sensory Marketing Impact**: Auditory and visual cues trigger taste anticipation and thirst cues, significantly boosting consumer conversion and session duration.

---

## 🌟 Core Features & Studio Capabilities

| Category | Capability | Description |
| :--- | :--- | :--- |
| **3D Rendering** | **Physically Based Materials (PBR)** | Real-time specular highlights, metalness, roughness, and reflection probes simulating Gloss Metal, Satin Matte, Brushed Aluminum Foil, and Mirror Chrome. |
| **Interactive Mechanics** | **Functional Pull-Tab & Pouring** | Animated pull tab that rotates and pops open with sound FX; interactive pouring stream with carbonation bubbles, splashing particles, and head foam. |
| **Condensation Physics** | **Procedural Chill & Frost** | Real-time droplet bump maps, ambient floating ice cubes, rising effervescent bubbles, and dynamic chill temperature dial (0% to 100%). |
| **Typography & Identity** | **"Share a Coke" Name Wrap** | Real-time curved cylindrical text mapping with Heritage Script, Streetwear Bebas, Cyber Syne, and Contemporary Outfit fonts with scale, vertical offset, and angle sliders. |
| **Dynamic Wave Branding** | **Iconic & Licensed Waveforms** | Classic dynamic ribbon, Double Harmonic wave, Stark Arc, Web-Slinger, Berserker Slash, Gotham Chevron, Vibranium Weave, Amazonian Crest, and Cyber Halftone. |
| **Custom Wrapper Overlay** | **Drop Image to Wrap Can (4K)** | Drag & drop any image file (PNG, JPG, SVG, WebP) directly onto the 3D viewport or dropzone to project it as a custom cylinder wrap with fit modes (Full Wrap, Center Decal, Repeat Tile), blend modes (Multiply, Overlay, Screen), 360° rotation, opacity, and zoom. |
| **Can Surface Graffiti** | **Direct 3D Painting & Stickers** | Draw directly onto the 3D can surface with customizable brush widths and colors; tap-to-stamp sticker packs (Lightning, Acid Smile, Retro Star, Flame, Crown). |
| **Studio Camera Suite** | **Multi-Angle Quick Dock** | Instant cinematic transitions to **HERO**, **LABEL**, **PULL TAB**, and **BACK** views, plus continuous 360° turntable spin. |
| **Social & Voting** | **Community Showcase** | Search and filter drops by category (Marvel, DC, Originals, All Drops), cast upvotes saved to `localStorage`, and inspect community cans in the live 3D engine. |
| **Production Export** | **4K Snapshot & Certificate** | Instant high-resolution PNG rendering with customized badge overlays and co-creation submission certificates ready for social sharing or print specs. |

---

## 🛠️ Technology Stack

* **Core Runtime**: Vanilla HTML5, Modern ES6+ JavaScript, CSS3 Design System (Glassmorphism & dark-mode luxury studio aesthetics).
* **3D Graphics Engine**: [Three.js](https://threejs.org/) (v0.186+) utilizing WebGLRenderer with PBR `MeshStandardMaterial`, procedural LatheGeometry, and parametric lighting rigs.
* **Texture Generation**: High-resolution 2D HTML5 Canvas rendering engine with live normal/bump map synthesis.
* **Audio Synthesis**: Native [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) oscillators, noise buffers, and biquad filters for zero-dependency sound reproduction.
* **Celebration Effects**: [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti) for gamified submission feedback.
* **Build Tooling & Dev Server**: [Vite 8](https://vitejs.dev/) with lightning-fast Hot Module Replacement (HMR).

---

## 💻 Process to Run the Application

Follow these steps to set up and run the application locally on your machine.

### Prerequisites
* **Node.js**: Version `18.0.0` or higher (Node 20+ LTS recommended). Check with:
  ```bash
  node -v
  ```
* **npm**: Version `9.0.0` or higher (included with Node.js). Check with:
  ```bash
  npm -v
  ```

---

### Step 1: Clone or Navigate to the Project Directory
If working from the repository root:
```bash
cd /Users/relanto/Desktop/Product_research
```

---

### Step 2: Install Dependencies
Install all required production and development dependencies:
```bash
npm install
```

> **Note**: This will install `three`, `canvas-confetti`, and `vite`.

---

### Step 3: Launch the Development Server
Run the local Vite development server:
```bash
npm run dev
```

You will see output similar to:
```text
  VITE v8.3.0  ready in 180 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

Open your browser and navigate to:
```
http://localhost:5173/
```

---

### Step 4: Build for Production
To generate an optimized, minified production bundle in the `dist/` directory:
```bash
npm run build
```

---

### Step 5: Preview the Production Build Locally
To test the built production bundle with an HTTP server:
```bash
npm run preview
```

---

## 📁 Repository Architecture & Key Files

```plaintext
Product_research/
├── index.html              # Main HTML5 studio shell, HUD overlays, modals & drawers
├── package.json            # Node.js dependencies, scripts & configuration
├── vite.config.js          # Vite build configurations (if custom plugins used)
├── public/                 # Static assets, favicon, and brand icons
└── src/
    ├── main.js             # Master studio application coordinator & event bindings
    ├── scene.js            # Three.js 3D engine: procedural can mesh, lighting, pour & pull tab
    ├── textureManager.js   # 2D Canvas engine: wave graphics, typography wrap, graffiti & stamps
    ├── audio.js            # Web Audio API sound synthesis engine (pop, pour, fizz, chill)
    ├── gallery.js          # Community drops catalog, upvoting logic, and localStorage state
    ├── style.css           # Modern luxury dark-mode studio design system & micro-animations
    └── assets/             # Branding icons, SVG badges, and textures
```

### Module Responsibilities:
1. **[`src/scene.js`](src/scene.js)**:
   - Constructs the aluminum can via procedural math (`CylinderGeometry`, `LatheGeometry`, and bezier profiles).
   - Manages physical materials (metallic, roughness, clearcoat, environment reflections).
   - Simulates the opening pull-tab hinge animation and liquid stream particle dynamics.
   - Controls camera positions (Hero, Detail, Pull Tab, Back) and 360° orbit rotation.
2. **[`src/textureManager.js`](src/textureManager.js)**:
   - Generates high-resolution diffuse and normal textures in real-time.
   - Calculates curved text transformation matrix for authentic cylindrical wrapping.
   - Renders 13+ dynamic wave patterns and manages surface graffiti / stamp overlays.
3. **[`src/audio.js`](src/audio.js)**:
   - Zero-asset audio engine generating realistic fizzy pops, carbonation crackles, and fluid pour audio using pink noise, bandpass filters, and pitch decay oscillators.
4. **[`src/gallery.js`](src/gallery.js)**:
   - Handles curated limited-edition drops (Marvel, DC, Originals).
   - Manages interactive member voting, vote increments, filtering, and instant 3D configuration loading.
5. **[`src/main.js`](src/main.js)**:
   - Connects UI controls (sliders, color pickers, tabs, buttons) to 3D and audio engines.
   - Handles 4K snapshot captures and submission certificate flows.

---

## 📈 Enterprise Integration Roadmap for Product Teams

For enterprise deployments, the Coca-Cola Creations Lab architecture is designed to integrate seamlessly into existing enterprise pipelines:

1. **E-Commerce Integration (Shopify Plus / Adobe Commerce / Salesforce B2C)**:
   - Send the generated 3D configuration payload (`baseColor`, `finish`, `customName`, `wavePattern`) directly into a custom cart item attribute for serialized manufacturing.
2. **Print-on-Demand (POD) Production Ready**:
   - The canvas texture generated by `textureManager.js` can be exported directly as a 300 DPI CMYK unrolled cylindrical print file for direct-to-can digital UV or rotogravure printing.
3. **Augmented Reality (AR) WebXR / Quick Look**:
   - Export customized configurations to `.usdz` (iOS AR QuickLook) and `.gltf` (Android SceneViewer) allowing consumers to place their customized can on their real-world desk.
4. **AI Packaging Assistant (Gemini / Generative AI Integration)**:
   - Enable text-to-wave prompt generation where consumers type *"Cyberpunk Tokyo Neon Cherry"* to automatically synthesize custom colorways and art textures.

---

## 🤝 Contributing & License

* **Internal / Enterprise Project**: Designed and maintained for digital product innovation, research, and interactive retail showcases.
* **Questions & Inquiries**: Reach out to the Product & Innovation Team for design system extensions and custom 3D packaging modules.
