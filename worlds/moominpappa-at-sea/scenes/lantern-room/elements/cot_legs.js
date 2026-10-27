// The camp bed's frame under its canvas (`cot` not none): crossed wooden legs at its head, middle and foot, each a part
// at its own depth (the anchor is the bed's middle on the floor; its canvas 0.4 up).
if ((e.state.cot ?? "none") !== "none") {
  const w = 0.68, top = 0.4;
  for (const dz of [-0.85, 0, 0.85]) {
    e.part(0, dz, p => {
      p.strokeStyle = "#6e5a44";
      p.lineWidth = 0.03;
      p.beginPath();
      p.moveTo(-w / 2, 0);
      p.lineTo(w / 2, -top);
      p.moveTo(w / 2, 0);
      p.lineTo(-w / 2, -top);
      p.stroke();
    }, [-w / 2 - 0.03, -top - 0.03, w / 2 + 0.03, 0.02]);
  }
}
