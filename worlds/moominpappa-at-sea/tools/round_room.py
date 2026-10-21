# Writes scenes/round-room/scene.json: the room's numbers worked out of its circle — C, R, H, WIN as the scene's lib.js
# has them (keep the two the same).
# Run from the world's root: python tools/round_room.py .
import json, math, sys
root = sys.argv[1]
C, R, H = (0, 3.8), 3.6, 3.6
WIN = {"mid": 32, "half": 0.6, "sill": 0.65, "top": 2.3, "deep": 0.6}
D = math.pi / 180
r3 = lambda v: round(v, 3)
at = lambda t, r=R: [r3(C[0] + r * math.sin(t * D)), r3(C[1] + r * math.cos(t * D))]
HALF = WIN["half"] / R / D
W0, W1 = WIN["mid"] - HALF, WIN["mid"] + HALF
def wall(a, b):
    m = (a + b) / 2
    return {"anchor": at(m), "facing": r3(m + 180), "width": r3(R * (b - a) * D), "deg": r3(b - a), "mid": r3(m)}
WA, WB, WC = wall(-150, W0), wall(W1, 150), wall(W0, W1)
WIN_H = r3(WIN["top"] - WIN["sill"])
land = json.load(open(root + '/scenes/landing/scene.json', encoding='utf-8'))
music = land['music']
w = {"Wind chimes and low synth pad, the bare island at night, the moon on the water": 0.9,
     "Sparse felt piano, three notes and a long pause, cold clear morning air, gentle melancholy": 0.8,
     "Soft accordion holding long quiet chords, a little out of breath, a Finnish summer evening by the shore": 0.6,
     "Solo nylon-string guitar picking a slow, plain northern folk tune, close and intimate, sea wind behind it": 0.5,
     "A celesta and a flute, an imaginary garden painted on a wall, bees and summer warmth": 0.3}
music = {**music, "prompts": [{"text": p["text"], "weight": w.get(p["text"], 0)} for p in music["prompts"]],
         "bpm": 66, "density": 0.25, "brightness": 0.35}


def card(id, name, a, d, box, **k):
    o = {"id": id, "name": name, "across": a, "distance": d}
    o.update(k)
    o["box"] = box
    o["inside"] = True
    return o


o0, o1 = at(W0, R + WIN["deep"]), at(W1, R + WIN["deep"])
poly = [o0 + [WIN["sill"]], o1 + [WIN["sill"]], o1 + [WIN["top"]], o0 + [WIN["top"]]]
spec = {
    "engine": 3,
    "title": "The Round Room",
    "caption": "Evening in the round room. One lantern, and everyone looking at it.",
    "horizon": 0.4,
    "camera": {"mode": "picture"},
    "light": {"ambient": 0.55, "ambientColor": "#6a80c4", "inside": 0.65, "bounce": 0.55, "haze": 0.025, "hazeColor": "#26304a",
              "hazeGlow": 0.25, "shafts": 0.5, "vignette": 0.3, "grain": 0.08,
              "wind": [1, 0.2, 1.1], "saturation": 1.05},
    "lights": [
        {"id": "lamp", "of": "lantern#flame", "color": "#ffd08c", "strength": 1.2, "reach": 6, "flicker": 0.1, "glow": 0.2},
        {"id": "moon", "from": [28, 30], "color": "#d2ddf6", "strength": 1.6, "through": [poly]},
        {"id": "window_light", "of": "casement", "daylight": 1}],
    "modules": ["cast"],
    "objects": [
        {"id": "sky", "name": "Night sky", "sky": True},
        {"id": "sea", "name": "The sea below", "plane": True, "across": 0, "distance": 1450, "elevation": -5, "width": 2400, "depth": 3000,
         "reflect": {"strength": 0.2, "fade": 0, "rough": 0.6, "ripple": 0.4}},
        {"id": "floor", "name": "The floor", "plane": True, "across": 0, "distance": 3.8, "elevation": 0, "width": 7.4, "depth": 7.4, "inside": True},
        {"id": "ceiling", "name": "The ceiling", "plane": True, "across": 0, "distance": 3.8, "elevation": 3.6, "width": 7.4, "depth": 7.4,
         "tilt": 180, "inside": True},
        card("wall_a", "The wall, left of the window", *WA["anchor"], [-WA["width"] / 2, -H, WA["width"] / 2, 0], facing=WA["facing"]),
        card("wall_b", "The wall, right of the window", *WB["anchor"], [-WB["width"] / 2, -H, WB["width"] / 2, 0], facing=WB["facing"]),
        card("win_low", "The wall under the window", *WC["anchor"], [-WC["width"] / 2, -WIN["sill"], WC["width"] / 2, 0], facing=WC["facing"]),
        card("win_top", "The wall over the window", *WC["anchor"], [-WC["width"] / 2, -r3(H - WIN["top"]), WC["width"] / 2, 0], facing=WC["facing"], elevation=WIN["top"]),
        {"id": "reveal", "name": "The window's cheeks", "box": [-WIN["deep"] / 2, -WIN_H, WIN["deep"] / 2, 0], "inside": True,
         "copies": [{"across": at(W0, R + WIN["deep"] / 2)[0], "distance": at(W0, R + WIN["deep"] / 2)[1], "elevation": WIN["sill"], "facing": r3(W0 + 90)},
                    {"across": at(W1, R + WIN["deep"] / 2)[0], "distance": at(W1, R + WIN["deep"] / 2)[1], "elevation": WIN["sill"], "facing": r3(W1 + 270)}]},
        {"id": "sill", "name": "The windowsill", "plane": True, "across": at(WIN["mid"], R + WIN["deep"] / 2)[0], "distance": at(WIN["mid"], R + WIN["deep"] / 2)[1], "elevation": WIN["sill"],
         "width": 2 * WIN["half"], "depth": WIN["deep"], "rotation": -WIN["mid"], "inside": True},
        card("casement", "The window", *at(WIN["mid"], R + WIN["deep"] - 0.08), [-WIN["half"], -WIN_H, WIN["half"], 0], facing=WIN["mid"] + 180,
             elevation=WIN["sill"]),
        card("stair", "The stair to the hatch", *at(-48, 3.3), [-1.25, -3.65, 1.25, 0.03], facing=132, shadow=True),
        card("shelf", "The shelf with the paraffin", *at(8, 3.48), [-0.5, -0.5, 0.5, 0.2], facing=188, elevation=1.45, shadow=True),
        card("stove", "The stove", *at(58, 3.15), [-0.4, -3.65, 0.8, 0.05], shadow=True),
        card("bunks", "The bunks", *at(98, 3.2), [-1.05, -1.8, 1.05, 0.03], facing=278, shadow=True),
        {"id": "table", "name": "The table", "plane": True, "across": 0, "distance": 4.45, "elevation": 0.72, "width": 1.5, "depth": 0.8,
         "inside": True},
        card("table_legs", "The table's legs", 0, 4.45, [-0.85, -0.76, 0.85, 0.05], facing=180, shadow=True),
        card("lantern", "The storm lantern", 0.12, 4.4, [-0.16, -0.48, 0.16, 0.03], elevation=0.72, glows=True),
        card("stool", "Moominmamma's stool", -1.05, 4.25, [-0.22, -0.5, 0.22, 0.03], shadow=True),
        card("handbag", "Moominmamma's handbag", -1.45, 4.0, [-0.25, -0.4, 0.25, 0.03], facing=200, shadow=True),
        {"id": "motes", "name": "Dust in the moonlight", "across": 1.4, "distance": 6.1, "elevation": 0.9, "inside": True,
         "particles": {"kind": "dust", "source": [1.6, 1.6, 1.4]}},
        {"id": "papa", "name": "Moominpappa", "person": {"cast": "cast", "who": "papa", "does": "hands_behind"}, "across": -2.15, "distance": 5.15, "inside": True},
        {"id": "mama", "name": "Moominmamma", "person": {"cast": "cast", "who": "mama", "does": "seated"}, "across": -1.05, "distance": 4.25, "inside": True},
        {"id": "my", "name": "Little My", "person": {"cast": "cast", "who": "my", "does": "seated"}, "across": 0.55, "distance": 4.25, "inside": True},
        {"id": "troll", "name": "Moomintroll", "person": {"cast": "cast", "who": "troll"}, "across": at(WIN["mid"], 3.2)[0], "distance": at(WIN["mid"], 3.2)[1], "inside": True},
    ],
    "state": {
        "papa_turn": 145, "papa_look": "lantern#flame", "papa_mood": "thinking",
        "mama_on": [-1.05, 4.25, 0.45], "mama_turn": 115, "mama_look": "lantern#flame", "mama_mood": "smile",
        "my_on": [0.55, 4.25, 0.72], "my_turn": 230, "my_look": "papa", "my_mood": "smile",
        "troll_turn": WIN["mid"], "troll_look": at(WIN["mid"], 12) + [0.4], "troll_mood": "thinking"},
    "music": music,
}
json.dump(spec, open(root + '/scenes/round-room/scene.json', 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
