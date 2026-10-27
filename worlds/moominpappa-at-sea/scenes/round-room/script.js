// The room's mechanics: the storm's lightning (modules/island); the door's leaf turned by `door`; the storm lantern put
// where `lantern_at` says; the window's day shut out by `shutters`.
const L = scene.lib;
scene.kit.island.lightning(scene);
function door() {
  scene.set("door_f", L.DOOR_FACING + L.DOOR_SWING * scene.get("door"));
}
function lantern() {
  const [a, d, h] = L.LANTERN[scene.get("lantern_at")] ?? L.LANTERN.table;
  scene.set("lantern_a", a);
  scene.set("lantern_d", d);
  scene.set("lantern_e", h);
}
function shutters() {
  scene.set("window_open", scene.get("shutters") ? 0 : 1);
}
scene.on("change", "door", door);
scene.on("move", "door", door);
scene.on("change", "lantern_at", lantern);
scene.on("change", "shutters", shutters);
scene.on("load", () => {
  door();
  lantern();
  shutters();
});
door();
lantern();
shutters();
