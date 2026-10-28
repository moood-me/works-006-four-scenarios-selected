# The island's hour and weather for a scene's generator (modules/island.md): what every scene of the island that sees
# its sea and sky writes into its scene.json the same way — the common keys and what they mean, the light by the hour
# (the day as the base, the looks dawn, dusk, night, storm, flash), the far lights (the sun by the hour, the moon, the
# lightning, the lighthouse's lantern), the sky and the sea elements, the rain — and the two shaders copied beside them.
# A scene gives only what is its own: where its sun stands at each hour, where its moon and its bolt are on its sky,
# where its sky's colours end, its wind.
import json, math, os, shutil

HERE = os.path.dirname(os.path.abspath(__file__))

# the common keys: where they start (the empty play: the day, a waxing moon, calm, the lighthouse dark) and what they are
STATE = {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "calm": 0, "flash": 0, "lighthouse_lit": 0, "beam": 0, "beam_turn": 0, "beam_tilt": -1, "room_lit": 0}
STATES = {
    "dawn": {"range": [0, 1], "smooth": True, "means": "the dawn's light and sky (0 — the day)"},
    "dusk": {"range": [0, 1], "smooth": True, "means": "the dusk's light and sky, the afterglow (0 — the day); may move before the eyes"},
    "night": {"range": [0, 1], "smooth": True, "means": "the moonlit night (0 — the day); over dawn and dusk"},
    "moon": {"range": [0, 1], "means": "the moon's phase: 0 a thin crescent … 1 full (changes between steps; seen by night)"},
    "storm": {"range": [0, 1], "smooth": True, "means": "the storm: grey light and sky, its clouds, many quick crests, rain, wind; over a half — lightning now and then"},
    "calm": {"range": [0, 1], "smooth": True, "means": "the sea calm: few crests, slow (a still night)"},
    "flash": {"range": [0, 1], "smooth": True, "means": "lightning: the sky and everything lit white a moment (the storm's script and the game's moments)"},
    "lighthouse_lit": {"range": [0, 1], "smooth": True, "means": "the lighthouse's lamp burns: the lantern's glass warm, its light and glow"},
    "beam": {"range": [0, 1], "smooth": True, "means": "the lighthouse's beam: 0 none … 1 full; while on, the island's script turns it (seen in the air by night, at dusk, in a storm)"},
    "beam_turn": {"type": "number", "means": "the beam's bearing, degrees (the island's script turns it on and on while beam is on)"},
    "room_lit": {"range": [0, 1], "means": "the round room's window on the tower lit from within (seen from outside)"},
    "beam_tilt": {"range": [-60, 10], "smooth": True, "means": "the beam's height, degrees (−1 a little down, out to sea; a piece tilts it down onto someone «in the beam»)"},
}

# the day: the base light (as the cape's late afternoon was approved)
DAY = {"ambient": 0.62, "ambientColor": "#c9d2e4", "bounce": 0.55, "haze": 0.04, "hazeColor": "#eadcc6", "hazeGlow": 0,
       "shafts": 0.3, "tint": "#ffd9a6", "tintStrength": 0.07, "vignette": 0.24, "grain": 0.08, "saturation": 1.08}


def light(wind):
    """The light: the day, and the looks by the hour and the weather (in this order: a later one over an earlier).
    wind — the scene's [across, distance, strength] (the storm keeps its way and blows hard)."""
    looks = {
        # the dawn (as the landing rocks' first morning was approved)
        "dawn": {"ambient": 0.68, "ambientColor": "#dfe6ef", "bounce": 0.55, "haze": 0.035, "hazeColor": "#e3e1e0",
                 "hazeGlow": 0, "shafts": 0, "tint": "#f6dccb", "tintStrength": 0.05, "vignette": 0.22, "grain": 0.08,
                 "saturation": 1.08, "lights": {"sun": 0}},
        "dusk": {"ambient": 0.6, "ambientColor": "#cdbfdc", "haze": 0.05, "hazeColor": "#e8c4b4", "hazeGlow": 0.3,
                 "shafts": 0.25, "tint": "#ffb48c", "tintStrength": 0.1, "saturation": 1.05, "lights": {"sun": 0}},
        # the moonlit northern night: light enough to see faces, blue
        "night": {"ambient": 0.5, "ambientColor": "#9cb0e0", "bounce": 0.6, "haze": 0.05, "hazeColor": "#5f7299",
                  "hazeGlow": 0.6, "shafts": 0.35, "tint": "#a8bcff", "tintStrength": 0.1, "saturation": 0.8,
                  "vignette": 0.26, "lights": {"sun": 0, "sun_dawn": 0, "sun_dusk": 0}},
        "storm": {"ambient": 0.6, "ambientColor": "#bcc6d0", "haze": 0.13, "hazeColor": "#9ea9b3", "shafts": 0.1,
                  "tint": "#c4d4e4", "tintStrength": 0.08, "saturation": 0.8, "wind": [wind[0], wind[1], 2.4],
                  "lights": {"sun": 0.25, "sun_dawn": 0.3, "sun_dusk": 0.3, "moon": 0.6, "beam": 0.4}},
        "flash": {"ambient": 0.9, "ambientColor": "#e6ecff", "brightness": 1.1, "saturation": 0.75},
    }
    return {**DAY, "wind": wind, "looks": looks}


def lights(sun, sun_dawn, sun_dusk, bolt, lantern=True):
    """The far lights: the sun by day, at dawn and at dusk ([bearing, height] each — the scene's own), the moon (from
    the sky's moon), the lightning (from where its bolt is); and, when the lighthouse is seen, its lantern and its beam
    (a cone from the lantern, turned by `beam_turn`, on by `beam` — the scene's script calls island.beam)."""
    out = [
        {"id": "sun", "from": sun[0], "color": sun[1], "strength": sun[2]},
        {"id": "sun_dawn", "from": sun_dawn[0], "color": sun_dawn[1], "strength": sun_dawn[2], "on": "dawn"},
        {"id": "sun_dusk", "from": sun_dusk, "color": "#ffb486", "strength": 1.3, "on": "dusk"},
        {"id": "moon", "from": "sky#moon", "color": "#cdd8ff", "strength": 0.9, "on": "night"},
        {"id": "flash", "from": bolt, "color": "#e8eeff", "strength": 1.8, "on": "flash"},
    ]
    if lantern:
        out.append({"id": "lantern", "of": "lighthouse#lantern", "on": "lighthouse_lit", "color": "#ffd27e", "strength": 2.5, "reach": 40})
        out.append({"id": "window", "of": "lighthouse#window", "on": "room_lit", "color": "#ffcf86", "strength": 1.2, "reach": 10})
        out.append({"id": "beam", "of": "lighthouse#beam", "on": "beam", "color": "#fff1c8", "strength": 6, "reach": 600,
                    "cone": {"bearing": 0, "height": -1, "width": 10, "soft": 0.35}, "place": {"bearing": "beam_turn", "height": "beam_tilt"}})
    return out


def sky(low, day, dawn_x, dusk_x, round=False):
    """The sky element: its colours end at `low` (stage heights), the day's sun warm at `day` [x, y], the dawn's and
    the dusk's at the horizon by dawn_x, dusk_x. Its code (elements/sky.js) calls the module's sky with the moon and
    the bolt (and `round: true` when this is); its animate is the module's skyMove. round — painted a whole turn round
    the gaze, for a scene whose camera turns."""
    extra = {"box": [16 / 9 / 2 - math.pi, -0.35, 16 / 9 / 2 + math.pi, 1.25]} if round else {}
    return {"id": "sky", "name": "The sky", "sky": True, **extra,
            "uniforms": {"low": low, "day_x": day[0], "day_y": day[1], "dawn_x": dawn_x, "dusk_x": dusk_x,
                         "dawn": 0, "dusk": 0, "night": 0, "storm": 0, "flash": 0}}


def sea(elevation, reflect, round=False):
    """The sea: one reflecting plane at the scene's sea level — 1450 m out (2400 × 3000 m), or round the start
    (6000 × 6000 m, its code calling the module's sea with `round: true`) for a scene whose camera turns."""
    place = {"distance": 0, "width": 6000, "depth": 6000} if round else {"distance": 1450, "width": 2400, "depth": 3000}
    return {"id": "sea", "name": "The sea", "plane": True, "across": 0, **place, "elevation": elevation,
            "reflect": reflect, "uniforms": {"storm": 0, "calm": 0}}


def lighthouse(across, distance, **k):
    """The lighthouse (a form: elements/lighthouse.js calls the module's lighthouse), sunk 0.45 m so its plinth meets
    its knoll; it repaints only on lighthouse_lit (its lantern's glass)."""
    return {"id": "lighthouse", "name": "The lighthouse", "across": across, "distance": distance, "elevation": -0.45,
            "box": [-5.03, -15.8, 5.03, 0], "shadow": True, "redraw": {"lighthouse_lit": 1, "room_lit": 1}, **k}


def hand_lantern(who):
    """The lantern in someone's paw (the cast's part `lantern`): its light at their `flame`, on by `<who>_lantern`."""
    return {"id": f"{who}_lantern", "at": f"{who}#flame", "on": f"{who}_lantern", "color": "#ffcf86", "strength": 1.4, "reach": 9}


RAIN = {"id": "rain", "name": "Rain", "particles": {"kind": "rain", "amount": "storm", "count": 9000, "wind": 1.2}}


def shaders(scene):
    """Copies the island's shaders beside the scene's sky and sea (elements/sky.wgsl, elements/sea.wgsl)."""
    for name in ("sky", "sea"):
        shutil.copyfile(os.path.join(HERE, "island", name + ".wgsl"), os.path.join(scene, "elements", name + ".wgsl"))



def lib(root, scene):
    """The scene's lib as its paintings and scripts get it (with the island's module), evaluated by node — for a
    generator that needs its numbers (what JSON can carry of what it returns)."""
    import subprocess
    code = ("const fs = require('fs'), r = process.argv[1], s = process.argv[2];"
            "const island = new Function('anim', 'data', fs.readFileSync(r + '/modules/island.js', 'utf8'))({}, null);"
            "const lib = new Function('anim', 'kit', fs.readFileSync(r + '/scenes/' + s + '/lib.js', 'utf8'))({}, { island });"
            "process.stdout.write(JSON.stringify(lib));")
    return json.loads(subprocess.run(["node", "-e", code, root, scene], capture_output=True, text=True, check=True).stdout)
