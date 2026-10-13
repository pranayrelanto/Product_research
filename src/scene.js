import * as THREE from 'three';

export class StudioScene {
  constructor(containerElement, onPopStateChanged, onPourStateChanged, onPourProgress, onPrepStateChanged, onIceLanded, onGlassDismissStateChanged) {
    this.container = containerElement;
    this.onPopStateChanged = onPopStateChanged;
    this.onPourStateChanged = onPourStateChanged;
    this.onPourProgress = onPourProgress;
    this.onPrepStateChanged = onPrepStateChanged;
    this.onIceLanded = onIceLanded;
    this.onGlassDismissStateChanged = onGlassDismissStateChanged;
    this.width = containerElement.clientWidth;
    this.height = containerElement.clientHeight;

    // State
    this.autoRotate = false;
    this.autoRotateSpeed = 0.8;
    this.targetCameraPos = new THREE.Vector3(0, 0, 8.0);
    this.targetLookAt = new THREE.Vector3(0.95, 0.0, 0.1);
    this.isUserInteracting = false;
    this.fizzParticleSpeed = 1.0;
    this.iceCubesVisible = true;

    // Can Pop-Up State
    this.isPopped = false;
    this.currentTabRot = 0;
    this.targetTabRot = 0;
    this.currentFlapRot = 0;
    this.targetFlapRot = 0;

    // Glass Entrance & Ice Cascade (Exactly 3.0s prep before pour)
    this.isGlassPrepping = false;
    this.glassPrepDuration = 3.0; // 3 seconds from glass arriving to ice filling
    this.glassPrepElapsed = 0;
    this.glassRestPos = new THREE.Vector3(2.10, -0.725, 0.15);
    this.glassStartPos = new THREE.Vector3(4.8, 0.9, -6.5);

    // Glass Dismissal (Glide back to background)
    this.isGlassDismissing = false;
    this.glassDismissDuration = 1.2; // 1.2s smooth retreat into distance
    this.glassDismissElapsed = 0;

    // Coke Pour State & 4s Pour Timing
    this.isPouring = false;
    this.pourDuration = 4.0; // Exactly 4 seconds continuous pour to fill glass 100%
    this.pourElapsed = 0;
    this.pourProgress = 0;
    this.cokeEruptionActive = false;
    this.cokeEruptionTimer = 0;
    this.canPos = new THREE.Vector3(0, 0, 0);
    this.targetCanPos = new THREE.Vector3(0, 0, 0);
    this.canTilt = { x: 0, y: 0, z: 0 };
    this.targetCanTilt = { x: 0, y: 0, z: 0 };

    // Mouse / Interaction tracking
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.cameraDistance = 8.0;
    this.cameraRotation = { x: 0.08, y: 0.0 }; // spherical angles
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.initScene();
    this.createStudioEnvironment();
    this.createLights();
    this.createCanModel();
    this.createGlassModel();
    this.createCokePourSystem();
    this.createAtmosphere();
    this.setupEvents();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null;

    this.camera = new THREE.PerspectiveCamera(40, this.width / this.height, 0.1, 100);
    this.camera.position.set(0, 0.2, this.cameraDistance);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  createStudioEnvironment() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x0e0e16);

    // 1. Giant Top Softbox (photographic studio key light)
    const topLightGeom = new THREE.PlaneGeometry(24, 24);
    const topLightMat = new THREE.MeshBasicMaterial({ color: 0xfff8f0 });
    const topLight = new THREE.Mesh(topLightGeom, topLightMat);
    topLight.position.set(0, 10, 1);
    topLight.rotation.x = Math.PI / 2;
    envScene.add(topLight);

    // 2. Main Key Light Softbox — warm white
    const keyPanelGeom = new THREE.PlaneGeometry(10, 18);
    const keyPanelMat = new THREE.MeshBasicMaterial({ color: 0xfff0e0 });
    const keyPanel = new THREE.Mesh(keyPanelGeom, keyPanelMat);
    keyPanel.position.set(-7, 4, 7);
    keyPanel.rotation.y = Math.PI / 4;
    envScene.add(keyPanel);

    // 3. Cool Rim Softbox (neutral silver softbox for metals and glass)
    const rimPanelGeom = new THREE.PlaneGeometry(8, 18);
    const rimPanelMat = new THREE.MeshBasicMaterial({ color: 0xdde6f2 });
    const rimPanel = new THREE.Mesh(rimPanelGeom, rimPanelMat);
    rimPanel.position.set(8, 5, -5);
    rimPanel.rotation.y = -Math.PI / 3;
    envScene.add(rimPanel);

    // 4. Warm amber backlight panel (gives amber glow through cola liquid)
    const amberPanelGeom = new THREE.PlaneGeometry(6, 8);
    const amberPanelMat = new THREE.MeshBasicMaterial({ color: 0xff8800 });
    const amberPanel = new THREE.Mesh(amberPanelGeom, amberPanelMat);
    amberPanel.position.set(4, 1, -7);
    amberPanel.rotation.y = -Math.PI * 0.15;
    envScene.add(amberPanel);

    // 5. Ground Bounce — deep dark floor for contrast
    const floorBounceGeom = new THREE.PlaneGeometry(20, 20);
    const floorBounceMat = new THREE.MeshBasicMaterial({ color: 0x1a1a28 });
    const floorBounce = new THREE.Mesh(floorBounceGeom, floorBounceMat);
    floorBounce.position.set(0, -7, 0);
    floorBounce.rotation.x = -Math.PI / 2;
    envScene.add(floorBounce);

    // 6. Front Studio Softbox Panel — provides soft ambient reflection so metallic cans don't reflect black void
    const frontFillGeom = new THREE.PlaneGeometry(24, 20);
    const frontFillMat = new THREE.MeshBasicMaterial({ color: 0x5a6578 });
    const frontFill = new THREE.Mesh(frontFillGeom, frontFillMat);
    frontFill.position.set(0, 3, 11);
    frontFill.rotation.y = Math.PI;
    envScene.add(frontFill);

    const envTarget = pmremGenerator.fromScene(envScene, 0.02);
    this.scene.environment = envTarget.texture;
    this.envTexture = envTarget.texture;
  }

  createLights() {
    // Global ambient — dim so studio lights define the drama
    const ambientLight = new THREE.AmbientLight(0xd0dff8, 0.75);
    this.scene.add(ambientLight);

    // Main key: warm white top-left area light
    this.keyLight = new THREE.DirectionalLight(0xfff8f0, 3.8);
    this.keyLight.position.set(-3, 6, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 2048;
    this.keyLight.shadow.mapSize.height = 2048;
    this.keyLight.shadow.bias = -0.0003;
    this.keyLight.shadow.camera.near = 0.1;
    this.keyLight.shadow.camera.far = 25;
    this.keyLight.shadow.camera.left = -6;
    this.keyLight.shadow.camera.right = 6;
    this.keyLight.shadow.camera.top = 6;
    this.keyLight.shadow.camera.bottom = -6;
    this.scene.add(this.keyLight);

    // Neutral silver rim light — gives crisp specular glints on aluminum and glass without blue tint
    this.rimLight = new THREE.DirectionalLight(0xe2ebf5, 2.5);
    this.rimLight.position.set(6, 3, -5);
    this.scene.add(this.rimLight);

    // Front fill (soft warm)
    this.fillLight = new THREE.DirectionalLight(0xffeedd, 1.5);
    this.fillLight.position.set(0.5, 0, 7);
    this.scene.add(this.fillLight);

    // Top studio spot — casts clean top highlight on glass rim and can lid
    this.topSpot = new THREE.SpotLight(0xffffff, 5.0);
    this.topSpot.position.set(1, 8, 0.5);
    this.topSpot.angle = Math.PI / 5;
    this.topSpot.penumbra = 0.45;
    this.topSpot.castShadow = true;
    this.topSpot.shadow.mapSize.width = 1024;
    this.topSpot.shadow.mapSize.height = 1024;
    this.scene.add(this.topSpot);

    // Warm amber back light that passes through the cola glass — simulates backlit bar setup
    this.amberBackLight = new THREE.PointLight(0xff6a00, 4.0, 12.0);
    this.amberBackLight.position.set(3.2, -0.5, -3.5);
    this.scene.add(this.amberBackLight);

    // Cool under-glow for ice cubes (fridge-like illumination)
    const iceUnderLight = new THREE.PointLight(0x99ddff, 2.5, 6.0);
    iceUnderLight.position.set(2.0, -2.5, 1.0);
    this.scene.add(iceUnderLight);

    const bottomLight = new THREE.DirectionalLight(0xa0c8ff, 0.9);
    bottomLight.position.set(0, -5, 2);
    this.scene.add(bottomLight);
  }

  // ==========================================================================
  // ==========================================================================
  // PROCEDURAL 202 SOT STAMPED LID TEXTURE & SCORELINE GENERATOR
  // Matches exact 202 SOT CAD topography:
  // - Directional concentric circular brushed grain (5182 aluminum alloy)
  // - Countersink expansion groove ambient occlusion trough
  // - Inward chuck wall gradient (12 to 14 degrees)
  // - Recessed kidney-shaped pour opening scoreline & anti-fracture micro-scores
  // - Structural parenthesis stiffener ribs `(` and `)`
  // - Smile-shaped debossed crescent under finger well
  // - Cold-extruded central rivet base ring
  // ==========================================================================
  createLidStampingTexture() {
    const size = 1024;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2;
    const cy = size / 2;

    // 1. Base 5182 Stamped Aluminum Neutral Gray (neutral alloy, no blue tint)
    ctx.fillStyle = '#d2d6de';
    ctx.fillRect(0, 0, size, size);

    // 2. Micro-brushed Satin Metallic Directional Concentric Circular Grain
    for (let r = 8; r < 490; r += 2) {
      const alpha = 0.03 + Math.random() * 0.05;
      ctx.strokeStyle = Math.random() > 0.5 ? `rgba(255,255,255,${alpha})` : `rgba(0,0,0,${alpha * 0.8})`;
      ctx.lineWidth = 1 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // 3. Peripheral Curl & Seam Crown Highlights (59.43mm to 53.97mm)
    // Outer downward curling radius highlight
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, 480, 0, Math.PI * 2);
    ctx.stroke();

    // Seamed visual face inner edge shadow
    ctx.strokeStyle = 'rgba(60, 65, 75, 0.45)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, 460, 0, Math.PI * 2);
    ctx.stroke();

    // 4. Chuck Wall 12-14 Degree Inward Slope Gradient
    const chuckGrad = ctx.createRadialGradient(cx, cy, 395, cx, cy, 455);
    chuckGrad.addColorStop(0, 'rgba(35, 38, 46, 0.60)');   // Deep shadow near countersink floor
    chuckGrad.addColorStop(0.7, 'rgba(85, 90, 100, 0.25)');
    chuckGrad.addColorStop(1, 'rgba(255, 255, 255, 0.35)'); // Top rim highlight
    ctx.fillStyle = chuckGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, 455, 0, Math.PI * 2);
    ctx.fill();

    // 5. Countersink Groove (6.85 mm Deep Circular Expansion Groove)
    // Deep precision expansion groove trough running concentric to perimeter
    const moatR = 405;
    ctx.strokeStyle = '#22252c'; // Deep ambient occlusion shadow inside groove
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(cx, cy, moatR, 0, Math.PI * 2);
    ctx.stroke();

    // Specular highlight on countersink inner & outer rims
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(cx, cy, moatR - 11, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, moatR + 11, 0, Math.PI * 2);
    ctx.stroke();

    // 6. Central Chuck Panel Stamped Details
    // Map Canvas local coords directly to 3D coords:
    // With ctx.scale(1, -1), +X_local is +X_3D (right), +Y_local is +Z_3D (front/pour mouth)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, -1);

    // Outer Debossed Stiffener Contour enclosing opening & rivet
    ctx.fillStyle = 'rgba(60, 65, 75, 0.12)';
    ctx.strokeStyle = '#50545e';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-90, 40);
    ctx.bezierCurveTo(-140, 110, -135, 270, 0, 318);
    ctx.bezierCurveTo(135, 270, 140, 110, 90, 40);
    ctx.bezierCurveTo(60, -25, -60, -25, -90, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Symmetrical Parenthesis Stiffener Ribs `(` and `)` bracketing the tab
    // Left parenthesis rib `(` at -X
    ctx.strokeStyle = '#1e222a';
    ctx.lineWidth = 11;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-82, -40);
    ctx.bezierCurveTo(-122, 60, -122, 170, -56, 275);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-78, -40);
    ctx.bezierCurveTo(-118, 60, -118, 170, -52, 273);
    ctx.stroke();

    // Right parenthesis rib `)` at +X
    ctx.strokeStyle = '#1e222a';
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(82, -40);
    ctx.bezierCurveTo(122, 60, 122, 170, 56, 275);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(78, -40);
    ctx.bezierCurveTo(118, 60, 118, 170, 52, 273);
    ctx.stroke();

    // Horizontal Stiffener Rib above mouth flap
    ctx.strokeStyle = '#1e222a';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(-72, 312);
    ctx.lineTo(72, 312);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(-70, 315);
    ctx.lineTo(70, 315);
    ctx.stroke();

    // Smile-Shaped Debossed Crescent Under Finger Loop (-Z / bottom)
    ctx.strokeStyle = '#1e222a';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(-115, -140);
    ctx.bezierCurveTo(-85, -285, 85, -285, 115, -140);
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(-112, -138);
    ctx.bezierCurveTo(-82, -280, 82, -280, 112, -138);
    ctx.stroke();

    // Finger Well Depression directly under tab pull ring (centered at Z = -0.38 -> Y = -196)
    const fingerWellGrad = ctx.createRadialGradient(0, -196, 10, 0, -196, 95);
    fingerWellGrad.addColorStop(0, 'rgba(25, 28, 35, 0.40)');
    fingerWellGrad.addColorStop(0.7, 'rgba(55, 60, 70, 0.18)');
    fingerWellGrad.addColorStop(1, 'rgba(255, 255, 255, 0.35)');
    ctx.fillStyle = fingerWellGrad;
    ctx.beginPath();
    ctx.arc(0, -196, 95, 0, Math.PI * 2);
    ctx.fill();

    // 7. Aerosol Panel Face: Recessed Kidney-Shaped Pour-Spout Score Line & Anti-Fracture Scores
    // Centered at Z = +0.38 -> Y = +196 px, matching 3D cavity and flap meshes exactly
    const pourY = 196;
    const pourRadiusX = 88;
    const pourRadiusY = 109;

    // Outer parallel Anti-Fracture Score Lines (Micro-grooves stamped neatly parallel to prevent tearing)
    ctx.strokeStyle = 'rgba(40, 45, 55, 0.65)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, pourY, pourRadiusX + 10, pourRadiusY + 11, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, pourY, pourRadiusX + 12, pourRadiusY + 13, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Primary Recessed Kidney-Shaped Pour Score Line
    ctx.strokeStyle = '#14171e'; // Deep incision groove
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.ellipse(0, pourY, pourRadiusX, pourRadiusY, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Precision stamped reflective lip on main score
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(0, pourY, pourRadiusX + 3.5, pourRadiusY + 3.5, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Embossed Stiffener Bead inside scored flap
    ctx.strokeStyle = 'rgba(45, 50, 60, 0.5)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(0, pourY, pourRadiusX * 0.55, pourRadiusY * 0.58, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 8. The Rivet Base Ring (cold-extruded bubble-button rivet base)
    ctx.strokeStyle = '#22252c';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(0, 0, 36, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 41, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    return tex;
  }

  // ==========================================================================
  // INDUSTRY-STANDARD 202 SOT ALUMINUM CAN END CAD GEOMETRY
  // Exact dimensions & tolerances:
  // • Outer Rim Pre-seamed Curl Diameter: 59.43 mm -> Radius 0.990
  // • Seamed Visual Face Diameter: 53.97 mm -> Radius 0.940
  // • Countersink Depth: 6.85 mm -> Depth 0.238
  // • Chuck Wall: 12 to 14 degree inward slope
  // • Central Chuck Panel Floor: Height (lidTopY - 0.140)
  // • Single continuous, watertight, 100% solid stamped 5182 aluminum mesh
  // ==========================================================================
  buildIndustry202LidGeometry(lidTopY) {
    // Exact 202 SOT CAD profile ordered from outer curl to center (normals face UPWARDS):
    // • Outer Rim Pre-seamed Curl Diameter: 59.43 mm -> Radius 0.990
    // • Seamed Visual Face Diameter: 53.97 mm -> Radius 0.940
    // • Countersink Depth: 6.85 mm -> Depth 0.238
    // • Chuck Wall: 12 to 14 degree inward slope
    // • Central Chuck Panel Floor: Height (lidTopY - 0.140)
    const profile = [
      new THREE.Vector2(0.978, lidTopY - 0.090),
      new THREE.Vector2(0.985, lidTopY - 0.075),
      new THREE.Vector2(0.990, lidTopY - 0.035),
      new THREE.Vector2(0.975, lidTopY - 0.005),
      new THREE.Vector2(0.955, lidTopY - 0.000), // Top seam crown
      new THREE.Vector2(0.935, lidTopY - 0.010),
      new THREE.Vector2(0.890, lidTopY - 0.060), // Chuck wall (13 deg slope)
      new THREE.Vector2(0.825, lidTopY - 0.210),
      new THREE.Vector2(0.805, lidTopY - 0.238), // Countersink expansion groove trough
      new THREE.Vector2(0.785, lidTopY - 0.238),
      new THREE.Vector2(0.765, lidTopY - 0.220),
      new THREE.Vector2(0.740, lidTopY - 0.140), // Chuck panel floor
      new THREE.Vector2(0.001, lidTopY - 0.140)  // Center at rivet
    ];

    const geom = new THREE.LatheGeometry(profile, 64);
    // Planar UV projection from top-down so stamping texture maps with 100% precision:
    const pos = geom.attributes.position;
    const uvs = geom.attributes.uv;
    const maxR = 0.990;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const pz = pos.getZ(i);
      uvs.setXY(i, (px / (2 * maxR)) + 0.5, (pz / (2 * maxR)) + 0.5);
    }
    uvs.needsUpdate = true;
    geom.computeVertexNormals();
    return geom;
  }

  createCanModel() {
    this.canGroup = new THREE.Group();

    const canRadius = 1.15;
    const canHeight = 3.6;
    const neckRadius = 0.98;
    const neckHeight = 0.35;
    const rimRadius = 1.02;
    const rimThickness = 0.045;
    const bottomRadius = 0.92;
    const bottomHeight = 0.25;

    // Materials
    this.bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.58,
      roughness: 0.09,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 1.5
    });

    this.aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0xd6dae2,
      metalness: 0.88,
      roughness: 0.25,
      envMapIntensity: 1.2
    });

    // Realistic Stamped 5182 Aluminum Lid Material (Concentric satin brushed finish)
    this.lidStampingTexture = this.createLidStampingTexture();
    this.lidMaterial = new THREE.MeshStandardMaterial({
      color: 0xd2d6de,
      metalness: 0.88,
      roughness: 0.28, // Micro-brushed satin metallic surface
      map: this.lidStampingTexture,
      bumpMap: this.lidStampingTexture,
      bumpScale: 0.055, // Clean tactile relief for countersink, scores, and ribs
      envMapIntensity: 1.1,
      side: THREE.DoubleSide // Guaranteed visible from every camera angle
    });

    // Customizable SOT Tab Material
    this.pullTabMaterial = new THREE.MeshStandardMaterial({
      color: 0xc8ccd4,
      metalness: 0.90,
      roughness: 0.20,
      envMapIntensity: 1.3
    });

    // Neck / Shoulder Material (Colored can metal matching photo)
    this.neckMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4002b,
      metalness: 0.65,
      roughness: 0.15,
      envMapIntensity: 1.5
    });

    // --- Mesh 1: Main Cylindrical Body ---
    const bodyGeom = new THREE.CylinderGeometry(canRadius, canRadius, canHeight, 64, 32, true);
    bodyGeom.rotateY(Math.PI * 0.75);
    this.bodyMesh = new THREE.Mesh(bodyGeom, this.bodyMaterial);
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.canGroup.add(this.bodyMesh);

    // --- Mesh 2: Top Tapered Shoulder/Neck ---
    const neckGeom = new THREE.CylinderGeometry(neckRadius, canRadius, neckHeight, 64, 8, true);
    neckGeom.translate(0, canHeight / 2 + neckHeight / 2, 0);
    this.neckMesh = new THREE.Mesh(neckGeom, this.neckMaterial);
    this.neckMesh.castShadow = true;
    this.canGroup.add(this.neckMesh);

    // ========================================================================
    // UNIFIED INDUSTRY-STANDARD 202 SOT ALUMINUM CAN END (CAD PROFILE)
    // 100% Watertight, solid stamped 5182 aluminum, no seam gaps or transparency
    // ========================================================================
    const lidTopY = canHeight / 2 + neckHeight;

    const lidGeom = this.buildIndustry202LidGeometry(lidTopY);
    this.lidMesh = new THREE.Mesh(lidGeom, this.lidMaterial);
    this.lidMesh.castShadow = true;
    this.lidMesh.receiveShadow = true;
    this.canGroup.add(this.lidMesh);

    // Mouth Spout Anchor in local can space (for tracking pour origin in world coords)
    this.mouthAnchor = new THREE.Object3D();
    this.mouthAnchor.position.set(0, lidTopY - 0.138, 0.38);
    this.canGroup.add(this.mouthAnchor);

    // --- C. Mouth Opening Hole & Scored Opening Flap ---
    const mouthCenterZ = 0.38;
    const mouthWidth = 0.34;
    const mouthLength = 0.42;

    // 1. Dark Interior Liquid Opening Cavity (Hidden when CLOSED, revealed when POPPED)
    const cavityShape = new THREE.Shape();
    cavityShape.absellipse(0, 0, mouthWidth * 0.5, mouthLength * 0.5, 0, Math.PI * 2);
    this.cavityMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(cavityShape),
      new THREE.MeshBasicMaterial({ color: 0x050508 })
    );
    this.cavityMesh.rotation.x = -Math.PI / 2;
    this.cavityMesh.position.set(0, lidTopY - 0.138, mouthCenterZ);
    this.cavityMesh.visible = false; // 100% CLOSED BY DEFAULT!
    this.canGroup.add(this.cavityMesh);

    // 2. Scored Mouth Flap (Hinged at back edge, depresses down into can when popped open!)
    this.mouthFlapGroup = new THREE.Group();
    this.mouthFlapGroup.position.set(0, lidTopY - 0.138, mouthCenterZ - mouthLength * 0.42);
    this.mouthFlapGroup.visible = false; // 100% CLOSED BY DEFAULT!

    const flapShape = new THREE.Shape();
    flapShape.absellipse(0, mouthLength * 0.42, mouthWidth * 0.46, mouthLength * 0.46, 0, Math.PI * 2);
    const flapGeom = new THREE.ExtrudeGeometry(flapShape, {
      depth: 0.012,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.004,
      bevelThickness: 0.004
    });
    flapGeom.rotateX(Math.PI / 2);

    this.mouthFlapMesh = new THREE.Mesh(flapGeom, this.aluminumMaterial);
    this.mouthFlapMesh.castShadow = true;
    this.mouthFlapGroup.add(this.mouthFlapMesh);
    this.canGroup.add(this.mouthFlapGroup);

    // --- D. Detailed Authentic 5182-H48 Stay-on-Tab (SOT) matching CAD spec ---
    this.pullTabGroup = new THREE.Group();
    this.pullTabGroup.position.set(0, lidTopY - 0.136, 0);

    const tabShape = new THREE.Shape();
    // 1. Rolled-edge Stay-on-tab contour (5182-H48 rigid aluminum)
    tabShape.moveTo(-0.16, -0.18);
    tabShape.lineTo(-0.16, -0.42);
    // Smooth round bottom arch for finger pull
    tabShape.quadraticCurveTo(-0.16, -0.56, 0, -0.56);
    tabShape.quadraticCurveTo(0.16, -0.56, 0.16, -0.42);
    tabShape.lineTo(0.16, -0.18);
    // Tapered waist past rivet
    tabShape.lineTo(0.13, 0.04);
    // Flat press-nose resting exactly flush over score line
    tabShape.quadraticCurveTo(0.12, 0.26, 0, 0.28);
    tabShape.quadraticCurveTo(-0.12, 0.26, -0.13, 0.04);
    tabShape.lineTo(-0.16, -0.18);
    tabShape.closePath();

    // 2. Functional finger ring hole on rear side
    const fingerHole = new THREE.Path();
    fingerHole.absellipse(0, -0.38, 0.088, 0.115, 0, Math.PI * 2, true);
    tabShape.holes.push(fingerHole);

    // 3. Horseshoe C-slot cutout around central rivet
    const cSlot = new THREE.Path();
    cSlot.moveTo(-0.055, 0.07);
    cSlot.lineTo(-0.055, -0.04);
    cSlot.absarc(0, -0.04, 0.055, Math.PI, 0, true);
    cSlot.lineTo(0.055, 0.07);
    cSlot.lineTo(0.038, 0.07);
    cSlot.lineTo(0.038, -0.04);
    cSlot.absarc(0, -0.04, 0.038, 0, Math.PI, false);
    cSlot.lineTo(-0.038, 0.07);
    cSlot.closePath();
    tabShape.holes.push(cSlot);

    // 4. Trapezoidal window cutout in tab lever nose
    const noseWindow = new THREE.Path();
    noseWindow.moveTo(-0.065, 0.11);
    noseWindow.lineTo(0.065, 0.11);
    noseWindow.lineTo(0.048, 0.22);
    noseWindow.lineTo(-0.048, 0.22);
    noseWindow.closePath();
    tabShape.holes.push(noseWindow);

    const tabExtrudeSettings = {
      depth: 0.020,
      bevelEnabled: true,
      bevelSegments: 4, // Smooth rolled hem edge
      steps: 1,
      bevelSize: 0.010,
      bevelThickness: 0.010
    };

    const tabGeom = new THREE.ExtrudeGeometry(tabShape, tabExtrudeSettings);
    tabGeom.rotateX(Math.PI / 2); // Aligned with +Z: Nose at +0.28, Ring at -0.56

    this.tabLeverMesh = new THREE.Mesh(tabGeom, this.pullTabMaterial);
    this.tabLeverMesh.castShadow = true;
    this.pullTabGroup.add(this.tabLeverMesh);

    // Transverse stiffener crossbar across the center
    const crossbarGeom = new THREE.BoxGeometry(0.22, 0.020, 0.032);
    crossbarGeom.translate(0, 0.014, -0.18);
    const crossbarMesh = new THREE.Mesh(crossbarGeom, this.pullTabMaterial);
    this.pullTabGroup.add(crossbarMesh);

    // 1. The Rivet: Central, integral cold-extruded bubble-button rivet fixing the tab securely exactly at the center of the lid
    const rivetGeom = new THREE.CylinderGeometry(0.065, 0.065, 0.035, 32);
    rivetGeom.translate(0, lidTopY - 0.125, 0);
    const rivetMesh = new THREE.Mesh(rivetGeom, this.aluminumMaterial);
    this.canGroup.add(rivetMesh);

    const rivetDimpleGeom = new THREE.CylinderGeometry(0.026, 0.026, 0.038, 16);
    rivetDimpleGeom.translate(0, lidTopY - 0.118, 0);
    const rivetDimpleMesh = new THREE.Mesh(
      rivetDimpleGeom,
      new THREE.MeshStandardMaterial({ color: 0x5a5e66, metalness: 0.92, roughness: 0.35 })
    );
    this.canGroup.add(rivetDimpleMesh);

    this.canGroup.add(this.pullTabGroup);

    // --- Mesh 6: Bottom Taper & Concave Dome Base ---
    const bottomTaperGeom = new THREE.CylinderGeometry(canRadius, bottomRadius, bottomHeight, 64, 8, true);
    bottomTaperGeom.translate(0, -canHeight / 2 - bottomHeight / 2, 0);
    const bottomTaperMesh = new THREE.Mesh(bottomTaperGeom, this.aluminumMaterial);
    bottomTaperMesh.castShadow = true;
    this.canGroup.add(bottomTaperMesh);

    const domeGeom = new THREE.SphereGeometry(bottomRadius * 0.95, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    domeGeom.rotateX(Math.PI);
    domeGeom.translate(0, -canHeight / 2 - bottomHeight + 0.08, 0);
    const domeMesh = new THREE.Mesh(domeGeom, this.aluminumMaterial);
    this.canGroup.add(domeMesh);

    const bottomRimGeom = new THREE.TorusGeometry(bottomRadius, 0.04, 16, 64);
    bottomRimGeom.rotateX(Math.PI / 2);
    bottomRimGeom.translate(0, -canHeight / 2 - bottomHeight, 0);
    const bottomRimMesh = new THREE.Mesh(bottomRimGeom, this.aluminumMaterial);
    this.canGroup.add(bottomRimMesh);

    // --- Ground Pedestal & Blurred Contact Shadow ---
    const pedestalRingGeom = new THREE.RingGeometry(1.6, 2.5, 64);
    const pedestalRingMat = new THREE.MeshBasicMaterial({
      color: 0x141824,
      transparent: true,
      opacity: 0.30,
      side: THREE.DoubleSide
    });
    const pedestalRing = new THREE.Mesh(pedestalRingGeom, pedestalRingMat);
    pedestalRing.rotation.x = -Math.PI / 2;
    pedestalRing.position.y = -canHeight / 2 - bottomHeight - 0.03;
    this.scene.add(pedestalRing);

    const shadowGeom = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d');
    const radGrad = sctx.createRadialGradient(128, 128, 15, 128, 128, 120);
    radGrad.addColorStop(0, 'rgba(0,0,0,0.85)');
    radGrad.addColorStop(0.35, 'rgba(0,0,0,0.4)');
    radGrad.addColorStop(0.7, 'rgba(0,0,0,0.1)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = radGrad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    this.shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, this.shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -canHeight / 2 - bottomHeight - 0.02;
    this.scene.add(shadowMesh);

    this.scene.add(this.canGroup);
  }

  // ==========================================================================
  // PHOTOREALISTIC 3D DRINKING GLASS WITH ICE & COKE
  // ==========================================================================
  createGlassModel() {
    this.glassGroup = new THREE.Group();
    // Glass is NOT present at start; hidden and placed deep in background
    this.glassGroup.position.copy(this.glassStartPos);
    this.glassGroup.scale.set(0.15, 0.15, 0.15);
    this.glassGroup.visible = false;

    // ── 1. AUTHENTIC FACETED TUMBLER (OCTAGONAL BASE TO ROUND RIM) ─────────────
    // Matches the classic Picardie / Gibraltar faceted tumbler in reference photo media_1791900311859.png
    const glassGeom = this.buildFacetedTumblerGeometry();

    this.glassCondensationTex = this.createGlassCondensationTexture();
    this.glassScratchNormal = this.createGlassScratchNormalTexture();

    // High-clarity optical glass with realistic reflections and condensation beads
    this.glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,               // Crystal clear glass body
      transmission: 0.0,            // Zero transmission prevents transparent canvas framebuffer bug
      roughness: 0.02,              // Ultra polished crystal glass
      metalness: 0.04,
      clearcoat: 1.0,               // Intense glossy clearcoat
      clearcoatRoughness: 0.01,
      reflectivity: 1.0,
      envMapIntensity: 3.5,         // Catches vivid crisp studio reflections on the 8 facet ridges and rim!
      bumpMap: this.glassCondensationTex,
      bumpScale: 0.02,
      normalMap: this.glassScratchNormal,
      normalScale: new THREE.Vector2(0.03, 0.03),
      depthWrite: false,            // Crucial: allows inside ice, cola, and bubbles to show through with complete clarity!
      side: THREE.DoubleSide
    });

    this.glassMesh = new THREE.Mesh(glassGeom, this.glassMaterial);
    this.glassMesh.castShadow = true;
    this.glassMesh.receiveShadow = true;
    this.glassMesh.renderOrder = 6; // Outer glass shell renders last over interior contents
    this.glassGroup.add(this.glassMesh);

    // Contact shadow under the heavy glass base (local to glassGroup so it glides with the glass)
    if (this.shadowMat) {
      const glassShadowGeom = new THREE.PlaneGeometry(3.6, 3.6);
      this.glassShadowMesh = new THREE.Mesh(glassShadowGeom, this.shadowMat);
      this.glassShadowMesh.rotation.x = -Math.PI / 2;
      this.glassShadowMesh.position.set(0, -1.355, 0); // Local floor contact
      this.glassGroup.add(this.glassShadowMesh);
    }

    // ── 2. PHOTOREALISTIC FACETED ICE ROCKS (MATCHING REFERENCE PHOTO media_1791900701233.png) ────────
    // Organic, hand-chopped crystal ice rocks with faceted cleavage planes & sharp specular glints
    const iceBumpTex = this.createIceBumpTexture();

    this.glassIceMat = new THREE.MeshPhysicalMaterial({
      color: 0xebf6ff,
      transparent: true,
      opacity: 0.52,                // Clear crystal ice that lets amber cola shine through
      transmission: 0.0,
      roughness: 0.04,              // Glassy, wet ice surface
      metalness: 0.02,
      clearcoat: 1.0,               // High specular brilliance
      clearcoatRoughness: 0.02,
      reflectivity: 0.98,
      bumpMap: iceBumpTex,
      bumpScale: 0.035,
      envMapIntensity: 3.2,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    this.glassIceFrostedMat = new THREE.MeshPhysicalMaterial({
      color: 0xddeeff,
      transparent: true,
      opacity: 0.68,                // Frosted internal cleavage planes
      transmission: 0.0,
      roughness: 0.20,
      metalness: 0.02,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.90,
      bumpMap: iceBumpTex,
      bumpScale: 0.065,
      envMapIntensity: 2.6,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    this.glassIceCubes = [];
    const iceConfigs = [
      // Bottom layer — packed into lower faceted sham
      { pos: [-0.15, -0.68, -0.10], size: [0.46, 0.44, 0.45], rot: [0.15, 0.45, 0.12], frosted: false, seed: 1 },
      { pos: [ 0.18, -0.66,  0.12], size: [0.45, 0.45, 0.43], rot: [-0.20, 0.70, -0.10], frosted: true,  seed: 2 },
      { pos: [ 0.01, -0.68, -0.18], size: [0.44, 0.42, 0.45], rot: [0.35, -0.50, 0.35], frosted: false, seed: 3 },
      // Mid-lower layer
      { pos: [-0.14, -0.22,  0.14], size: [0.48, 0.45, 0.47], rot: [0.36, 0.20, -0.26], frosted: true,  seed: 4 },
      { pos: [ 0.16, -0.19, -0.12], size: [0.46, 0.47, 0.44], rot: [-0.26, 0.82, 0.22], frosted: false, seed: 5 },
      { pos: [-0.03,  0.22, -0.06], size: [0.49, 0.46, 0.48], rot: [0.16, -0.42, 0.50], frosted: false, seed: 6 },
      // Mid-upper layer
      { pos: [ 0.16,  0.62,  0.10], size: [0.48, 0.45, 0.46], rot: [-0.10, 0.50, -0.16], frosted: true,  seed: 7 },
      { pos: [-0.14,  0.64, -0.08], size: [0.46, 0.44, 0.48], rot: [0.46, -0.18, 0.28], frosted: false, seed: 8 },
      { pos: [ 0.02,  0.68,  0.14], size: [0.45, 0.46, 0.44], rot: [0.22, 0.60, -0.14], frosted: true,  seed: 9 },
      // Crown rocks — mounding high over the rim (matching reference photo media_1791900701233.png)
      { pos: [-0.08,  1.06,  0.03], size: [0.50, 0.46, 0.48], rot: [0.28, 0.56, -0.24], frosted: false, seed: 10 },
      { pos: [ 0.15,  1.22, -0.04], size: [0.46, 0.44, 0.44], rot: [-0.34, 0.30, 0.38], frosted: true,  seed: 11 },
      { pos: [-0.02,  1.32,  0.08], size: [0.43, 0.42, 0.44], rot: [0.18, -0.35, 0.22], frosted: false, seed: 12 }
    ];

    iceConfigs.forEach((cfg) => {
      const geom = this.createFacetedIceRock(cfg.size[0], cfg.size[1], cfg.size[2], cfg.seed);
      const mat = cfg.frosted ? this.glassIceFrostedMat : this.glassIceMat;
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(cfg.pos[0], cfg.pos[1] + 6.0, cfg.pos[2]); // Suspended high above glass
      mesh.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.renderOrder = 3; // Renders inside liquid volume
      mesh.userData = {
        initialY: cfg.pos[1],
        baseY: cfg.pos[1],
        targetPos: [cfg.pos[0], cfg.pos[1], cfg.pos[2]],
        targetRot: [cfg.rot[0], cfg.rot[1], cfg.rot[2]],
        frosted: cfg.frosted,
        hasLanded: false
      };
      mesh.visible = false; // Hidden at start
      this.glassIceCubes.push(mesh);
      this.glassGroup.add(mesh);
    });

    // ── 3. COCA-COLA LIQUID VOLUME (RICH MAHOGANY WITH AMBER CARAMEL GLOW) ────
    // Liquid geometry perfectly conforms to the faceted interior of the glass
    const liquidGeom = this.buildLiquidInteriorGeometry();

    this.glassLiquidMat = new THREE.MeshStandardMaterial({
      color: 0x060100,                       // Deep dark mahogany Coca-Cola base (matching reference photo media_1791900701233.png)
      emissive: new THREE.Color(0x280600),   // Warm subtle dark amber undertone
      emissiveIntensity: 0.22,
      roughness: 0.03,                       // Wet mirror liquid surface
      metalness: 0.02,
      transparent: true,
      opacity: 0.96,                         // Rich dense carbonated cola
      side: THREE.DoubleSide
    });

    this.glassLiquidMesh = new THREE.Mesh(liquidGeom, this.glassLiquidMat);
    this.glassLiquidMesh.position.set(0, -0.88, 0); // Pivot at inner floor y = -0.88
    this.glassLiquidMesh.scale.set(0.98, 0.0001, 0.98);
    this.glassLiquidMesh.visible = false;
    this.glassLiquidMesh.renderOrder = 2; // Renders before ice & glass
    this.glassGroup.add(this.glassLiquidMesh);

    // ── 4. VEIL OF WALL-ADHERED MICRO-BUBBLES (MATCHING REFERENCE PHOTO media_1791900701233.png) ──────
    // Dense carbonation micro-bubbles clinging to the inner glass walls & ice
    const wallBubbleCount = 420;
    const wallBubbleGeom = new THREE.BufferGeometry();
    const wallBubblePos = new Float32Array(wallBubbleCount * 3);
    this.wallBubbleHeights = [];

    for (let i = 0; i < wallBubbleCount; i++) {
      const ang = Math.random() * Math.PI * 2;
      const y = -0.85 + Math.random() * 2.10;
      // Follow the expanding inner wall radius
      const r = 0.56 + ((y + 0.85) / 2.10) * 0.17 + (Math.random() - 0.5) * 0.04;
      wallBubblePos[i * 3]     = Math.cos(ang) * r;
      wallBubblePos[i * 3 + 1] = y;
      wallBubblePos[i * 3 + 2] = Math.sin(ang) * r;
      this.wallBubbleHeights.push(y);
    }
    wallBubbleGeom.setAttribute('position', new THREE.BufferAttribute(wallBubblePos, 3));
    this.glassWallBubbles = new THREE.Points(wallBubbleGeom, this.createGlassBubbleMaterial(0.048));
    this.glassWallBubbles.visible = false;
    this.glassWallBubbles.renderOrder = 4;
    this.glassGroup.add(this.glassWallBubbles);

    // ── 5. FREE-RISING CARBONATION BUBBLES IN COLA ────────────────────────────
    const glassBubbleCount = 110;
    const gBubbleGeom = new THREE.BufferGeometry();
    const gBubblePos = new Float32Array(glassBubbleCount * 3);
    this.glassBubbleData = [];
    for (let i = 0; i < glassBubbleCount; i++) {
      const ang = Math.random() * Math.PI * 2;
      const rad = 0.05 + Math.random() * 0.48;
      gBubblePos[i * 3]     = Math.cos(ang) * rad;
      gBubblePos[i * 3 + 1] = -0.85 + Math.random() * 0.1;
      gBubblePos[i * 3 + 2] = Math.sin(ang) * rad;
      this.glassBubbleData.push({
        rad, ang,
        speed: 0.014 + Math.random() * 0.028,
        wobble: Math.random() * Math.PI * 2,
        size: 0.04 + Math.random() * 0.06
      });
    }
    gBubbleGeom.setAttribute('position', new THREE.BufferAttribute(gBubblePos, 3));
    this.glassBubbles = new THREE.Points(gBubbleGeom, this.createGlassBubbleMaterial(0.065));
    this.glassBubbles.visible = false;
    this.glassBubbles.renderOrder = 4;
    this.glassGroup.add(this.glassBubbles);

    // ── 6. EFFERVESCENT FOAM & CREMA CROWN ON TOP LIQUID SURFACE ──────────────
    const foamDiscGeom = new THREE.CylinderGeometry(0.70, 0.68, 0.04, 40);
    const foamDiscMat = new THREE.MeshStandardMaterial({
      color: 0x220800,                       // Deep caramel cola surface
      roughness: 0.15,
      metalness: 0.02,
      transparent: true,
      opacity: 0.85,
      emissive: new THREE.Color(0x351002),
      emissiveIntensity: 0.20
    });
    this.glassFoamMesh = new THREE.Mesh(foamDiscGeom, foamDiscMat);
    this.glassFoamMesh.position.set(0, -0.88, 0);
    this.glassFoamMesh.scale.set(0.60, 0.25, 0.60);
    this.glassFoamMesh.visible = false;
    this.glassGroup.add(this.glassFoamMesh);

    // Foam micro-bubble clusters around top ice rocks
    this.foamClusters = [];
    for (let i = 0; i < 16; i++) {
      const ang = (i / 16) * Math.PI * 2;
      const r = 0.16 + Math.random() * 0.38;
      const bGeom = new THREE.SphereGeometry(0.035 + Math.random() * 0.05, 8, 6);
      const bMat = new THREE.MeshStandardMaterial({
        color: 0xfff6e4,
        roughness: 0.35,
        transparent: true,
        opacity: 0.88
      });
      const bMesh = new THREE.Mesh(bGeom, bMat);
      bMesh.position.set(Math.cos(ang) * r, 0, Math.sin(ang) * r);
      bMesh.userData = { ang, r, phase: Math.random() * Math.PI * 2 };
      this.foamClusters.push(bMesh);
      this.glassFoamMesh.add(bMesh);
    }

    // ── 7. IMPACT SPLASH DROPLETS AT STREAM STRIKE ─────────────────────────────
    const splashCount = 70;
    const splashGeom = new THREE.BufferGeometry();
    const splashPos = new Float32Array(splashCount * 3);
    this.splashVelocities = [];
    for (let i = 0; i < splashCount; i++) {
      splashPos[i * 3]     = 0;
      splashPos[i * 3 + 1] = 1.15;
      splashPos[i * 3 + 2] = 0;
      this.splashVelocities.push({
        x: (Math.random() - 0.5) * 0.07,
        y: 0.05 + Math.random() * 0.08,
        z: (Math.random() - 0.5) * 0.07,
        life: Math.random(),
        size: 0.07 + Math.random() * 0.08
      });
    }
    splashGeom.setAttribute('position', new THREE.BufferAttribute(splashPos, 3));
    this.glassSplashParticles = new THREE.Points(splashGeom, this.createGlassSplashMaterial());
    this.glassSplashParticles.visible = false;
    this.glassGroup.add(this.glassSplashParticles);

    this.scene.add(this.glassGroup);
  }

  // Build the octagonal faceted tumbler geometry (matching reference photo media_1791900311859.png)
  buildFacetedTumblerGeometry() {
    const radialSegments = 64;
    // Profile: [y, radius, facetFactor]
    const profile = [
      // Solid crystal foot sham
      [-1.35, 0.001, 0.0],
      [-1.35, 0.60,  0.88],
      [-1.25, 0.66,  0.88],
      [-0.90, 0.70,  0.88],
      [-0.50, 0.73,  0.88],
      [-0.10, 0.76,  0.78],
      [ 0.25, 0.79,  0.35], // Smooth transition into round upper cylinder
      [ 0.65, 0.82,  0.05],
      [ 1.05, 0.84,  0.00],
      [ 1.33, 0.86,  0.00],
      [ 1.36, 0.82,  0.00], // Polished crystal rim crown
      [ 1.33, 0.77,  0.00],
      [ 1.05, 0.75,  0.00],
      [ 0.65, 0.73,  0.05],
      [ 0.25, 0.70,  0.30],
      [-0.10, 0.67,  0.72],
      [-0.50, 0.64,  0.82],
      [-0.85, 0.58,  0.82], // Inner floor transition
      [-0.88, 0.001, 0.0]   // Inner floor center
    ];

    const positions = [];
    const uvs = [];
    const indices = [];
    const rings = profile.length;

    for (let r = 0; r < rings; r++) {
      const [y, radius, facetW] = profile[r];
      for (let s = 0; s <= radialSegments; s++) {
        const theta = (s / radialSegments) * Math.PI * 2;
        const sector = Math.PI / 4; // 8 facets
        const localAngle = (theta % sector) - (sector / 2);
        const flatFactor = 1.0 / Math.cos(localAngle);
        const effectiveR = radius * (1.0 + facetW * (flatFactor - 1.0));

        positions.push(Math.cos(theta) * effectiveR, y, Math.sin(theta) * effectiveR);
        uvs.push(s / radialSegments, r / (rings - 1));
      }
    }

    for (let r = 0; r < rings - 1; r++) {
      for (let s = 0; s < radialSegments; s++) {
        const a = r * (radialSegments + 1) + s;
        const b = (r + 1) * (radialSegments + 1) + s;
        const c = (r + 1) * (radialSegments + 1) + (s + 1);
        const d = r * (radialSegments + 1) + (s + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  // Conforming liquid volume geometry that fits snugly inside the faceted glass
  buildLiquidInteriorGeometry() {
    const radialSegments = 48;
    const profile = [
      [ 0.00, 0.001, 0.0],
      [ 0.00, 0.57,  0.82],
      [ 0.35, 0.63,  0.82],
      [ 0.75, 0.66,  0.72],
      [ 1.10, 0.69,  0.30],
      [ 1.50, 0.72,  0.05],
      [ 1.90, 0.74,  0.00],
      [ 2.18, 0.76,  0.00],
      [ 2.20, 0.76,  0.00],
      [ 2.20, 0.001, 0.0]
    ];

    const positions = [];
    const indices = [];
    const rings = profile.length;

    for (let r = 0; r < rings; r++) {
      const [y, radius, facetW] = profile[r];
      for (let s = 0; s <= radialSegments; s++) {
        const theta = (s / radialSegments) * Math.PI * 2;
        const sector = Math.PI / 4;
        const localAngle = (theta % sector) - (sector / 2);
        const flatFactor = 1.0 / Math.cos(localAngle);
        const effectiveR = radius * (1.0 + facetW * (flatFactor - 1.0));
        positions.push(Math.cos(theta) * effectiveR, y, Math.sin(theta) * effectiveR);
      }
    }

    for (let r = 0; r < rings - 1; r++) {
      for (let s = 0; s < radialSegments; s++) {
        const a = r * (radialSegments + 1) + s;
        const b = (r + 1) * (radialSegments + 1) + s;
        const c = (r + 1) * (radialSegments + 1) + (s + 1);
        const d = r * (radialSegments + 1) + (s + 1);
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geom.setIndex(indices);
    geom.computeVertexNormals();
    return geom;
  }

  // Create an organic, hand-chopped crystal ice rock with beveled cleavage planes
  createFacetedIceRock(w, h, d, seed = 0) {
    const geom = new THREE.BoxGeometry(w, h, d, 2, 2, 2);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const pz = pos.getZ(i);
      const len = Math.sqrt(px * px + py * py + pz * pz);
      const maxR = Math.max(Math.abs(px), Math.abs(py), Math.abs(pz)) || 0.001;
      const blend = Math.pow(len / (maxR * 1.732), 0.28);
      const noise = 0.022 * Math.sin(px * 14 + seed * 2.1) * Math.cos(pz * 12 + py * 10 + seed);
      pos.setXYZ(i, px * blend + noise, py * blend + noise * 0.7, pz * blend + noise * 0.9);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Realistic ice cube with chamfered organic edges
  createRealisticIceCube(w, h, d) {
    const geom = new THREE.BoxGeometry(w, h, d, 3, 3, 3);
    const pos = geom.attributes.position;
    const N = pos.count;
    for (let i = 0; i < N; i++) {
      const px = pos.getX(i);
      const py = pos.getY(i);
      const pz = pos.getZ(i);
      // Chamfer corners via superellipsoid-like blend
      const len = Math.sqrt(px * px + py * py + pz * pz);
      const maxR = Math.max(Math.abs(px), Math.abs(py), Math.abs(pz)) || 0.001;
      const blend = Math.pow(len / (maxR * 1.732), 0.3);
      // Fine surface irregularity (crystal grain boundaries)
      const noise = 0.010 * Math.sin(px * 22 + py * 17) * Math.cos(pz * 19);
      pos.setXYZ(i, px * blend + noise, py * blend + noise * 0.6, pz * blend + noise * 0.8);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Canvas-based condensation bump for glass
  createGlassCondensationTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * 512, y = Math.random() * 512;
      const r = 1 + Math.random() * 4.5;
      const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0.2, x, y, r);
      g.addColorStop(0, 'rgba(255,255,255,0.8)');
      g.addColorStop(1, 'rgba(128,128,128,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2.5, 2.5);
    return tex;
  }

  createGlassScratchNormalTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#8080ff';
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }

  createIceBumpTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 12; i++) {
      let cx = Math.random()*256, cy = Math.random()*256;
      ctx.strokeStyle='rgba(255,255,255,0.6)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      for(let s=0;s<5;s++){cx+=(Math.random()-0.5)*60;cy+=(Math.random()-0.5)*60;ctx.lineTo(cx,cy);}
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }

  createLiquidSurfaceTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, 128, 128);
    for (let r = 3; r < 60; r += 6 + Math.random() * 4) {
      ctx.strokeStyle=`rgba(255,255,255,${0.2+Math.random()*0.3})`; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.arc(64, 64, r, 0, Math.PI * 2); ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
  }

  createGlassBubbleMaterial(bubbleSize = 0.065) {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    // Tiny translucent circle with bright rim highlight (real carbonation bubble)
    const grad = ctx.createRadialGradient(24, 22, 2, 32, 32, 30);
    grad.addColorStop(0,   'rgba(255,255,255,0.0)');
    grad.addColorStop(0.6, 'rgba(255,240,220,0.25)');
    grad.addColorStop(0.82,'rgba(255,255,255,0.95)');
    grad.addColorStop(1,   'rgba(200,200,200,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.PointsMaterial({
      size: bubbleSize,
      map: tex,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
  }

  createGlassSplashMaterial() {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 1, 32, 32, 30);
    grad.addColorStop(0,   'rgba(255,255,255,1.0)');
    grad.addColorStop(0.3, 'rgba(255,220,160,0.9)');
    grad.addColorStop(0.7, 'rgba(200,120,40,0.45)');
    grad.addColorStop(1,   'rgba(150,80,10,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    return new THREE.PointsMaterial({
      size: 0.10,
      map: tex,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true
    });
  }

  // ==========================================================================
  // PHOTOREALISTIC COKE POUR STREAM SYSTEM
  // ==========================================================================
  createCokePourSystem() {
    this.cokePourGroup = new THREE.Group();
    this.cokePourGroup.visible = false;

    const lidTopY = 3.6 / 2 + 0.35;
    const mouthCenterZ = 0.38;

    // 1. HIGH-QUALITY LIQUID STREAM MATERIAL (MATCHING REFERENCE PHOTO media_1791900701417.png)
    // Deep mahogany cola, rich wet gloss, with glowing backlit amber/caramel translucency
    this.cokeLiquidMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x140300),
      emissive: new THREE.Color(0x3e0f00),
      emissiveIntensity: 0.26,
      roughness: 0.02,              // Smooth mirror liquid surface
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 0.98,
      transparent: true,
      opacity: 0.95,
      depthWrite: true,
      side: THREE.DoubleSide
    });

    // CatmullRom spline (initial placeholder — recomputed every frame)
    this.streamCurvePoints = [
      new THREE.Vector3(0, lidTopY - 0.04, mouthCenterZ),
      new THREE.Vector3(0, lidTopY + 0.10, mouthCenterZ + 0.30),
      new THREE.Vector3(0, lidTopY - 0.20, mouthCenterZ + 0.75),
      new THREE.Vector3(0, lidTopY - 1.20, mouthCenterZ + 1.30),
      new THREE.Vector3(0, -0.50, mouthCenterZ + 1.75),
      new THREE.Vector3(0, -1.80, mouthCenterZ + 1.90)
    ];
    this.streamCurve = new THREE.CatmullRomCurve3(this.streamCurvePoints, false, 'catmullrom', 0.5);
    const streamGeom = new THREE.TubeGeometry(this.streamCurve, 40, 0.05, 14, false);
    this.cokeStreamMesh = new THREE.Mesh(streamGeom, this.cokeLiquidMat);
    this.cokeStreamMesh.renderOrder = 10;
    this.cokePourGroup.add(this.cokeStreamMesh);

    // 2. CAN MOUTH FOAM BUBBLE (small cream puff at can opening)
    const foamGeom = new THREE.SphereGeometry(0.065, 16, 12);
    foamGeom.scale(1.2, 0.45, 1.2);
    const foamMat = new THREE.MeshStandardMaterial({
      color: 0xfff0dc,
      roughness: 0.35,
      metalness: 0.0,
      transparent: true,
      opacity: 0.75
    });
    this.cokeFoamMesh = new THREE.Mesh(foamGeom, foamMat);
    this.cokeFoamMesh.position.set(0, lidTopY - 0.02, mouthCenterZ);
    this.cokePourGroup.add(this.cokeFoamMesh);

    // Tiny bubbles chasing along the stream
    this.foamBubbles = [];
    for (let i = 0; i < 8; i++) {
      const bGeom = new THREE.SphereGeometry(0.025 + Math.random() * 0.028, 8, 6);
      const bMesh = new THREE.Mesh(bGeom, foamMat);
      this.foamBubbles.push(bMesh);
      this.cokePourGroup.add(bMesh);
    }

    // 3. Effervescent Fizz Spray Particles (Erupting carbonated droplets)
    const sprayCount = 140;
    const sprayGeom = new THREE.BufferGeometry();
    const sprayPos = new Float32Array(sprayCount * 3);
    this.sprayVelocities = [];

    for (let i = 0; i < sprayCount; i++) {
      sprayPos[i * 3] = 0;
      sprayPos[i * 3 + 1] = lidTopY;
      sprayPos[i * 3 + 2] = mouthCenterZ;

      this.sprayVelocities.push({
        x: (Math.random() - 0.5) * 0.04,
        y: 0.03 + Math.random() * 0.06,
        z: 0.02 + Math.random() * 0.05,
        life: Math.random()
      });
    }

    sprayGeom.setAttribute('position', new THREE.BufferAttribute(sprayPos, 3));

    // Sparkling fizz bubble sprite
    const sCanvas = document.createElement('canvas');
    sCanvas.width = 32;
    sCanvas.height = 32;
    const sctx = sCanvas.getContext('2d');
    const sGrad = sctx.createRadialGradient(16, 16, 1, 16, 16, 15);
    sGrad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
    sGrad.addColorStop(0.4, 'rgba(255, 220, 180, 0.8)');
    sGrad.addColorStop(1, 'rgba(255, 200, 150, 0)');
    sctx.fillStyle = sGrad;
    sctx.beginPath();
    sctx.arc(16, 16, 15, 0, Math.PI * 2);
    sctx.fill();

    const sprayTex = new THREE.CanvasTexture(sCanvas);
    const sprayMat = new THREE.PointsMaterial({
      size: 0.045,
      map: sprayTex,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.cokeSprayParticles = new THREE.Points(sprayGeom, sprayMat);
    this.cokePourGroup.add(this.cokeSprayParticles);

    // Added to world scene so liquid cascades down with real gravity
    this.scene.add(this.cokePourGroup);
  }

  createAtmosphere() {
    this.iceCubesGroup = new THREE.Group();
    this.iceCubesGroup.visible = false; // Hidden by default to keep scene clean and realistic
    const iceMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf2f8ff,
      transmission: 0.96,
      opacity: 0.55,
      transparent: true,
      roughness: 0.04,
      ior: 1.31,
      thickness: 1.2
    });

    this.iceCubes = [];
    const iceCount = 6;
    for (let i = 0; i < iceCount; i++) {
      const size = 0.5 + Math.random() * 0.45;
      const geom = new THREE.BoxGeometry(size, size, size);
      const mesh = new THREE.Mesh(geom, iceMaterial);

      const angle = (i / iceCount) * Math.PI * 2;
      const dist = 3.2 + Math.random() * 1.5;
      mesh.position.set(
        Math.cos(angle) * dist,
        -1.5 + Math.random() * 3.0,
        Math.sin(angle) * dist - 1.0
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = {
        floatSpeed: 0.008 + Math.random() * 0.012,
        rotSpeed: 0.005 + Math.random() * 0.008,
        initialY: mesh.position.y,
        offset: Math.random() * Math.PI * 2
      };
      this.iceCubes.push(mesh);
      this.iceCubesGroup.add(mesh);
    }
    this.scene.add(this.iceCubesGroup);

    const bubbleCount = 50;
    const bubbleGeom = new THREE.BufferGeometry();
    const bubblePositions = new Float32Array(bubbleCount * 3);
    const bubbleSpeeds = new Float32Array(bubbleCount);

    for (let i = 0; i < bubbleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.3 + Math.random() * 1.2;
      bubblePositions[i * 3] = Math.cos(angle) * r;
      bubblePositions[i * 3 + 1] = -2.2 + Math.random() * 4.5;
      bubblePositions[i * 3 + 2] = Math.sin(angle) * r;
      bubbleSpeeds[i] = 0.015 + Math.random() * 0.025;
    }

    bubbleGeom.setAttribute('position', new THREE.BufferAttribute(bubblePositions, 3));
    this.bubbleSpeeds = bubbleSpeeds;

    const bCanvas = document.createElement('canvas');
    bCanvas.width = 32;
    bCanvas.height = 32;
    const bctx = bCanvas.getContext('2d');
    const bGrad = bctx.createRadialGradient(16, 16, 1, 16, 16, 15);
    bGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    bGrad.addColorStop(0.5, 'rgba(112, 214, 255, 0.6)');
    bGrad.addColorStop(1, 'rgba(112, 214, 255, 0)');
    bctx.fillStyle = bGrad;
    bctx.beginPath();
    bctx.arc(16, 16, 15, 0, Math.PI * 2);
    bctx.fill();

    const bubbleTexture = new THREE.CanvasTexture(bCanvas);
    const bubbleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: bubbleTexture,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.bubbleParticles = new THREE.Points(bubbleGeom, bubbleMat);
    this.scene.add(this.bubbleParticles);
  }

  setupEvents() {
    const dom = this.renderer.domElement;
    let downPos = { x: 0, y: 0 };
    let isMouseDown = false;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      isMouseDown = true;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
      downPos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', (e) => {
      if (isMouseDown) {
        const dist = Math.hypot(e.clientX - downPos.x, e.clientY - downPos.y);
        // Only trigger click actions if user didn't drag to orbit camera
        if (dist < 7) {
          const rect = dom.getBoundingClientRect();
          this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
          this.raycaster.setFromCamera(this.mouse, this.camera);

          // 1. Check click on Glass when full -> send back to background!
          if (this.glassGroup && this.glassGroup.visible && this.pourProgress >= 1.0 && !this.isGlassDismissing && !this.isPouring) {
            const glassIntersects = this.raycaster.intersectObjects(this.glassGroup.children, true);
            if (glassIntersects.length > 0) {
              this.dismissGlass();
              this.isDragging = false;
              isMouseDown = false;
              return;
            }
          }

          // 2. Can pop tab click
          const popIntersects = this.raycaster.intersectObjects([this.tabLeverMesh, this.mouthFlapMesh].filter(Boolean), true);
          if (popIntersects.length > 0) {
            this.toggleCanPop();
          }
        }
      }
      this.isDragging = false;
      isMouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.cameraRotation.y -= deltaX * 0.007;
        this.cameraRotation.x = Math.max(-Math.PI * 0.35, Math.min(Math.PI * 0.38, this.cameraRotation.x + deltaY * 0.007));

        this.previousMousePosition = { x: e.clientX, y: e.clientY };
        dom.style.cursor = 'grabbing';
      } else {
        // Dynamic hover cursor: show pointer over full glass or pop tab
        const rect = dom.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);

        let isPointer = false;
        if (this.glassGroup && this.glassGroup.visible && this.pourProgress >= 1.0 && !this.isGlassDismissing && !this.isPouring) {
          const glassIntersects = this.raycaster.intersectObjects(this.glassGroup.children, true);
          if (glassIntersects.length > 0) isPointer = true;
        }
        if (!isPointer) {
          const popIntersects = this.raycaster.intersectObjects([this.tabLeverMesh, this.mouthFlapMesh].filter(Boolean), true);
          if (popIntersects.length > 0) isPointer = true;
        }

        dom.style.cursor = isPointer ? 'pointer' : 'default';
      }
    });

    let touchDownPos = { x: 0, y: 0 };
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        touchDownPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      if (this.isDragging && e.changedTouches && e.changedTouches.length === 1) {
        const dist = Math.hypot(e.changedTouches[0].clientX - touchDownPos.x, e.changedTouches[0].clientY - touchDownPos.y);
        if (dist < 10) {
          const rect = dom.getBoundingClientRect();
          this.mouse.x = ((e.changedTouches[0].clientX - rect.left) / rect.width) * 2 - 1;
          this.mouse.y = -((e.changedTouches[0].clientY - rect.top) / rect.height) * 2 + 1;
          this.raycaster.setFromCamera(this.mouse, this.camera);

          if (this.glassGroup && this.glassGroup.visible && this.pourProgress >= 1.0 && !this.isGlassDismissing && !this.isPouring) {
            const glassIntersects = this.raycaster.intersectObjects(this.glassGroup.children, true);
            if (glassIntersects.length > 0) {
              this.dismissGlass();
              this.isDragging = false;
              return;
            }
          }
        }
      }
      this.isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - this.previousMousePosition.x;
      const deltaY = e.touches[0].clientY - this.previousMousePosition.y;

      this.cameraRotation.y -= deltaX * 0.007;
      this.cameraRotation.x = Math.max(-Math.PI * 0.35, Math.min(Math.PI * 0.38, this.cameraRotation.x + deltaY * 0.007));

      this.previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.cameraDistance = Math.max(4.0, Math.min(11.0, this.cameraDistance + e.deltaY * 0.005));
    }, { passive: false });

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    this.width = this.container.clientWidth;
    this.height = this.container.clientHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  // Toggle authentic pop-up open state of can
  toggleCanPop(open = !this.isPopped) {
    this.isPopped = open;
    if (this.isPopped) {
      this.targetTabRot = 0.50;   // Rear ring lifts UP ~28 degrees, pushing nose down
      this.targetFlapRot = 1.15;  // Scored mouth flap depresses DOWN into the can hollow!
      if (this.cavityMesh) this.cavityMesh.visible = true;
      if (this.mouthFlapGroup) this.mouthFlapGroup.visible = true;
    } else {
      this.targetTabRot = 0;
      this.targetFlapRot = 0;
      if (this.cavityMesh) this.cavityMesh.visible = false;
      if (this.mouthFlapGroup) this.mouthFlapGroup.visible = false;
      if (this.isPouring) {
        this.togglePour(false);
      }
      this.cokePourGroup.visible = false;
    }
    if (this.onPopStateChanged) {
      this.onPopStateChanged(this.isPopped);
    }
    return this.isPopped;
  }

  // Dismiss glass back into the background when full
  dismissGlass() {
    if (this.isGlassDismissing || !this.glassGroup || !this.glassGroup.visible) return false;
    this.isGlassDismissing = true;
    this.glassDismissElapsed = 0;
    if (this.onGlassDismissStateChanged) {
      this.onGlassDismissStateChanged(true);
    }
    return true;
  }

  // Toggle pouring Coke stream into the glass with ice
  togglePour(start = (!this.isPouring && !this.isGlassPrepping)) {
    if (this.isGlassDismissing) {
      return false;
    }

    // If glass is already full, clicking pour button acts as dismiss
    if (this.glassGroup && this.glassGroup.visible && this.pourProgress >= 1.0) {
      this.dismissGlass();
      return false;
    }

    if (this.isPouring || this.isGlassPrepping) {
      // User clicked while pouring or prepping -> cancel / pause
      this.isPouring = false;
      this.isGlassPrepping = false;
      this.targetCanPos.set(0, 0, 0);
      this.targetCanTilt = { x: 0, y: 0, z: 0 };
      this.cokeStreamMesh.visible = false;
      this.cokePourGroup.visible = false;
      if (this.glassSplashParticles) this.glassSplashParticles.visible = false;
      if (this.onPourStateChanged) {
        this.onPourStateChanged(false);
      }
      return false;
    }

    // Reset liquid and bubbles inside glass
    this.pourElapsed = 0;
    this.pourProgress = 0;
    if (this.glassLiquidMesh) {
      this.glassLiquidMesh.scale.set(0.98, 0.0001, 0.98);
      this.glassLiquidMesh.visible = false;
    }
    if (this.glassFoamMesh) this.glassFoamMesh.visible = false;
    if (this.glassWallBubbles) this.glassWallBubbles.visible = false;
    if (this.glassBubbles) this.glassBubbles.visible = false;

    // Reset ice cubes to high suspended drop positions
    if (this.glassIceCubes) {
      this.glassIceCubes.forEach((cube, i) => {
        cube.visible = false;
        cube.userData.hasLanded = false;
        cube.position.set(cube.userData.targetPos[0], cube.userData.targetPos[1] + 6.0 + i * 0.15, cube.userData.targetPos[2]);
      });
    }

    // Reset glass to background start position and make visible
    this.glassGroup.position.copy(this.glassStartPos);
    this.glassGroup.scale.set(0.15, 0.15, 0.15);
    this.glassGroup.rotation.z = -0.16;
    this.glassGroup.visible = true;

    this.isGlassPrepping = true;
    this.glassPrepElapsed = 0;

    if (this.onPrepStateChanged) {
      this.onPrepStateChanged(true);
    }
    return true;
  }

  // Starts the physical 4-second pour after the 3-second glass prep completes
  startActualPour() {
    if (!this.isPopped) {
      this.toggleCanPop(true);
    }
    this.isPouring = true;
    this.pourElapsed = 0;
    this.pourProgress = 0;

    // Realistic pour stance: can tilts forward and down towards the glass with mouth at lowest point
    this.targetCanPos.set(0.19, 2.40, -1.04);
    this.targetCanTilt = { x: 2.20, y: 0.30, z: -0.80 };
    this.cokePourGroup.visible = true;
    this.cokeStreamMesh.visible = true;
    if (this.glassSplashParticles) this.glassSplashParticles.visible = true;
    if (this.cokeSprayParticles) {
      this.cokeSprayParticles.visible = true;
      const sPos = this.cokeSprayParticles.geometry.attributes.position.array;
      for (let i = 0; i < this.sprayVelocities.length; i++) {
        sPos[i * 3]     = 1.75;
        sPos[i * 3 + 1] = 1.60;
        sPos[i * 3 + 2] = 0.20;
        this.sprayVelocities[i].life = Math.random();
      }
      this.cokeSprayParticles.geometry.attributes.position.needsUpdate = true;
    }

    if (this.onPourStateChanged) {
      this.onPourStateChanged(true);
    }
  }

  // Completes pouring when 4 seconds elapse
  finishPour() {
    this.isPouring = false;
    this.targetCanPos.set(0, 0, 0);
    this.targetCanTilt = { x: 0, y: 0, z: 0 };
    this.cokeStreamMesh.visible = false;
    this.cokePourGroup.visible = false;
    if (this.glassSplashParticles) this.glassSplashParticles.visible = false;

    if (this.onPourStateChanged) {
      this.onPourStateChanged(false);
    }
  }

  setCameraPreset(presetName) {
    this.autoRotate = false;
    switch (presetName) {
      case 'hero':
        this.cameraRotation = { x: 0.08, y: 0.0 };
        this.cameraDistance = 8.0;
        this.targetLookAt.set(0.95, 0.0, 0.1);
        break;
      case 'detail':
        this.cameraRotation = { x: 0.02, y: 0.0 };
        this.cameraDistance = 6.0;
        this.targetLookAt.set(0.0, 0.0, 0.0);
        break;
      case 'top':
        this.cameraRotation = { x: Math.PI * 0.38, y: 0.0 };
        this.cameraDistance = 5.2;
        this.targetLookAt.set(0.0, 1.3, 0.0);
        break;
      case 'rear':
        this.cameraRotation = { x: 0.08, y: Math.PI };
        this.cameraDistance = 8.0;
        this.targetLookAt.set(0.95, 0.0, 0.1);
        break;
    }
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    return this.autoRotate;
  }

  updateCanTexture(canvas) {
    if (!this.canTexture) {
      this.canTexture = new THREE.CanvasTexture(canvas);
      this.canTexture.colorSpace = THREE.SRGBColorSpace;
      this.canTexture.wrapS = THREE.RepeatWrapping;
      this.canTexture.wrapT = THREE.ClampToEdgeWrapping;
      this.bodyMaterial.map = this.canTexture;
      this.bodyMaterial.needsUpdate = true;
    }
    this.canTexture.needsUpdate = true;
  }

  updateCondensationMap(normalCanvas, bumpScale = 0.05) {
    if (!this.condensationMap) {
      this.condensationMap = new THREE.CanvasTexture(normalCanvas);
      this.condensationMap.wrapS = THREE.RepeatWrapping;
      this.condensationMap.wrapT = THREE.RepeatWrapping;
      this.condensationMap.repeat.set(1, 1);
      this.bodyMaterial.bumpMap = this.condensationMap;
      this.bodyMaterial.needsUpdate = true;
    }
    this.bodyMaterial.bumpScale = bumpScale;
    this.condensationMap.needsUpdate = true;
  }

  setCanFinish(finishType) {
    switch (finishType) {
      case 'gloss':
        this.bodyMaterial.metalness = 0.40;
        this.bodyMaterial.roughness = 0.08;
        this.bodyMaterial.clearcoat = 1.0;
        this.bodyMaterial.clearcoatRoughness = 0.03;
        this.bodyMaterial.envMapIntensity = 1.45;
        if (this.neckMaterial) {
          this.neckMaterial.metalness = 0.45;
          this.neckMaterial.roughness = 0.10;
        }
        break;
      case 'matte':
        this.bodyMaterial.metalness = 0.10;
        this.bodyMaterial.roughness = 0.52;
        this.bodyMaterial.clearcoat = 0.06;
        this.bodyMaterial.clearcoatRoughness = 0.45;
        this.bodyMaterial.envMapIntensity = 0.85;
        if (this.neckMaterial) {
          this.neckMaterial.metalness = 0.12;
          this.neckMaterial.roughness = 0.50;
        }
        break;
      case 'brushed':
        this.bodyMaterial.metalness = 0.52;
        this.bodyMaterial.roughness = 0.25;
        this.bodyMaterial.clearcoat = 0.42;
        this.bodyMaterial.clearcoatRoughness = 0.18;
        this.bodyMaterial.envMapIntensity = 1.35;
        if (this.neckMaterial) {
          this.neckMaterial.metalness = 0.55;
          this.neckMaterial.roughness = 0.22;
        }
        break;
      case 'chrome':
        this.bodyMaterial.metalness = 0.58;
        this.bodyMaterial.roughness = 0.03;
        this.bodyMaterial.clearcoat = 1.0;
        this.bodyMaterial.clearcoatRoughness = 0.01;
        this.bodyMaterial.envMapIntensity = 2.2;
        if (this.neckMaterial) {
          this.neckMaterial.metalness = 0.62;
          this.neckMaterial.roughness = 0.04;
        }
        break;
    }
    this.bodyMaterial.needsUpdate = true;
    if (this.neckMaterial) this.neckMaterial.needsUpdate = true;
  }

  setPullTabColor(hexColor) {
    this.pullTabMaterial.color.set(hexColor);
    this.pullTabMaterial.needsUpdate = true;
  }

  setShoulderColor(hexColor) {
    if (this.neckMaterial) {
      this.neckMaterial.color.set(hexColor);
      this.neckMaterial.needsUpdate = true;
    }
  }

  setAtmosphereSettings(iceVisible, fizzSpeed) {
    this.iceCubesVisible = iceVisible;
    this.iceCubesGroup.visible = iceVisible;
    this.fizzParticleSpeed = fizzSpeed;
  }

  takeSnapshot(width = 1920, height = 1080) {
    const originalWidth = this.width;
    const originalHeight = this.height;

    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.camera);
    const dataUrl = this.renderer.domElement.toDataURL('image/png');

    this.renderer.setSize(originalWidth, originalHeight);
    this.camera.aspect = originalWidth / originalHeight;
    this.camera.updateProjectionMatrix();

    return dataUrl;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // 1. Auto rotate camera when enabled
    if (this.autoRotate) {
      this.cameraRotation.y += 0.008 * this.autoRotateSpeed;
    }

    // 2. Smoothly update camera spherical position
    const cx = this.cameraDistance * Math.cos(this.cameraRotation.x) * Math.sin(this.cameraRotation.y);
    const cy = this.cameraDistance * Math.sin(this.cameraRotation.x);
    const cz = this.cameraDistance * Math.cos(this.cameraRotation.x) * Math.cos(this.cameraRotation.y);

    this.camera.position.lerp(new THREE.Vector3(cx, cy, cz), 0.08);
    this.camera.lookAt(this.targetLookAt);

    // 3. Smooth Pop-Up Tab & Mouth Flap Animation
    if (this.pullTabGroup && this.mouthFlapGroup) {
      this.currentTabRot = THREE.MathUtils.lerp(this.currentTabRot, this.targetTabRot, 0.16);
      this.pullTabGroup.rotation.x = this.currentTabRot;

      this.currentFlapRot = THREE.MathUtils.lerp(this.currentFlapRot, this.targetFlapRot, 0.16);
      this.mouthFlapGroup.rotation.x = this.currentFlapRot;
    }

    // Frame delta for accurate 4s pour timing
    const now = performance.now();
    if (!this.lastFrameTime) this.lastFrameTime = now;
    const delta = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;

    // ── Handle 3-Second Glass Entrance & Ice Cascade ──
    if (this.isGlassPrepping) {
      this.glassPrepElapsed += delta;
      const t = this.glassPrepElapsed;

      // 1. Empty glass glides in from background into position on right side of can (t in [0.0, 1.25])
      const glassT = Math.min(1.0, t / 1.25);
      const e = 1.0 - Math.pow(1.0 - glassT, 3);
      this.glassGroup.position.lerpVectors(this.glassStartPos, this.glassRestPos, e);
      const s = 0.15 + 0.85 * e;
      this.glassGroup.scale.set(s, s, s);
      this.glassGroup.rotation.z = (1.0 - e) * -0.16;

      // 2. Ice cubes drop from height inside the glass (staggered in 4 natural waves)
      const dropStartTimes = [
        1.10, 1.18, 1.26, // Wave 1: Bottom sham cubes
        1.46, 1.56, 1.68, // Wave 2: Mid-lower cubes
        1.88, 1.98, 2.10, // Wave 3: Mid-upper cubes
        2.28, 2.40, 2.52  // Wave 4: Crown rocks
      ];
      const dropDuration = 0.38;

      this.glassIceCubes.forEach((cube, idx) => {
        const startT = dropStartTimes[idx];
        if (t < startT) {
          cube.visible = false;
          cube.position.set(cube.userData.targetPos[0], cube.userData.targetPos[1] + 5.5 + idx * 0.15, cube.userData.targetPos[2]);
        } else {
          cube.visible = true;
          const p = (t - startT) / dropDuration;
          if (p < 1.0) {
            const fall = 1.0 - p * p;
            const dropHeight = 5.5 + idx * 0.15;
            cube.position.y = cube.userData.targetPos[1] + dropHeight * fall;
            cube.position.x = cube.userData.targetPos[0] + (1.0 - p) * ((idx % 2 === 0 ? 0.12 : -0.12));
            cube.position.z = cube.userData.targetPos[2] + (1.0 - p) * ((idx % 3 === 0 ? 0.12 : -0.12));
            cube.rotation.x = cube.userData.targetRot[0] + (1.0 - p) * 2.8;
            cube.rotation.y = cube.userData.targetRot[1] + (1.0 - p) * 3.4;
            cube.rotation.z = cube.userData.targetRot[2] + (1.0 - p) * 2.0;
          } else {
            const bTime = p - 1.0;
            if (bTime < 0.25) {
              const bounceY = Math.sin(bTime * Math.PI * 4) * 0.10 * Math.exp(-bTime * 14);
              cube.position.y = cube.userData.targetPos[1] + Math.max(0, bounceY);
            } else {
              cube.position.y = cube.userData.targetPos[1];
            }
            cube.position.x = cube.userData.targetPos[0];
            cube.position.z = cube.userData.targetPos[2];
            cube.rotation.set(cube.userData.targetRot[0], cube.userData.targetRot[1], cube.userData.targetRot[2]);

            if (!cube.userData.hasLanded) {
              cube.userData.hasLanded = true;
              if (this.onIceLanded) {
                this.onIceLanded(idx);
              }
            }
          }
        }
      });

      // 3. Prep finishes at 3.0 seconds -> Start 4-second Pour!
      if (this.glassPrepElapsed >= this.glassPrepDuration) {
        this.isGlassPrepping = false;
        this.glassGroup.position.copy(this.glassRestPos);
        this.glassGroup.scale.set(1, 1, 1);
        this.glassGroup.rotation.z = 0;

        this.glassIceCubes.forEach(cube => {
          cube.visible = true;
          cube.position.set(cube.userData.targetPos[0], cube.userData.targetPos[1], cube.userData.targetPos[2]);
          cube.rotation.set(cube.userData.targetRot[0], cube.userData.targetRot[1], cube.userData.targetRot[2]);
          cube.userData.hasLanded = true;
        });

        if (this.onPrepStateChanged) {
          this.onPrepStateChanged(false);
        }

        // Initiate 4-second pour!
        this.startActualPour();
      }
    }

    // ── Handle Glass Dismissal (Glide back to background) ──
    if (this.isGlassDismissing) {
      this.glassDismissElapsed += delta;
      const t = Math.min(1.0, this.glassDismissElapsed / this.glassDismissDuration);
      // Smooth physical ease: smoothstep
      const e = t * t * (3 - 2 * t);

      this.glassGroup.position.lerpVectors(this.glassRestPos, this.glassStartPos, e);
      const s = 1.0 - 0.85 * e; // scale down from 1.0 to 0.15
      this.glassGroup.scale.set(s, s, s);
      this.glassGroup.rotation.z = -0.16 * e;

      if (this.glassDismissElapsed >= this.glassDismissDuration) {
        this.isGlassDismissing = false;
        this.glassGroup.visible = false;
        this.pourProgress = 0;
        this.pourElapsed = 0;
        if (this.glassLiquidMesh) {
          this.glassLiquidMesh.scale.set(0.98, 0.0001, 0.98);
          this.glassLiquidMesh.visible = false;
        }
        if (this.glassFoamMesh) this.glassFoamMesh.visible = false;
        if (this.glassWallBubbles) this.glassWallBubbles.visible = false;
        if (this.glassBubbles) this.glassBubbles.visible = false;
        if (this.glassIceCubes) {
          this.glassIceCubes.forEach((cube) => {
            cube.visible = false;
            cube.userData.hasLanded = false;
          });
        }
        if (this.onGlassDismissStateChanged) {
          this.onGlassDismissStateChanged(false);
        }
      }
    }

    // Handle 4-Second Pour
    if (this.isPouring) {
      this.pourElapsed += delta;
      this.pourProgress = Math.min(1.0, this.pourElapsed / this.pourDuration);

      if (this.onPourProgress) {
        this.onPourProgress(this.pourProgress, this.pourElapsed);
      }

      if (this.pourElapsed >= this.pourDuration) {
        // 4s reached: Glass is 100% full! Stop pouring and glide can back upright
        this.finishPour();
      }
    }

    // 4. Smooth Can Translation & Tilting when pouring
    this.canPos.lerp(this.targetCanPos, 0.08);
    this.canGroup.position.copy(this.canPos);

    this.canTilt.x = THREE.MathUtils.lerp(this.canTilt.x, this.targetCanTilt.x, 0.1);
    this.canTilt.y = THREE.MathUtils.lerp(this.canTilt.y, this.targetCanTilt.y, 0.1);
    this.canTilt.z = THREE.MathUtils.lerp(this.canTilt.z || 0, this.targetCanTilt.z || 0, 0.1);
    this.canGroup.rotation.set(this.canTilt.x, this.canTilt.y, this.canTilt.z);

    const time = performance.now() * 0.003;
    const mouthPos = new THREE.Vector3();
    if (this.mouthAnchor) {
      this.mouthAnchor.getWorldPosition(mouthPos);
    } else {
      mouthPos.set(0, 2.11, 0.38);
    }

    // Foam head follows mouth spout in world space
    this.cokeFoamMesh.position.copy(mouthPos);

    // 5. Animate Glass Liquid, Foam & Stacked Ice Cubes
    const liquidMaxH = 2.15;
    const liquidBaseY = -0.88;
    const currentLiquidH = liquidMaxH * this.pourProgress;
    const currentSurfaceY = liquidBaseY + currentLiquidH;

    if (this.glassLiquidMesh) {
      this.glassLiquidMesh.visible = this.pourProgress > 0.005;
      this.glassLiquidMesh.scale.set(0.98, Math.max(0.0001, this.pourProgress), 0.98);
    }

    if (this.glassWallBubbles) {
      this.glassWallBubbles.visible = this.pourProgress > 0.02;
    }

    if (this.glassFoamMesh) {
      this.glassFoamMesh.visible = this.pourProgress > 0.01;
      this.glassFoamMesh.position.y = currentSurfaceY;
      const foamPulse = this.isPouring ? (1.0 + Math.sin(time * 14) * 0.045) : 1.0;
      const foamScale = (0.60 + 0.12 * this.pourProgress) * foamPulse;
      this.glassFoamMesh.scale.set(foamScale, 0.28, foamScale);

      // Animate individual foam bubble clusters
      if (this.foamClusters) {
        this.foamClusters.forEach((b, i) => {
          b.position.y = Math.sin(time * 6 + b.userData.phase + i * 0.5) * 0.04;
        });
      }
    }

    // Floating / Buoyant Ice Cubes inside the glass with gentle drift (only when pour is underway/complete)
    if (this.glassIceCubes && !this.isGlassPrepping && !this.isGlassDismissing) {
      this.glassIceCubes.forEach((cube, idx) => {
        const isFloated = cube.userData.initialY < currentSurfaceY - 0.1;
        if (isFloated && this.pourProgress > 0.12) {
          // Gentle buoyant bob
          cube.position.y = cube.userData.initialY + Math.sin(time * 2.5 + idx * 1.1) * 0.025;
          // Slow drift rotation (ice floating & spinning)
          cube.rotation.y += 0.0008 * (idx % 2 === 0 ? 1 : -1);
        } else {
          cube.position.y = cube.userData.initialY;
        }
      });
    }

    // Rising Carbonation Bubbles inside the Glass
    if (this.glassBubbles && this.pourProgress > 0.04) {
      this.glassBubbles.visible = true;
      const gPos = this.glassBubbles.geometry.attributes.position.array;
      for (let i = 0; i < this.glassBubbleData.length; i++) {
        const b = this.glassBubbleData[i];
        gPos[i * 3 + 1] += b.speed;
        b.wobble += 0.05;
        gPos[i * 3] = Math.cos(b.ang + Math.sin(b.wobble) * 0.2) * b.rad;
        gPos[i * 3 + 2] = Math.sin(b.ang + Math.sin(b.wobble) * 0.2) * b.rad;

        if (gPos[i * 3 + 1] > currentSurfaceY) {
          gPos[i * 3 + 1] = liquidBaseY + 0.02;
        }
      }
      this.glassBubbles.geometry.attributes.position.needsUpdate = true;
    } else if (this.glassBubbles) {
      this.glassBubbles.visible = false;
    }

    // 6. Animate Coke Stream & Impact Spray
    if (this.cokePourGroup && this.cokePourGroup.visible) {
      if (this.isPouring) {
        this.cokeStreamMesh.visible = true;

        // Target impact = top of ice pile (until liquid rises above)
        const impactLocalY = Math.max(1.10, currentSurfaceY + 0.04);
        const targetImpact = this.glassGroup.position.clone().add(
          new THREE.Vector3(0, impactLocalY, 0)
        );

        // Smooth natural fluid trajectory: shoots downward-forward from spout then plunges into ice
        const p0 = mouthPos.clone();
        // Downward forward ejection along spout angle
        const p1 = p0.clone().add(new THREE.Vector3(0.10, -0.20, -0.01));
        // Gravity parabolic curve dropping into the glass
        const p2 = new THREE.Vector3(
          p0.x * 0.35 + targetImpact.x * 0.65,
          (p0.y + targetImpact.y) * 0.50 - 0.06,
          p0.z * 0.35 + targetImpact.z * 0.65
        );
        const p3 = targetImpact.clone();

        this.streamCurve.points = [p0, p1, p2, p3];

        const SEGS = 36;
        const RSEGS = 14;
        const streamRadius = 0.092 + Math.sin(time * 20) * 0.005;

        this.cokeStreamMesh.geometry.dispose();
        this.cokeStreamMesh.geometry = new THREE.TubeGeometry(
          this.streamCurve, SEGS, streamRadius, RSEGS, false
        );

        // Splashing Droplets at stream impact on ice cubes
        if (this.glassSplashParticles) {
          this.glassSplashParticles.visible = true;
          const sPos = this.glassSplashParticles.geometry.attributes.position.array;

          for (let i = 0; i < this.splashVelocities.length; i++) {
            const vel = this.splashVelocities[i];
            sPos[i * 3]     += vel.x;
            sPos[i * 3 + 1] += vel.y;
            sPos[i * 3 + 2] += vel.z;
            // Gravity pulls droplets back down
            vel.y -= 0.006;

            vel.life -= 0.035;
            if (vel.life <= 0) {
              vel.life = 0.8 + Math.random() * 0.4;
              sPos[i * 3]     = (Math.random() - 0.5) * 0.28;
              sPos[i * 3 + 1] = impactLocalY;
              sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.28;

              vel.x = (Math.random() - 0.5) * 0.08;
              vel.y = 0.04 + Math.random() * 0.08;
              vel.z = (Math.random() - 0.5) * 0.08;
            }
          }
          this.glassSplashParticles.geometry.attributes.position.needsUpdate = true;
        }

        // Pulse the amber back light with pour (simulates lit cola)
        if (this.amberBackLight) {
          this.amberBackLight.intensity = 3.5 + Math.sin(time * 4) * 0.8;
        }
      } else {
        this.cokeStreamMesh.visible = false;
        if (this.glassSplashParticles) this.glassSplashParticles.visible = false;
      }

      // Froth mouth foam — gentle scale flutter
      this.cokeFoamMesh.scale.set(
        1.10 + Math.sin(time * 9)  * 0.18,
        0.75 + Math.cos(time * 11) * 0.18,
        1.10 + Math.sin(time * 7)  * 0.18
      );

      // Small bubbles chase along stream curve
      this.foamBubbles.forEach((b, idx) => {
        b.visible = this.isPouring;
        if (this.isPouring) {
          const tPos = ((time * 0.55 + idx * 0.13) % 0.98) + 0.01;
          const pt = this.streamCurve.getPoint(tPos);
          b.position.copy(pt);
          // Small random wobble perpendicular to stream
          b.position.x += Math.sin(time * 8 + idx * 2.1) * 0.012;
          b.position.z += Math.cos(time * 7 + idx * 1.7) * 0.012;
        }
      });

      // Update Spray Particles around can mouth
      if (this.cokeSprayParticles) {
        const sprayPos = this.cokeSprayParticles.geometry.attributes.position.array;
        for (let i = 0; i < this.sprayVelocities.length; i++) {
          const vel = this.sprayVelocities[i];
          sprayPos[i * 3]     += vel.x;
          sprayPos[i * 3 + 1] += vel.y;
          sprayPos[i * 3 + 2] += vel.z;

          vel.life -= 0.04;
          if (vel.life <= 0) {
            vel.life = 0.7 + Math.random() * 0.3;
            sprayPos[i * 3]     = mouthPos.x + (Math.random() - 0.5) * 0.05;
            sprayPos[i * 3 + 1] = mouthPos.y - 0.02 + (Math.random() - 0.5) * 0.03;
            sprayPos[i * 3 + 2] = mouthPos.z + (Math.random() - 0.5) * 0.05;

            vel.x = 0.015 + Math.random() * 0.03;
            vel.y = -0.04 - Math.random() * 0.05;
            vel.z = (Math.random() - 0.5) * 0.03;
          }
        }
        this.cokeSprayParticles.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 6. Animate Ice Cubes floating
    if (this.iceCubesVisible && this.iceCubes) {
      const time = performance.now() * 0.001;
      this.iceCubes.forEach((cube) => {
        cube.position.y = cube.userData.initialY + Math.sin(time * 1.5 + cube.userData.offset) * 0.15;
        cube.rotation.x += cube.userData.rotSpeed;
        cube.rotation.y += cube.userData.rotSpeed * 0.8;
      });
    }

    // 7. Animate Rising Carbonation Bubbles
    if (this.bubbleParticles && this.fizzParticleSpeed > 0) {
      const positions = this.bubbleParticles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += this.bubbleSpeeds[i] * this.fizzParticleSpeed;
        if (positions[i * 3 + 1] > 2.4) {
          positions[i * 3 + 1] = -2.2;
        }
      }
      this.bubbleParticles.geometry.attributes.position.needsUpdate = true;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
