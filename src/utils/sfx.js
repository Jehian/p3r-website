// Zero-latency Sound Effect Utility with Auto-Unlock Support

const audioCache = {};

export const playSfx = (name) => {
  try {
    let audio = audioCache[name];
    if (!audio) {
      audio = new Audio(`/sfx/${name}.wav`);
      audio.volume = 0.5;
      audioCache[name] = audio;
    } else {
      audio.currentTime = 0;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: create fresh element if current element is locked or busy
        const freshAudio = new Audio(`/sfx/${name}.wav`);
        freshAudio.volume = 0.5;
        freshAudio.play().catch(() => {});
      });
    }
  } catch (err) {
    // Ignore audio play errors
  }
};

// Global Browser Autoplay Unlocker
if (typeof window !== "undefined") {
  const unlockAudio = () => {
    try {
      const silentAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
      silentAudio.play().then(() => {
        silentAudio.pause();
      }).catch(() => {});
    } catch (e) {}

    const events = ["pointerdown", "mousemove", "keydown", "click", "touchstart", "mouseover"];
    events.forEach(evt => window.removeEventListener(evt, unlockAudio));
  };

  const events = ["pointerdown", "mousemove", "keydown", "click", "touchstart", "mouseover"];
  events.forEach(evt => window.addEventListener(evt, unlockAudio, { passive: true }));
}
