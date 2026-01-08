let audioCtx: AudioContext | null = null;

export async function initializeAudio(): Promise<void> {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  
  if (audioCtx.state === "suspended") {
    await audioCtx.resume();
  }
}

export async function playBeep({
  frequency = 880,
  duration = 300,
  volume = 0.3,
}: {
  frequency?: number;
  duration?: number;
  volume?: number;
}) {
  try {
    if (!audioCtx) {
      console.warn("AudioContext not initialized. Please interact with the page first.");
      return;
    }

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gainNode.gain.value = volume;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration / 1000);
  } catch (error) {
    console.error("Failed to play beep:", error);
  }
}