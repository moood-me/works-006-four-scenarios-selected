// The dinghy in tow (`dinghy`), seen from ahead: its blunt pale blue-grey bow riding up on the wake, the painter
// running up from its stem to the stern's cleat. Metres from the middle of its waterline; 1.3 m wide.
if (!e.state.dinghy) return;
g.fillStyle = '#9fb0b6';
g.beginPath();
g.moveTo(-0.65, -0.5);
g.lineTo(0.65, -0.5);
g.lineTo(0.5, 0.05);
g.lineTo(-0.5, 0.05);
g.closePath();
g.fill();
g.fillStyle = '#b39a76';
g.fillRect(-0.68, -0.55, 1.36, 0.07);
g.fillStyle = '#7f9198';
g.fillRect(-0.45, -0.48, 0.9, 0.12);
g.strokeStyle = '#b9ab8f';
g.lineWidth = 0.02;
g.beginPath();
g.moveTo(0, -0.5);
g.quadraticCurveTo(0, -0.75, 0.02, -0.98);
g.stroke();
g.fillStyle = 'rgba(244,246,246,0.7)';
g.beginPath();
g.ellipse(0, 0.08, 0.8, 0.07, 0, 0, 6.2832);
g.fill();
