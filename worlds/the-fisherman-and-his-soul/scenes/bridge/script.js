// The bridge's mechanics: the hour (hours.md: `time` sets the looks' numbers at once); the people at their named
// places (places.md: `<id>_at`); the potter's door turned into the room by `door` (0 shut … 1 open: door_turn)
const L = scene.lib;
scene.kit.hours.follow(scene, 'time', L.TIME);
scene.kit.places.follow(scene, L.PLACES);
const door = () => scene.set('door_turn', 270 + 80 * Math.min(1, Math.max(0, Number(scene.get('door')) || 0)));
scene.on('change', 'door', door);
scene.on('move', 'door', door);
door();
