const rub = e.state.paws_rub ?? 0;
e.kit.closeups.live(e, 'paws', { frost: Math.max(0, Math.min(1, (e.state.frost_boat ?? 0) / 0.8)), rub, thaw: rub });
