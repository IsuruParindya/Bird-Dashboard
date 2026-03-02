import { useState, useRef, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Camera, StopCircle, Play, Volume2, Maximize } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

type LangMode = "english" | "sinhala" | "both";

export default function LiveDetection() {
  const { language } = useLanguage() as { language: LangMode };

  const [isScanning, setIsScanning] = useState(false);
  const [detected, setDetected] = useState(false);
  const [threshold, setThreshold] = useState(70);
  const videoRef = useRef<HTMLDivElement>(null);

  // --- Copy (localized) ---
  const t = {
    english: {
      title: "Live Detection",
      subtitle: "Real-time species recognition using your camera.",
      thresholdLabel: "Confidence Threshold",
      paused: "Camera paused. Click Start to begin scanning.",
      start: "Start Scan",
      stop: "Stop Scan",
      detectedMatch: "Detected Match",
      confidence: "Confidence",
      audio: "Audio",
      boxLabel: "Indian Peafowl",
    },
    sinhala: {
      title: "සජීවී හඳුනාගැනීම",
      subtitle: "ඔබගේ කැමරාව භාවිතයෙන් සජීවී පක්ෂි හඳුනාගැනීම.",
      thresholdLabel: "විශ්වාස සීමාව",
      paused: "කැමරාව නවතා ඇත. සෙවීම ආරම්භ කිරීමට Start ක්ලික් කරන්න.",
      start: "සෙවීම අරඹන්න",
      stop: "සෙවීම නවත්වන්න",
      detectedMatch: "හඳුනාගත් ගැළපීම",
      confidence: "විශ්වාසය",
      audio: "ශබ්දය",
      boxLabel: "මොණරා",
    },
    both: {
      title: "Live Detection / සජීවී හඳුනාගැනීම",
      subtitle: "Real-time recognition with bilingual output (EN/SI).",
      thresholdLabel: "Confidence Threshold / විශ්වාස සීමාව",
      paused: "Camera paused. Click Start to begin scanning. / කැමරාව නවතා ඇත.",
      start: "Start Scan",
      stop: "Stop Scan",
      detectedMatch: "Detected Match",
      confidence: "Confidence",
      audio: "Audio",
      boxLabel: "Indian Peafowl",
    },
  }[language];

  // --- Simulate detection after starting scan ---
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (isScanning) {
      setDetected(false);
      timer = setTimeout(() => setDetected(true), 3000);
    } else {
      setDetected(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isScanning]);

  const toggleScan = () => setIsScanning((v) => !v);

  const playAudio = () => {
    // Mock audio play
    const audio = new Audio(
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"
    );
    audio.play().catch((e) => console.log("Audio play simulated", e));
  };

  // --- Mock detection data (replace with real-time backend later) ---
  const detectedBird = {
    englishName: "Indian Peafowl",
    sinhalaName: "මොණරා",
    confidence: 98.4,
  };

  const displayMainName =
    language === "sinhala" ? detectedBird.sinhalaName : detectedBird.englishName;

  const showSecondaryName = language === "both";
  const secondaryName = language === "both" ? detectedBird.sinhalaName : "";

  const boxTitle =
    language === "sinhala"
      ? `${detectedBird.sinhalaName} (${Math.round(detectedBird.confidence)}%)`
      : `${detectedBird.englishName} (${Math.round(detectedBird.confidence)}%)`;

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)] gap-6">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-display font-bold text-foreground">
              {t.title}
            </h1>
            <p className="text-muted-foreground mt-2">{t.subtitle}</p>
          </div>

          <div className="glass-card px-6 py-3 rounded-xl flex items-center gap-4">
            <span className="text-sm font-medium">
              {t.thresholdLabel}: {threshold}%
            </span>
            <input
              type="range"
              min="50"
              max="99"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-32 accent-accent"
            />
          </div>
        </div>

        <div
          className="relative flex-1 rounded-[32px] overflow-hidden bg-black shadow-2xl border-4 border-border/10 flex items-center justify-center group"
          ref={videoRef}
        >
          {/* Simulated camera feed */}
          <img
            src="https://images.unsplash.com/photo-1455582916367-25f75bfc6710?w=1920&h=1080&fit=crop"
            alt="Camera Feed"
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              isScanning ? "opacity-80" : "opacity-40 grayscale"
            }`}
          />

          {isScanning && <div className="animate-scan" />}

          {!isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 text-center px-6">
              <Camera className="w-16 h-16 mb-4 opacity-50" />
              <p className="text-lg font-medium tracking-wide">{t.paused}</p>
            </div>
          )}

          {/* Bounding Box overlay */}
          <AnimatePresence>
            {detected && isScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute glowing-box rounded-xl z-20 pointer-events-none"
                style={{ top: "30%", left: "40%", width: "25%", height: "40%" }}
              >
                <div className="absolute -top-8 -left-0.5 bg-accent text-white px-3 py-1 rounded-t-lg rounded-br-lg text-sm font-bold shadow-lg">
                  {boxTitle}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls overlay */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
            <button
              onClick={toggleScan}
              className={`
                flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300
                ${
                  isScanning
                    ? "bg-red-500/90 text-white hover:bg-red-500 backdrop-blur-md hover:shadow-red-500/25"
                    : "bg-primary/90 text-white hover:bg-primary backdrop-blur-md hover:shadow-primary/25 hover:-translate-y-1"
                }
              `}
            >
              {isScanning ? (
                <>
                  <StopCircle className="w-6 h-6" /> {t.stop}
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" /> {t.start}
                </>
              )}
            </button>

            <button className="p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/20">
              <Maximize className="w-6 h-6" />
            </button>
          </div>

          {/* Floating Info Card */}
          <AnimatePresence>
            {detected && isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20, x: 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: 20, x: 20 }}
                className="absolute bottom-8 right-8 glass-card rounded-[24px] p-4 w-80 shadow-2xl border border-white/40 z-30"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shadow-md flex-shrink-0">
                    <img
                      src="https://pixabay.com/get/gc9a7755f0d5116f21672a01b1d717a1eb5e5ef3546d95807a81ec502176b20e6790ceca488c18f8ef3a38f94eae86da09d7cfcff3efe9b75b0adf85310aa0013_1280.jpg"
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-center flex-1">
                    <p className="text-accent font-bold text-sm tracking-wider uppercase mb-1">
                      {t.detectedMatch}
                    </p>

                    <h3 className="text-xl font-bold text-foreground leading-tight">
                      {displayMainName}
                    </h3>

                    {showSecondaryName && (
                      <h4 className="text-2xl font-display font-semibold text-primary mt-1">
                        {secondaryName}
                      </h4>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                      {t.confidence}
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {detectedBird.confidence.toFixed(1)}%
                    </span>
                  </div>

                  <button
                    onClick={playAudio}
                    className="flex items-center gap-2 bg-accent/10 hover:bg-accent hover:text-white text-accent px-4 py-2 rounded-xl font-semibold transition-colors duration-300"
                  >
                    <Volume2 className="w-5 h-5" /> {t.audio}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppLayout>
  );
}