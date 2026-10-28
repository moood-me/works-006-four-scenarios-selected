// the boat rocks a little on the swell
e.layer('hull').rotate = 0.012 * Math.sin(e.t * 0.9) + 0.006 * Math.sin(e.t * 1.7 + 1);
