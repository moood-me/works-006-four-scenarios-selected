// The river runs straight away from the viewer on the left: our quay's edge 1.6 m to the left of the viewer, the bed
// 3.5 m down beyond it, the far (bay) bank coming up out of the water 21–24 m further left and rising gently away.
// On our side the town's hill climbs to the right and away from 28 m out; the quay and the lane stay level
const p = -1.6 - across;
return -3.5 * (anim.span(p, 0, 0.3) - anim.span(p, 20.5, 24)) + 4 * anim.span(-across, 28, 80) + 24 * anim.span(distance, 28, 160) * anim.span(across, 0, 6);
