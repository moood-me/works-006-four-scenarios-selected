// The room's mechanics: its film (the game sets `beat`: modules/beats); the storm's lightning (modules/island); the
// door's leaf turned by `door`; the storm lantern put where `lantern_at` says (along the table by `lantern_x`); the
// window's day shut out by `shutters`.
const L = scene.lib;
scene.kit.beats.play(scene, L.film(scene));
scene.kit.island.lightning(scene);
function door() {
  scene.set("door_f", L.DOOR_FACING + L.DOOR_SWING * scene.get("door"));
}
function lantern() {
  const at = scene.get("lantern_at"), [a, d, h] = L.LANTERN[at] ?? L.LANTERN.table;
  scene.set("lantern_a", a + (at === "table" ? scene.get("lantern_x") ?? 0 : 0));
  scene.set("lantern_d", d);
  scene.set("lantern_e", h);
}
function shutters() {
  scene.set("window_open", scene.get("shutters") ? 0 : 1);
}
scene.on("change", "door", door);
scene.on("move", "door", door);
scene.on("change", "lantern_at", lantern);
scene.on("change", "lantern_x", lantern);
scene.on("move", "lantern_x", lantern);
scene.on("change", "shutters", shutters);
scene.on("load", () => {
  door();
  lantern();
  shutters();
});
door();
lantern();
shutters();
// «Asleep» (М7а): Papa's eyes by `eyes` — shut (asleep, the head down), open (awake, looking at the boy)
let awake = null;
function eyes() {
  const open = (scene.get("eyes") ?? 0) >= 0.5;
  if (open === awake) return;
  awake = open;
  const papa = scene.person("papa");
  if (open) {
    papa.do("wake");
    papa.look("troll");
  } else {
    papa.do(scene.get("papa_on") ? "doze" : "doze_floor", { loop: true });
    papa.look(null);
  }
}
scene.on("change", "eyes", eyes);
scene.on("move", "eyes", eyes);
