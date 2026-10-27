# Writes scenes/lantern-room/scene.json: the lantern room's numbers worked out of its ten sides — C, R, H, the gallery,
# the lamp, the hatch as the scene's lib.js has them (keep the two the same) —, the island's sky and sea
# seen through the glass (tools/island.py), its lights and looks, its states.
# Run from the world's root: python tools/lantern_room.py .
import json, math, sys
sys.path.insert(0, sys.argv[1] + '/tools')
import island
import lantern

root = sys.argv[1]
folder = root + '/scenes/lantern-room'
WIND = [1, 0.3, 1.3]
C, R, H, PARAPET = (0, 4.0), 2.8, 2.6, 1.0
SIDE = 36
D = math.pi / 180
r3 = lambda v: round(v, 3)
at = lambda t, r=R: [r3(C[0] + r * math.sin(t * D)), r3(C[1] + r * math.cos(t * D))]
RS, WS = R * math.cos(SIDE / 2 * D), 2 * R * math.sin(SIDE / 2 * D)
GR, RAIL = 3.6, 3.55
RAIL_S, RAIL_W = RAIL * math.cos(SIDE / 2 * D), 2 * RAIL * math.sin(SIDE / 2 * D)
LENS = {"r": 0.38, "foot": 0.9, "top": 1.95}
HATCH = {"a": -1.6, "d": 4.6, "half": 0.35}
# the sides built (the four nearest the viewer are not): the landward ones solid, the one nearest the burner sooty; the
# seaward ones glazed, the one on the right with the door out to the gallery
SOLID, SOOT, GLAZED, DOOR_SIDE = [-108, -72], -36, [0, 36, 72], 108

land = json.load(open(root + '/scenes/landing/scene.json', encoding='utf-8'))
w = {"Low drone of a foghorn-like brass note under thin high violins, a dark lighthouse, waiting": 0.9,
     "Solo cello, long low phrases, lonely lighthouse at dawn, restrained and warm": 0.7,
     "Wind chimes and low synth pad, the bare island at night, the moon on the water": 0.6,
     "Glassy harmonium drones with the hiss of waves on granite, slow and wide, almost still": 0.5,
     "Tin whistle and frame drum, a storm coming up over the sea, restless": 0.3}
music = {**land['music'], "prompts": [{"text": p["text"], "weight": w.get(p["text"], 0)} for p in land['music']["prompts"]],
         "bpm": 62, "density": 0.25, "brightness": 0.4}


def side(theta, r=RS):
    a, d = at(theta, r)
    return {"across": a, "distance": d, "facing": r3(theta + 180)}


def length(profile):
    return r3(sum(math.hypot(profile[i][0] - profile[i - 1][0], profile[i][1] - profile[i - 1][1]) for i in range(1, len(profile))))


def card(id, name, a, d, box, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    o["box"] = box
    o["inside"] = True
    return o


# the forms' paintings: the way round by the profile's length (lamp.js, lamp_top.js, barrel.js)
PEDESTAL = [[0.13, 0.9], [0.17, 0.86], [0.15, 0.78], [0.1, 0.62], [0.1, 0.24], [0.17, 0.16], [0.27, 0.07], [0.29, 0]]
CAP = [[0.06, 0.65], [0.07, 0.62], [0.07, 0.36], [0.2, 0.26], [0.36, 0.08], [0.4, 0]]
CASK = [[0.25, 0.82], [0.29, 0.7], [0.31, 0.41], [0.29, 0.12], [0.25, 0]]
round_box = lambda r, p: [-r3(math.pi * r), -length(p), r3(math.pi * r), 0]
wall_box = [-r3(WS / 2), -H, r3(WS / 2), 0]
light = island.light(WIND)
light["inside"] = 0.9
for k, v in {"night": 0.85, "storm": 0.6}.items():
    light["looks"][k]["inside"] = v
far = island.lights(([30, 40], "#fff1dc", 1.3), ([5, 6], "#ffe0c2", 1.3), [30, 5], [11, 5], lantern=False)
barrel = at(-100, 2.2)
spec = {
    "engine": 3,
    "title": "The Lantern Room",
    "caption": "The lantern room at the top of the lighthouse.",
    "horizon": 0.3,
    "camera": {"mode": "picture"},
    "light": light,
    "lights": [
        {"id": "lamp", "of": "burner#flame", "color": "#ffd590", "strength": 1.4, "reach": 7, "flicker": 0.05, "glow": 0.2},
        {"id": "beam", "of": "burner#beam", "on": "beam", "color": "#fff1c8", "strength": 6, "reach": 600,
         "cone": {"bearing": 0, "height": -1, "width": 10, "soft": 0.35}, "place": {"bearing": "beam_turn"}},
        {"id": "blue_flame", "of": "burner#blue", "color": "#9cbcff", "strength": 0.9, "reach": 4, "flicker": 0.2},
        lantern.light("lantern", "lantern#flame", reach=5),
        *far,
        {"id": "glass_light", "of": "glazing", "daylight": 1}],
    "modules": ["cast", "island", "lantern", "beats"],
    "objects": [
        island.sky(0.31, (1.47, -0.4), 0.98, 1.47),
        island.sea(-16, {"strength": 0.22, "fade": 0, "rough": 0.6, "ripple": 0.45}),
        {"id": "gallery_floor", "name": "The gallery", "plane": True, "across": C[0], "distance": C[1], "elevation": -0.05, "width": 2 * GR,
         "depth": 2 * GR},
        {"id": "gallery", "name": "The gallery's rail", "elevation": -0.05, "box": [-r3(RAIL_W / 2) - 0.03, -1.12, r3(RAIL_W / 2) + 0.03, 0.02],
         "shadow": True, "copies": [{**side(t, RAIL_S), "elevation": -0.05} for t in [36, 0, 72, 108]]},
        {"id": "floor", "name": "The floor", "plane": True, "across": C[0], "distance": C[1], "elevation": 0, "width": 2 * R, "depth": 2 * R,
         "inside": True},
        {"id": "ceiling", "name": "The ceiling", "plane": True, "across": C[0], "distance": C[1], "elevation": H, "width": 2 * R + 0.2,
         "depth": 2 * R + 0.2, "tilt": 180, "inside": True},
        {"id": "wall", "name": "The landward sides", "box": wall_box, "inside": True, "copies": [side(t) for t in SOLID]},
        card("soot", "The sooty wall by the burner", *at(SOOT, RS), wall_box, facing=r3(SOOT + 180)),
        {"id": "glazing", "name": "The glazed sides", "box": wall_box, "inside": True, "copies": [side(t) for t in GLAZED]},
        card("glass_door", "The glazed side with the gallery door", *at(DOOR_SIDE, RS), wall_box, facing=r3(DOOR_SIDE + 180)),
        card("crack", "The struck glass", *at(36, RS - 0.01), wall_box, facing=216),
        {"id": "spray_right", "name": "Spray on the struck glass", "on": "crack", "distance": 0.03, "elevation": r3((H + PARAPET) / 2),
         "particles": {"kind": "drops", "source": [r3(WS - 0.1), 0, r3(H - PARAPET - 0.1)], "rate": 6, "amount": "storm"}},
        {"id": "spray_door", "name": "Spray on the door's glass", "on": "glass_door", "distance": 0.03, "elevation": r3((H + PARAPET) / 2),
         "particles": {"kind": "drops", "source": [r3(WS - 0.1), 0, r3(H - PARAPET - 0.1)], "rate": 6, "amount": "storm"}},
        card("lamp", "The lamp's pedestal", *C, round_box(0.18, PEDESTAL), shadow=True),
        card("burner", "The lamp", *C, [-0.45, -r3(LENS["top"] - LENS["foot"]) - 0.02, 0.45, 0.02], elevation=LENS["foot"],
             uniforms={"spin": 0, "lit": 0, "blue": 0, "clean": 0}),
        card("lamp_top", "The lamp's cap", *C, round_box(0.25, CAP), elevation=LENS["top"]),
        {"id": "burner_smoke", "name": "Soot off the smoking burner", "inside": True,
         "across": C[0], "distance": r3(C[1] - 0.45), "elevation": 1.95,
         "particles": {"kind": "smoke", "color": "#3a3634", "rate": 10, "size": [0.1, 0.9], "speed": [0.2, 0.5],
                       "life": [2, 3.5], "opacity": 0.55, "amount": "smoke"}},
        card("sheets", "The sheets by the lamp", C[0], r3(C[1] - 0.12), [-0.21, -0.31, 0.21, 0.01], elevation=0.32),
        card("pot", "The pot in the frock coat", -0.6, 3.75, [-0.3, -0.4, 0.4, 0.02], shadow=True),
        card("barrel", "The barrel of oil", *barrel, round_box(0.29, CASK), shadow=True),
        {"id": "cot", "name": "The camp bed", "plane": True, "across": 1.75, "distance": 4.2, "elevation": 0.4, "width": 1.1, "depth": 1.9,
         "inside": True, "shadow": True},
        card("cot_legs", "The camp bed's legs", 1.75, 4.2, [-0.38, -0.44, 0.38, 0.03]),
        card("stair", "The stair under the hatch", HATCH["a"], r3(HATCH["d"] + HATCH["half"]), [-0.42, -2.42, 0.42, 0.02], elevation=-2.4),
        lantern.element("lantern", "The storm lantern", *at(-40, 1.6), inside=True),
        {"id": "papa", "name": "Moominpappa", "person": {"cast": "cast", "who": "papa", "does": "hands_behind"}, "across": 0.8, "distance": 3.6,
         "place": {"across": "papa_a", "distance": "papa_d"}, "inside": True},
        {"id": "my", "name": "Little My", "person": {"cast": "cast", "who": "my"}, "across": -1.4, "distance": 4.62,
         "place": {"across": "my_a", "distance": "my_d"}, "inside": True},
        {"id": "troll", "name": "Moomintroll", "person": {"cast": "cast", "who": "troll"}, "across": -1.83, "distance": 4.58,
         "place": {"across": "troll_a", "distance": "troll_d"}, "inside": True},
    ],
    "state": {
        **island.STATE,
        "lenses": 0, "flame": "out", "slant": 0, "sheets": 0, "pot": False, "cot": "none", "gallery_glass": "whole",
        "lantern_at": "none", "lantern_flame": "full", "smoke": 0, "beat": "", "beat_next": "",
        "papa_a": 0.8, "papa_d": 3.6, "my_a": -1.4, "my_d": 4.62, "troll_a": -1.83, "troll_d": 4.58,
        "papa_turn": 205, "papa_look": "burner#wick", "papa_mood": "thinking",
        "my_turn": 120, "my_look": "papa", "my_mood": "smile",
        "troll_turn": 130, "troll_look": "papa", "troll_mood": "neutral"},
    "states": {
        **island.STATES,
        "lenses": {"range": [0, 1], "smooth": True, "means": "the lens drum: 0 murky … 1 wiped clean"},
        "flame": {"values": ["out", "smoky", "blue", "lit"], "means": "the burner: out; a dull flame smoking; burning blue (warmed with paraffin, the oil not running yet); lit — the lamp burns and the drum turns"},
        "slant": {"range": [0, 1], "smooth": True, "means": "the keeper's pencil under the soot: 0 only grooves … 1 legible in a light held slanting along the wall"},
        "sheets": {"range": [0, 2], "means": "sheets pinned by the lamp: «The Burner», then «The Pot» (one: the second nail bare)"},
        "pot": {"type": "boolean", "means": "the pot of warm oil wrapped in the frock coat, by the lamp"},
        "cot": {"values": ["none", "made", "empty", "taken"], "means": "the camp bed: none; made; set up and nobody sleeps in it (its blanket folded at its foot); slept in"},
        "gallery_glass": {"values": ["whole", "cracked"], "means": "the glass the sea strikes: whole, or cracked in the storm"},
        "lantern_at": {"values": ["none", "floor"], "means": "the storm lantern carried up: not here, or on the floor by the sooty wall"},
        "lantern_flame": {"values": ["full", "low", "out"], "means": "the storm lantern's flame up here: full, turned low, out"},
        "smoke": {"range": [0, 1], "means": "the burner's soot rising — the script sets it from flame"},
        "beat": {"type": "string", "means": "the piece playing (modules/beats)"},
        "beat_next": {"type": "string", "means": "the piece the game plays next (modules/beats: made ready ahead)"},
        **{f"{k}_{x}": {"type": "number", "means": f"where {k} stands, {w}"} for k in ("papa", "my", "troll") for x, w in (("a", "across"), ("d", "distance"))},
        "beam": {**island.STATES["beam"], "means": "the beam out through the glass — the script sets it from flame (lit)"},
    },
    "music": music,
}
island.shaders(folder)
lantern.shader(folder, "lantern")
json.dump(spec, open(folder + '/scene.json', 'w', encoding='utf-8', newline='\n'), indent=2, ensure_ascii=False)
