// The pendulum swings, a beat a second each way (the clock that ticks in the parlour's quiet).
e.layer("pendulum").rotate = 0.06 * Math.sin(e.t * Math.PI);
