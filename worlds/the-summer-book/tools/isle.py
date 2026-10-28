# The island's hour and weather for a scene's generator (modules/isle.md): what every scene of the island that sees
# its sea and sky writes into its scene.json the same way — the common keys and what they mean, the light by the hour
# (the day as the base, the looks late, dawn, dusk, night, fog_air, storm, flash), the far lights (the suns by the hour,
# the moon, the lightning), the sky and the sea elements with their code (the sky with its shader), the rain. A scene gives only what
# is its own: where its suns, its moon and its bolt stand on its sky, where its sky's colours end, its wind, its sea's
# mirror.
import json, os, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
A = 16 / 9

# the common keys: where they start (the empty play: a June day, a full moon, the sea as it is, no fog) and what they are
STATE = {"dawn": 0, "dusk": 0, "night": 0, "late": 0, "calm": 0, "storm": 0, "flash": 0, "fog": 0, "fog_air": 0, "moon": 1}
STATES = {
    "dawn": {"range": [0, 1], "smooth": True, "means": "the June dawn: the sun just up, veiled, low (0 — the day)"},
    "dusk": {"range": [0, 1], "smooth": True, "means": "the dusk: the sun just gone, the afterglow low (0 — the day); over dawn"},
    "night": {"range": [0, 1], "smooth": True, "means": "the moonlit night (0 — the day): blue, light enough for faces; over dawn and dusk"},
    "late": {"range": [0, 1], "means": "August: the sun lower, the light warmer, the grass burnt (0 — June); changes between steps"},
    "calm": {"range": [0, 1], "smooth": True, "means": "the dead calm of July: the sea glass, not a streak on it"},
    "storm": {"range": [0, 1], "smooth": True, "means": "the thunderstorm: a white-grey sky and its heavy clouds, grey light, rain, wind, crests and foam; over a half — lightning now and then (flash:strike told)"},
    "flash": {"range": [0, 1], "smooth": True, "means": "lightning: the sky and everything lit white a moment (the storm's script and the game's moments)"},
    "fog": {"range": [0, 1], "smooth": True, "means": "the fog: up to a half its banks coming in over the water (0.5 — its wall on the horizon, banks over the sea); over a half the island in it — the air white, things gone in tens of metres"},
    "fog_air": {"range": [0, 1], "smooth": True, "means": "the scene's own (the island's script sets it from fog): the thick fog's look"},
    "moon": {"range": [0, 1], "means": "the moon's phase: 0 a thin crescent … 1 full (changes between steps; seen by night)"},
}

# the day: the base light — the pearl-grey June day (as the veranda's morning was approved)
DAY = {"ambient": 0.8, "ambientColor": "#ebe6de", "bounce": 0.6, "haze": 0.05, "hazeColor": "#e6e1d8", "hazeGlow": 0.3,
       "shafts": 0.6, "tint": "#fff2e0", "tintStrength": 0, "saturation": 1.05, "vignette": 0.25, "grain": 0.06}


def light(wind, **extra):
    """The light: the day, and the looks by the hour and the weather (in this order: a later one over an earlier).
    wind — the scene's [across, distance, strength] (the storm keeps its way and blows hard); extra — the scene's own
    fields over the day's (a room's `inside`)."""
    looks = {
        "late": {"ambient": 0.78, "ambientColor": "#eee4d4", "bounce": 0.6, "haze": 0.07, "hazeColor": "#e4dccd", "hazeGlow": 0.3,
                 "shafts": 0.55, "tint": "#ffd9a6", "tintStrength": 0.07, "saturation": 1.0, "vignette": 0.25, "grain": 0.06,
                 "lights": {"sun": 0}},
        # the June dawn (as the shore's was approved)
        "dawn": {"ambient": 0.68, "ambientColor": "#e4e7ea", "bounce": 0.5, "haze": 0.12, "hazeColor": "#d8dbda", "hazeGlow": 0,
                 "shafts": 0, "tintStrength": 0, "saturation": 1.1, "vignette": 0.2, "grain": 0.06,
                 "lights": {"sun": 0, "sun_late": 0}},
        # the dusk (as the cape's August evening was approved)
        "dusk": {"ambient": 0.82, "ambientColor": "#ebe5e0", "bounce": 0.5, "haze": 0.1, "hazeColor": "#d8d5d4", "hazeGlow": 0.9,
                 "shafts": 0.2, "tintStrength": 0, "saturation": 1.05, "vignette": 0.25, "grain": 0.07,
                 "lights": {"sun": 0, "sun_late": 0, "sun_dawn": 0}},
        # the moonlit night (as the cape's was approved): blue, light enough to see faces
        "night": {"ambient": 0.64, "ambientColor": "#8a9bc8", "bounce": 0.5, "haze": 0.16, "hazeColor": "#8794b4", "hazeGlow": 1.2,
                  "shafts": 0.35, "tint": "#a2b2d8", "tintStrength": 0.06, "saturation": 0.85, "vignette": 0.25, "grain": 0.07,
                  "lights": {"sun": 0, "sun_late": 0, "sun_dawn": 0, "sun_dusk": 0}},
        # the thick fog: white air, glowing round every light and under the moon
        "fog_air": {"haze": 0.6, "hazeColor": "#dde1e5", "hazeGlow": 1.3, "shafts": 0.45, "saturation": 0.85},
        # the storm: light, white-grey, no sun; the wind up
        "storm": {"ambient": 0.74, "ambientColor": "#c4ccd8", "haze": 0.24, "hazeColor": "#b9c0c8", "hazeGlow": 0.5, "shafts": 0.05, "tint": "#c6d2de", "tintStrength": 0.06,
                  "saturation": 0.78, "wind": [wind[0], wind[1], 2.4],
                  "lights": {"sun": 0, "sun_late": 0, "sun_dawn": 0, "sun_dusk": 0, "moon": 0.25}},
        "flash": {"ambient": 0.95, "ambientColor": "#e8eeff", "brightness": 1.12, "saturation": 0.7},
    }
    return {**DAY, **extra, "wind": wind, "looks": looks}


def lights(sun, late, dawn, dusk, moon, bolt):
    """The far lights: the sun by day, in August, at dawn, at dusk and the moon — each (from, colour, strength), `from`
    the sky's point ("sky#sun", "sky#sun_late", "sky#sun_dawn", "sky#moon") where its disc is seen, or [bearing, height]
    where it is not (behind the viewer, gone under the horizon) —, and the lightning from `bolt` [bearing, height]."""
    def far(id, f, on=None):
        out = {"id": id, "from": f[0], "color": f[1], "strength": f[2]}
        if on: out["on"] = on
        return out
    return [far("sun", sun), far("sun_late", late, "late"), far("sun_dawn", dawn, "dawn"), far("sun_dusk", dusk, "dusk"),
            far("moon", moon, "night"), {"id": "flash", "from": bolt, "color": "#e8eeff", "strength": 1.8, "on": "flash"}]


def _write(path, text):
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def sky(folder, low, sun, late, dawn, dusk_x, night_x, bolt, moon=None, band_x=A / 2):
    """The sky element, its code, animate and shader written into the scene's elements/: its colours end at `low`
    (stage heights: the scene's horizon); the day's sun, August's and the dawn's at `sun`, `late`, `dawn` [x, y]; the
    afterglow at dusk_x, the night's pale horizon at night_x; the moon's disc at `moon` [x, y] (None: not in the sky
    ahead); the lightning from `bolt` [x, y]."""
    el = os.path.join(folder, "elements")
    o = {"low": low, "sun": sun, "late": late, "dawn": dawn, "moon": moon, "bolt": bolt}
    _write(os.path.join(el, "sky.js"), "// The island's sky (modules/isle.md) — written by tools/isle.py from the scene's generator.\n"
           f"e.kit.isle.sky(g, e, {json.dumps(o)});\n")
    _write(os.path.join(el, "sky.animate.js"), "// the hour and the weather to the sky's shader (modules/isle.md) — written by tools/isle.py\n"
           f"e.kit.isle.skyMove(e, {{ moon: {'true' if moon else 'false'} }});\n")
    shutil.copyfile(os.path.join(HERE, "isle", "sky.wgsl"), os.path.join(el, "sky.wgsl"))
    far = [-1, -1]
    m = moon or far
    return {"id": "sky", "name": "Sky", "sky": True,
            "uniforms": {"low": low, "band_x": band_x, "sun_x": sun[0], "sun_y": sun[1], "late_x": late[0], "late_y": late[1],
                         "dawn_x": dawn[0], "dawn_y": dawn[1], "dusk_x": dusk_x, "night_x": night_x, "moon_x": m[0], "moon_y": m[1],
                         "dawn": 0, "dusk": 0, "night": 0, "late": 0, "storm": 0, "flash": 0, "fog": 0, "phase": 1}}


def sea(folder, elevation, reflect, centre=(0, 2000), size=(6000, 4000), clear=()):
    """The sea plane, its code and animate written into the scene's elements/: centred at `centre` [across,
    distance], `size` [width, depth] metres, at the scene's sea level; `reflect` its mirror (the scene's own); `clear` —
    [[across, distance, rx, rz], …] where the water is clear over the rock. Its foam runs along the scene's lib.edge
    ([[across, distance], …] on the waterline)."""
    el = os.path.join(folder, "elements")
    o = f'centre: {json.dumps(list(centre))}, size: {json.dumps(list(size))}, clear: {json.dumps([list(c) for c in clear])}'
    _write(os.path.join(el, "sea.js"), "// The island's sea (modules/isle.md) — written by tools/isle.py from the scene's generator.\n"
           f"e.kit.isle.sea(g, e, {{ {o}, edge: e.lib.edge }});\n")
    _write(os.path.join(el, "sea.animate.js"), "// the calm and the storm on the sea's layers (modules/isle.md) — written by tools/isle.py\n"
           "e.kit.isle.seaMove(e);\n")
    return {"id": "sea", "name": "Sea", "plane": True, "across": centre[0], "distance": centre[1], "elevation": elevation,
            "width": size[0], "depth": size[1], "reflect": reflect}


RAIN = {"id": "rain", "name": "Rain", "particles": {"kind": "rain", "amount": "storm", "count": 9000, "wind": 1.2}}


def write_json(path, spec):
    _write(path, json.dumps(spec, ensure_ascii=False, indent=2) + "\n")
