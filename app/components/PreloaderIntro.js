"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const SOUNDTRACK_SRC = "/audio/preloader-theme.mp3";

export default function PreloaderIntro() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [beatTick, setBeatTick] = useState(0);
  const [audioSynced, setAudioSynced] = useState(false);
  const [audioEnergy, setAudioEnergy] = useState(0);

  const timeline = useMemo(
    () => [
      { label: "Scene boards", duration: 850 },
      { label: "Material scans", duration: 780 },
      { label: "Color grading", duration: 740 },
      { label: "Soundtrack sync", duration: 910 },
      { label: "Render output", duration: 820 },
    ],
    []
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const introSeen = sessionStorage.getItem("atelier-intro-seen");

    if (prefersReducedMotion || introSeen) {
      return;
    }

    setVisible(true);
    const totalDuration = timeline.reduce((sum, item) => sum + item.duration, 0);
    const startAt = performance.now();
    let rafId = 0;
    let cleanupAudio = () => {};
    let audioElement = null;
    let analyser = null;
    let frequencyData = null;
    let lastPeak = 0;
    const beatInterval = 60000 / 92;

    const setupAudioReactive = async () => {
      try {
        const audioContext = new window.AudioContext();
        audioElement = new Audio(SOUNDTRACK_SRC);
        audioElement.preload = "auto";
        audioElement.loop = false;
        audioElement.muted = true;
        audioElement.setAttribute("playsinline", "true");

        const source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        const gain = audioContext.createGain();
        gain.gain.value = 0;
        source.connect(analyser);
        analyser.connect(gain);
        gain.connect(audioContext.destination);
        frequencyData = new Uint8Array(analyser.frequencyBinCount);

        await audioContext.resume();
        await audioElement.play();
        setAudioSynced(true);

        cleanupAudio = () => {
          audioElement?.pause();
          source.disconnect();
          analyser.disconnect();
          gain.disconnect();
          audioContext.close();
        };
      } catch {
        setAudioSynced(false);
      }
    };

    setupAudioReactive();

    const animate = () => {
      let clamped = Math.min(totalDuration, performance.now() - startAt);

      if (audioElement && Number.isFinite(audioElement.duration) && audioElement.duration > 0) {
        const ratio = Math.min(1, audioElement.currentTime / audioElement.duration);
        clamped = ratio * totalDuration;
      }

      if (analyser && frequencyData) {
        analyser.getByteFrequencyData(frequencyData);
        let average = 0;
        for (let index = 0; index < frequencyData.length; index += 1) {
          average += frequencyData[index];
        }
        average /= frequencyData.length;
        const normalized = average / 255;
        setAudioEnergy(normalized);

        const now = performance.now();
        if (normalized > 0.26 && now - lastPeak > 260) {
          setBeatTick((value) => value + 1);
          lastPeak = now;
        }
      } else {
        const now = performance.now();
        if (now - lastPeak > beatInterval) {
          setBeatTick((value) => value + 1);
          lastPeak = now;
        }
      }

      setProgress(Math.round((clamped / totalDuration) * 100));

      let cursor = 0;
      for (let index = 0; index < timeline.length; index += 1) {
        cursor += timeline[index].duration;
        if (clamped <= cursor) {
          setActiveStep(index);
          break;
        }
      }

      if (clamped >= totalDuration) {
        cleanupAudio();
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("atelier-intro-seen", "1");
        }, 380);
        return;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      cleanupAudio();
    };
  }, [timeline]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-140 bg-black text-white flex flex-col justify-between p-8 md:p-14"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45 } }}
        >
          <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-white/55">
            <span>Luxury by Sam</span>
            <span>Loading</span>
          </div>

          <div className="space-y-6 max-w-3xl">
            <motion.p
              className="text-[10px] uppercase tracking-[0.3em] text-white/55"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              Getting things ready
            </motion.p>
            <motion.h2
              className="text-4xl md:text-7xl font-serif leading-[0.92]"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Loading kitchens, wardrobes and storage inspiration.
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {timeline.map((step, index) => {
                const isActive = index === activeStep;
                const isDone = index < activeStep;
                return (
                  <div
                    key={step.label}
                    className={`border px-3 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors ${
                      isActive
                        ? "border-white text-white"
                        : isDone
                          ? "border-white/35 text-white/75"
                          : "border-white/15 text-white/35"
                    }`}
                  >
                    {step.label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              key={beatTick}
              className="h-[2px] w-full bg-white/30 origin-left"
              animate={{ scaleX: [0.35, 1 + audioEnergy * 0.4, 0.35], opacity: [0.2, 0.85, 0.2] }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            />
            <div className="h-px bg-white/20 overflow-hidden">
              <motion.div
                className="h-full bg-white"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
            </div>
            <div className="flex justify-between text-[10px] uppercase tracking-[0.3em] text-white/55">
              <span>{timeline[activeStep]?.label || "Loading"}</span>
              <span>{String(progress).padStart(2, "0")}%</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
