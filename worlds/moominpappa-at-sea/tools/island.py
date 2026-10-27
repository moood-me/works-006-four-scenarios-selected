# The island's hour and weather for a scene's generator (modules/island.md): what every scene of the island that sees
# its sea and sky writes into its scene.json the same way — the common keys and what they mean, the light by the hour
# (the day as the base, the looks dawn, dusk, night, storm, flash), the far lights (the sun by the hour, the moon, the
# lightning, the lighthouse's lantern), the sky and the sea elements, the rain — and the two shaders copied beside them.
# A scene gives only what is its own: where its sun stands at each hour, where its moon and its bolt are on its sky,
# where its sky's colours end, its wind.
import json, os, shutil

HERE = os.path.dirname(os.path.abspath(__file__))

# the common keys: where they start (the empty play: the day, a waxing moon, calm, the lighthouse dark) and what they are
STATE = {"dawn": 0, "dusk": 0, "night": 0, "moon": 0.6, "storm": 0, "flash": 0, "lighthouse_lit": 0}
STATES = {
    "dawn": {"range": [0, 1], "smooth": True, "means": "the dawn's light and sky (0 — the day)"},
    "dusk": {"range": [0, 1], "smooth": True, "means": "the dusk's light and sky, the afterglow (0 — the day); may move before the eyes"},
    "night": {"range": [0, 1], "smooth": True, "means": "the moonlit night (0 — the day); over dawn and dusk"},
    "moon": {"range": [0, 1], "means": "the moon's phase: 0 a thin crescent … 1 full (changes between steps; seen by night)"},
    "storm": {"range": [0, 1], "smooth": True, "means": "the storm: grey light and sky, its clouds, many quick crests, rain, wind; over a half — lightning now and then"},
    "flash": {"range": [0, 1], "smooth": True, "means": "lightning: the sky and everything lit white a moment (the storm's script and the game's moments)"},
    "lighthouse_lit": {"range": [0, 1], "smooth": True, "means": "the lighthouse's lamp burns: the lantern's glass warm, its light and glow (no beam)"},
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
                  "lights": {"sun": 0.25, "sun_dawn": 0.3, "sun_dusk": 0.3, "moon": 0.6}},
        "flash": {"ambient": 1.0, "ambientColor": "#e6ecff", "brightness": 1.2, "saturation": 0.7},
    }
    return {**DAY, "wind": wind, "looks": looks}


def lights(sun, sun_dawn, sun_dusk, bolt, lantern=True):
    """The far lights: the sun by day, at dawn and at dusk ([bearing, height] each — the scene's own), the moon (from
    the sky's moon), the lightning (from where its bolt is), and the lighthouse's lantern (when the lighthouse is seen)."""
    out = [
        {"id": "sun", "from": sun[0], "color": sun[1], "strength": sun[2]},
        {"id": "sun_dawn", "from": sun_dawn[0], "color": sun_dawn[1], "strength": sun_dawn[2], "on": "dawn"},
        {"id": "sun_dusk", "from": sun_dusk, "color": "#ffb486", "strength": 1.3, "on": "dusk"},
        {"id": "moon", "from": "sky#moon", "color": "#cdd8ff", "strength": 0.9, "on": "night"},
        {"id": "flash", "from": bolt, "color": "#e8eeff", "strength": 2.2, "on": "flash"},
    ]
    if lantern:
        out.append({"id": "lantern", "of": "lighthouse#lantern", "on": "lighthouse_lit", "color": "#ffd27e", "strength": 2.5, "reach": 40})
    return out


def sky(low, day, dawn_x, dusk_x):
    """The sky element: its colours end at `low` (stage heights), the day's sun warm at `day` [x, y], the dawn's and
    the dusk's at the horizon by dawn_x, dusk_x. Its code (elements/sky.js) calls the module's sky with the moon and
    the bolt; its animate is the module's skyMove."""
    return {"id": "sky", "name": "The sky", "sky": True,
            "uniforms": {"low": low, "day_x": day[0], "day_y": day[1], "dawn_x": dawn_x, "dusk_x": dusk_x,
                         "dawn": 0, "dusk": 0, "night": 0, "storm": 0, "flash": 0}}


def sea(elevation, reflect):
    """The sea: one reflecting plane 1450 m out (2400 × 3000 m) at the scene's sea level."""
    return {"id": "sea", "name": "The sea", "plane": True, "across": 0, "distance": 1450, "elevation": elevation,
            "width": 2400, "depth": 3000, "reflect": reflect, "uniforms": {"storm": 0}}


def lighthouse(across, distance, **k):
    """The lighthouse (a form: elements/lighthouse.js calls the module's lighthouse), sunk 0.45 m so its plinth meets
    its knoll; it repaints only on lighthouse_lit (its lantern's glass)."""
    return {"id": "lighthouse", "name": "The lighthouse", "across": across, "distance": distance, "elevation": -0.45,
            "box": [-5.03, -15.8, 5.03, 0], "shadow": True, "redraw": {"lighthouse_lit": 1}, **k}


RAIN = {"id": "rain", "name": "Rain", "particles": {"kind": "rain", "amount": "storm", "count": 9000, "wind": 1.2}}


def shaders(scene):
    """Copies the island's shaders beside the scene's sky and sea (elements/sky.wgsl, elements/sea.wgsl)."""
    for name in ("sky", "sea"):
        shutil.copyfile(os.path.join(HERE, "island", name + ".wgsl"), os.path.join(scene, "elements", name + ".wgsl"))

