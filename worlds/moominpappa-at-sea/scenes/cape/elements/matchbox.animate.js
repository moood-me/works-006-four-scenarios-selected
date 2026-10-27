// On the stone: where the element stands; in his palm: at the Fisherman's right hand, this frame; none: not seen.
const box = e.layer("box"), where = e.state.matchbox ?? "none";
if (where === "palm") {
  const p = e.point("fisher#hand_r");
  if (p) {
    box.x = p[0];
    box.y = p[1];
  }
} else {
  box.x = 0;
  box.y = 0;
}
box.alpha = where === "none" ? 0 : 1;
