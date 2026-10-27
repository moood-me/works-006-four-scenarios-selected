// The lantern room's mechanics: the storm's lightning (modules/island); the burner's soot rising while it smokes.
scene.kit.island.lightning(scene);
function smoke() {
  scene.set("smoke", scene.get("flame") === "smoky" ? 1 : 0);
}
scene.on("change", "flame", smoke);
scene.on("load", smoke);
smoke();
