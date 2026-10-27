// The lantern room's mechanics: the storm's lightning and the beam's turn (modules/island); the burner's soot rising
// while it smokes; the beam on while the lamp burns.
scene.kit.island.lightning(scene);
function smoke() {
  scene.set("smoke", scene.get("flame") === "smoky" ? 1 : 0);
  scene.set("beam", scene.get("flame") === "lit" ? 1 : 0);
}
scene.on("change", "flame", smoke);
scene.on("load", smoke);
smoke();
scene.kit.island.beam(scene);
