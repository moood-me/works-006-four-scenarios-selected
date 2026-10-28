// The close end of July (`band`): a grey-lilac band lying along the horizon over the sea, heavy, its top soft (the
// storm coming), fading out at its ends. One layer, there as much as `band` says (animate). Metres from its foot on the
// water; 8 km long, about 80 m high.
e.layer('band', {}, c => {
  const grad = c.createLinearGradient(0, -80, 0, 2);
  grad.addColorStop(0, 'rgba(150,146,160,0)');
  grad.addColorStop(0.45, 'rgba(146,142,156,0.6)');
  grad.addColorStop(1, 'rgba(136,134,146,0.9)');
  c.fillStyle = grad;
  c.beginPath();
  c.moveTo(-4000, 2);
  for (let x = -4000; x <= 4000; x += 40) c.lineTo(x, -55 - 14 * Math.sin(x * 0.004 + 1) - 8 * Math.sin(x * 0.011));
  c.lineTo(4000, 2);
  c.closePath();
  c.fill();
  // its ends fade into the sky
  c.globalCompositeOperation = 'destination-out';
  for (const s of [-1, 1]) {
    const end = c.createLinearGradient(s * 2600, 0, s * 4000, 0);
    end.addColorStop(0, 'rgba(0,0,0,0)');
    end.addColorStop(1, 'rgba(0,0,0,1)');
    c.fillStyle = end;
    c.fillRect(Math.min(s * 2600, s * 4000), -90, 1400, 95);
  }
  c.globalCompositeOperation = 'source-over';
});
