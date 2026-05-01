import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 300);
    camera.position.z = 22;  // closer since canvas is smaller

    // ── Lights (warm, cohesive) ──────────────────────────
    scene.add(new THREE.AmbientLight(0xfff8f0, 0.9));

    const lWarm = new THREE.PointLight(0xc2571a, 5, 80);   // terracotta
    lWarm.position.set(14, 10, 12);
    scene.add(lWarm);

    const lCool = new THREE.PointLight(0x6b8cae, 3, 70);   // muted slate blue
    lCool.position.set(-14, -8, 8);
    scene.add(lCool);

    const lTop = new THREE.PointLight(0xe8c97e, 2.5, 60);  // warm gold
    lTop.position.set(0, 18, 6);
    scene.add(lTop);

    // ── Palette (warm / earthy, 3–4 tones) ──────────────
    const C = {
      terracotta: 0xc2571a,
      clay:       0x8b4513,
      slate:      0x3d5568,
      sand:       0xd4b896,
      gold:       0xd4952a,
      linen:      0xede9e1,
      ink:        0x2a2018,
    };

    // ── Material helper ──────────────────────────────────
    const mat = (color, metalness = 0.3, roughness = 0.45, opacity = 1) =>
      new THREE.MeshStandardMaterial({ color, metalness, roughness,
        transparent: opacity < 1, opacity });

    const wireMat = (color, opacity = 0.18) =>
      new THREE.MeshBasicMaterial({ color, wireframe: true,
        transparent: true, opacity });

    // ── Mesh helper ──────────────────────────────────────
    const addMesh = (geo, material, x, y, z, rx = 0, ry = 0, rz = 0) => {
      const m = new THREE.Mesh(geo, material);
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, rz);
      scene.add(m);
      return m;
    };

    // ══ GEOMETRIES ══════════════════════════════════════

    // 1. Large background wireframe sphere — gives depth
    const bgSphere = addMesh(
      new THREE.SphereGeometry(22, 18, 14),
      wireMat(C.slate, 0.09),
      0, 0, -10
    );

    // 2. Torus Knot — hero statement, terracotta
    const knot = addMesh(
      new THREE.TorusKnotGeometry(3.6, 0.85, 180, 22, 2, 3),
      mat(C.terracotta, 0.4, 0.35),
      8, 1, -4, 0.3, 0.5
    );
    // Wireframe shell
    const knotWire = addMesh(
      new THREE.TorusKnotGeometry(3.75, 0.9, 80, 12, 2, 3),
      wireMat(C.clay, 0.12),
      8, 1, -4, 0.3, 0.5
    );

    // 3. Icosahedron — slate
    const ico = addMesh(
      new THREE.IcosahedronGeometry(2.7, 0),
      mat(C.slate, 0.45, 0.3),
      -9, 4, -8, 0.2, 0.1
    );
    const icoWire = addMesh(
      new THREE.IcosahedronGeometry(2.85, 0),
      wireMat(C.slate, 0.14),
      -9, 4, -8, 0.2, 0.1
    );

    // 4. Octahedron — gold
    const oct = addMesh(
      new THREE.OctahedronGeometry(2.1, 0),
      mat(C.gold, 0.5, 0.25),
      -7, -5, -9
    );

    // 5. Floating ring — clay
    const ring = addMesh(
      new THREE.TorusGeometry(2.0, 0.28, 22, 90),
      mat(C.clay, 0.35, 0.4),
      11, -5, -6, 1.1
    );

    // 6. Dodecahedron — ink dark
    const dod = addMesh(
      new THREE.DodecahedronGeometry(1.8, 0),
      mat(C.ink, 0.2, 0.6),
      2, -9, -14
    );
    const dodWire = addMesh(
      new THREE.DodecahedronGeometry(1.9, 0),
      wireMat(C.slate, 0.14),
      2, -9, -14
    );

    // 7. Tetrahedron — terracotta
    const tet = addMesh(
      new THREE.TetrahedronGeometry(2.0, 0),
      mat(C.terracotta, 0.25, 0.5, 0.9),
      -4, -8, -7
    );

    // 8. Box (rotated cube) — sand
    const box = addMesh(
      new THREE.BoxGeometry(2.2, 2.2, 2.2),
      mat(C.sand, 0.15, 0.55),
      -12, 1, -12, 0.4, 0.5
    );
    const boxWire = addMesh(
      new THREE.BoxGeometry(2.3, 2.3, 2.3),
      wireMat(C.clay, 0.18),
      -12, 1, -12, 0.4, 0.5
    );

    // 9. Second smaller torus — slate, far right
    const ring2 = addMesh(
      new THREE.TorusGeometry(1.4, 0.18, 16, 60),
      mat(C.slate, 0.4, 0.35),
      13, 6, -10, 0.3, 0.8
    );

    // 10. Cone — gold, far left
    const cone = addMesh(
      new THREE.ConeGeometry(1.3, 2.8, 8),
      mat(C.gold, 0.3, 0.45),
      -11, -8, -11, 0, 0, 0.3
    );

    // ── Particles ─────────────────────────────────────────
    const COUNT = 1200;
    const pPos = new Float32Array(COUNT * 3);
    const pCol = new Float32Array(COUNT * 3);
    const pVel = new Float32Array(COUNT * 2);

    // Warm earthy tones for particles
    const pPalette = [
      [0.76, 0.34, 0.10],  // terracotta
      [0.54, 0.27, 0.07],  // clay
      [0.24, 0.34, 0.41],  // slate
      [0.83, 0.72, 0.54],  // sand
      [0.83, 0.59, 0.16],  // gold
      [0.11, 0.09, 0.08],  // ink
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      pPos[i3]     = (Math.random() - 0.5) * 90;
      pPos[i3 + 1] = (Math.random() - 0.5) * 70;
      pPos[i3 + 2] = (Math.random() - 0.5) * 50 - 8;
      const c = pPalette[Math.floor(Math.random() * pPalette.length)];
      pCol[i3] = c[0]; pCol[i3 + 1] = c[1]; pCol[i3 + 2] = c[2];
      pVel[i * 2]     = (Math.random() - 0.5) * 0.0045;
      pVel[i * 2 + 1] = (Math.random() - 0.5) * 0.003;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    partGeo.setAttribute('color',    new THREE.BufferAttribute(pCol, 3));
    const parts = new THREE.Points(partGeo, new THREE.PointsMaterial({
      size: 0.2, vertexColors: true, transparent: true, opacity: 0.55, sizeAttenuation: true,
    }));
    scene.add(parts);

    // ── Mouse ─────────────────────────────────────────────
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.5;
      my = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animate ───────────────────────────────────────────
    let t = 0, animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.007;

      // Background sphere — very slow
      bgSphere.rotation.y += 0.0006;
      bgSphere.rotation.x += 0.0003;

      // Torus knot
      knot.rotation.x += 0.004;
      knot.rotation.y += 0.006;
      knot.position.y = 1 + Math.sin(t * 0.7) * 0.9;
      knotWire.rotation.copy(knot.rotation);
      knotWire.position.y = knot.position.y;

      // Icosahedron
      ico.rotation.x += 0.004; ico.rotation.z += 0.003;
      ico.position.y = 4 + Math.sin(t * 0.9 + 1) * 1.0;
      icoWire.rotation.copy(ico.rotation);
      icoWire.position.y = ico.position.y;

      // Octahedron — spins fast
      oct.rotation.y += 0.009; oct.rotation.x += 0.005;
      oct.position.y = -5 + Math.sin(t * 1.2 + 2) * 0.8;

      // Torus ring
      ring.rotation.z += 0.008;
      ring.position.y = -5 + Math.sin(t * 0.8 + 3) * 0.7;

      // Dodecahedron
      dod.rotation.x += 0.003; dod.rotation.y += 0.005;
      dod.position.y = -9 + Math.sin(t * 0.65 + 4) * 1.1;
      dodWire.rotation.copy(dod.rotation);
      dodWire.position.y = dod.position.y;

      // Tetrahedron
      tet.rotation.x += 0.006; tet.rotation.z += 0.004;
      tet.position.y = -8 + Math.sin(t + 5) * 0.9;

      // Box
      box.rotation.x += 0.003; box.rotation.y += 0.004; box.rotation.z += 0.002;
      box.position.y = 1 + Math.sin(t * 0.55 + 6) * 0.8;
      boxWire.rotation.copy(box.rotation);
      boxWire.position.y = box.position.y;

      // Ring 2
      ring2.rotation.x += 0.005; ring2.rotation.z += 0.007;
      ring2.position.y = 6 + Math.sin(t * 0.9 + 7) * 0.6;

      // Cone
      cone.rotation.y += 0.006; cone.rotation.z += 0.002;
      cone.position.y = -8 + Math.sin(t * 0.7 + 8) * 0.9;

      // Particles drift
      const pp = partGeo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        pp[i3]     += pVel[i * 2];
        pp[i3 + 1] += pVel[i * 2 + 1];
        if (pp[i3]     >  45) pp[i3]     = -45;
        if (pp[i3]     < -45) pp[i3]     =  45;
        if (pp[i3 + 1] >  35) pp[i3 + 1] = -35;
        if (pp[i3 + 1] < -35) pp[i3 + 1] =  35;
      }
      partGeo.attributes.position.needsUpdate = true;

      // Animate lights
      lWarm.position.x = Math.sin(t * 0.45) * 16;
      lWarm.position.y = Math.cos(t * 0.3) * 12;
      lCool.position.x = Math.cos(t * 0.35) * 14;
      lCool.position.y = Math.sin(t * 0.5) * 9;

      // Camera follows mouse
      camera.position.x += (mx * 3.5 - camera.position.x) * 0.022;
      camera.position.y += (-my * 2.5 - camera.position.y) * 0.022;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
