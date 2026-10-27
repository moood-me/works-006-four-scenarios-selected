// The family's storm lantern of «Moominpappa at Sea», one for every scene it is in (the valley, the boat, the round
// room, the lantern room, the shore): a tin font, a glass globe in its wire guard, a cap and a bail handle; its flame
// full, turned low, out (empty, the globe sooty), or out and white with rime. Painted once per flame; how much it burns
// is the engine's — the element's glow and light (e.glow) and the globe lit from within by its shader (u_lit,
// tools/lantern/lantern.wgsl). lantern.md says how a scene takes it.

// how much the flame burns, by its state
const FLAME = { full: 1, low: 0.45, out: 0, frost: 0 };
// the box it paints in (metres round its foot) and where its flame is
const BOX = [-0.16, -0.48, 0.16, 0.03], FLAME_AT = [0, -0.21];

// The lantern standing (on a table, a step, a stone, a boat's bow, the floor), its foot at the element's anchor.
// opts: flame — 'full' | 'low' | 'out' | 'frost'; here — false: not here (nothing painted but its light, which its
// move puts out). Its glow and light "flame" (the scene's light takes it: lights `of: "<id>#flame"`); its point
// "<id>#flame".
function paint(g, e, opts = {}) {
  const flame = opts.flame ?? 'full', here = opts.here ?? true;
  if (here) {
    g.fillStyle = '#6f6a5e';
    g.beginPath();
    g.ellipse(0, -0.03, 0.11, 0.03, 0, 0, Math.PI * 2);
    g.fill();
    g.fillRect(-0.11, -0.1, 0.22, 0.07);
    g.fillStyle = '#8a8474';
    g.fillRect(-0.09, -0.12, 0.18, 0.03);
    // the guard's wires, the cap, the handle
    g.strokeStyle = '#4a4640';
    g.lineWidth = 0.008;
    for (const x of [-0.085, 0, 0.085]) {
      g.beginPath();
      g.moveTo(x * 0.7, -0.12);
      g.quadraticCurveTo(x * 1.25, -0.21, x * 0.7, -0.3);
      g.stroke();
    }
    g.fillStyle = '#6f6a5e';
    g.fillRect(-0.06, -0.33, 0.12, 0.03);
    g.beginPath();
    g.moveTo(-0.045, -0.33);
    g.lineTo(0, -0.37);
    g.lineTo(0.045, -0.33);
    g.fill();
    g.lineWidth = 0.01;
    g.beginPath();
    g.moveTo(-0.1, -0.1);
    g.quadraticCurveTo(-0.13, -0.44, 0, -0.45);
    g.quadraticCurveTo(0.13, -0.44, 0.1, -0.1);
    g.stroke();
    if (flame === 'frost') {
      g.fillStyle = 'rgba(240, 246, 252, 0.85)';
      for (let i = 0; i < 30; i++) g.fillRect(-0.11 + e.rnd() * 0.22, -0.12 + e.rnd() * 0.1, 0.01, 0.006);
    }
    // the globe and the flame: a layer the shader lights from within
    e.layer('globe', {}, c => {
      const globe = new Path2D();
      globe.moveTo(-0.05, -0.12);
      globe.bezierCurveTo(-0.11, -0.16, -0.11, -0.26, -0.05, -0.3);
      globe.lineTo(0.05, -0.3);
      globe.bezierCurveTo(0.11, -0.26, 0.11, -0.16, 0.05, -0.12);
      globe.closePath();
      if (flame === 'full' || flame === 'low') {
        const glass = c.createRadialGradient(0, -0.2, 0.01, 0, -0.2, 0.09);
        glass.addColorStop(0, 'rgba(255, 214, 140, 0.95)');
        glass.addColorStop(1, 'rgba(226, 184, 118, 0.8)');
        c.fillStyle = glass;
        c.fill(globe);
        const t = flame === 'full' ? 1 : 0.55;
        c.fillStyle = '#ffe0a0';
        c.beginPath();
        c.moveTo(0, -0.17 - 0.08 * t);
        c.quadraticCurveTo(0.02 * t, -0.2, 0, -0.17);
        c.quadraticCurveTo(-0.02 * t, -0.2, 0, -0.17 - 0.08 * t);
        c.fill();
      } else {
        c.fillStyle = flame === 'frost' ? 'rgba(232, 240, 248, 0.9)' : 'rgba(150, 142, 128, 0.75)';
        c.fill(globe);
        c.fillStyle = 'rgba(40, 36, 32, 0.4)';
        c.fillRect(-0.06, -0.3, 0.12, 0.05);
      }
    });
  }
  e.light(FLAME_AT[0], FLAME_AT[1], 0.14, '#ffc874', 1.2, 'flame');
  e.at(FLAME_AT[0], FLAME_AT[1], 'flame');
}

// Its animate: k — how much it burns now (FLAME[flame]; 0 while it is not here): its glow and light, the globe's glow.
function move(e, k) {
  e.glow('flame', k);
  e.uniform('lit', k);
}

return { FLAME, BOX, FLAME_AT, paint, move };
