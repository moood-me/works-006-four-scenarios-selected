// where she sits (groke_at), and how much rime, warmed sand and trail show — numbers to the shader; nothing painted
const L = e.lib, s = e.state, seat = L.SEATS[s.groke_at] ?? L.SEATS.edge;
e.uniform("sx", seat[0] + 2.2);
e.uniform("sy", 12 - seat[1]);
e.uniform("tl", Math.max(0.1, seat[0] - (L.WATER - 0.55)));
e.uniform("wx", L.WATER - 0.55 + 2.2);
e.uniform("frost", s.frost);
e.uniform("warm", s.warm);
e.uniform("track", s.track);
