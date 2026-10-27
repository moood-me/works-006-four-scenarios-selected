// The lantern room's mechanics: its film (the game sets `beat`: modules/beats); the storm's lightning and the beam's
// turn (modules/island); the burner's soot rising while it smokes; the beam on while the lamp burns.
scene.kit.beats.play(scene, scene.lib.film(scene));
scene.kit.island.lightning(scene);
function smoke() {
  scene.set("smoke", scene.get("flame") === "smoky" ? 1 : 0);
  scene.set("beam", scene.get("flame") === "lit" ? 1 : 0);
}
scene.on("change", "flame", smoke);
scene.on("load", smoke);
smoke();
scene.kit.island.beam(scene);
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
    papa.do("doze_floor", { loop: true });
    papa.look(null);
  }
}
scene.on("change", "eyes", eyes);
scene.on("move", "eyes", eyes);
