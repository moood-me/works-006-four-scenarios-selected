# The storm lantern for a scene's generator (modules/lantern.md): the element as every scene writes it, its light, and
# its shader copied beside it.
import os, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
BOX = [-0.16, -0.48, 0.16, 0.03]
BOX_BRACKET = [-0.16, -0.48, 0.16, 0.27]
# its states, for a scene's "states" (the key's name is the scene's)
FLAMES = ["full", "low", "out", "frost"]


def element(id, name, across, distance, elevation=0, bracket=False, **k):
    """The lantern standing at its foot (its code: elements/<id>.js calls the module's paint; its animate the
    module's move; its shader copied by shader()). bracket — on the iron bracket at a boat's bow (the paint's
    `bracket: true`): its anchor the lantern's foot on the bracket's top. On a boat, give it `on` the boat."""
    return {"id": id, "name": name, "across": across, "distance": distance, "elevation": elevation, "box": BOX_BRACKET if bracket else BOX,
            "uniforms": {"lit": 0}, **k}


def light(id, of, reach=6, strength=1.2):
    """Its light: the element's own (of: "<id>#flame"), warm, flickering a little; its glow follows the flame."""
    return {"id": id, "of": of, "color": "#ffd08c", "strength": strength, "reach": reach, "flicker": 0.1, "glow": 0.2}


def shader(scene, id):
    """Copies the globe's shader beside the scene's lantern element (elements/<id>.wgsl)."""
    shutil.copyfile(os.path.join(HERE, "lantern", "lantern.wgsl"), os.path.join(scene, "elements", id + ".wgsl"))
