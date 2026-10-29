// The bay's floor: under the pier where the viewer stands (0), going down to 2.6 m under the water (its surface at
// -0.63) from 2.4 m out; a sandbar at the stone's right front (2.3, 6.2) coming up to knee-deep (-1.1)
const qa = (across - 2.3) / 1.2;
const qd = (distance - 6.2) / 1.0;
return -2.6 * anim.span(distance, 0.1, 2.4) + 1.5 * anim.span(qa * qa + qd * qd, 1, 0.45);
