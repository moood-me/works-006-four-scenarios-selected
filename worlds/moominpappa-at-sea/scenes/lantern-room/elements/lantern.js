// The storm lantern, carried up (`lantern_at`: floor — standing on the boards by the sooty wall; none — not here): its
// flame by `lantern_flame` (full, low, out). The globe and the flame are a layer the shader lights from within as much
// as the flame burns (u_lit, animate); the flame's glow and light the engine's (e.light "flame", dimmed by e.glow).
const S = e.state;
if ((S.lantern_at ?? "none") !== "none") e.lib.stormLantern(g, e, S.lantern_flame ?? "full");
e.light(0, -0.21, 0.14, "#ffc874", 1.2, "flame");
e.at(0, -0.21, "flame");
