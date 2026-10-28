# Writes scenes/map/scene.json: the play's map (games.md §2) — Papa's drawing of the island on a long sheet hung as one
# card before a panorama camera, the table's boards round it, the chapters' unseen points c0…c5 in a row over their
# places and the author's point. Its numbers are lib.js's — keep them the same. Run from anywhere:
# python -B tools/map.py <the world's root>
import sys, os
sys.path.insert(0, os.path.join(sys.argv[1], "tools"))
import isle

root = sys.argv[1]
folder = os.path.join(root, "scenes", "map")

SHEET, POINTS, STEP = 12.6, 12, 5.6
HALF = SHEET * 7 / 3 / 2
CHAPTERS = [round(HALF + STEP * i, 3) for i in range(6)]
W = round(CHAPTERS[-1] + HALF, 3)
AUTHOR = 8.5
ROW_UP = round(1.7 + (0.865 - 0.28) * POINTS, 3)


def point(id, name, across):
    return {"id": id, "name": name, "unseen": True, "across": across, "distance": POINTS, "elevation": ROW_UP, "height": 0.1,
            "box": [-0.05, -0.1, 0.05, 0]}


objects = [
    {"id": "desk", "name": "Papa's table under the sheet", "sky": True},
    {"id": "sheet", "name": "Papa's drawing of the island", "across": 0, "distance": SHEET, "facing": 180, "onLand": False,
     "box": [0, -SHEET, W, 0]},
    *[point(f"c{i}", "Chapter", x) for i, x in enumerate(CHAPTERS)],
    point("author", "The author's sign", AUTHOR),
]

spec = {
    "engine": 3,
    "title": "The Map",
    "caption": "",
    "horizon": 0.865,
    "camera": {"mode": "panorama", "span": [CHAPTERS[0], CHAPTERS[-1]]},
    "light": {"grain": 0.08, "vignette": 0.3, "tint": "#e2bf86", "tintStrength": 0.04},
    "state": {"shown": 0, "come": 0, "camera_x": CHAPTERS[0]},
    "states": {
        "shown": {"type": "number", "means": "the chapter the player is at (0 the prologue … 4 the fourth, 5 the epilogue): the view goes to its point c<i> (camera_x)"},
        "come": {"type": "number", "means": "each new value brings the view back to the chapter shown (camera_x), the player's drag with it"},
    },
    "objects": objects,
}
isle.write_json(os.path.join(folder, "scene.json"), spec)
print("chapters", CHAPTERS, "width", W)
