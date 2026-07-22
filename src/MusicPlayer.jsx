import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./MusicPlayer.css";

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const events = ["click", "keydown", "pointerdown", "mousemove", "touchstart", "mouseover"];

    const tryPlayBgm = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsPlaying(true);
          removeListeners();
        }).catch(() => {});
      }
    };

    const removeListeners = () => {
      events.forEach(evt => window.removeEventListener(evt, tryPlayBgm));
    };

    // Attempt autoplay immediately
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Autoplay blocked by browser policy; wait for first interaction
      setIsPlaying(false);
      events.forEach(evt => window.addEventListener(evt, tryPlayBgm, { passive: true }));
    });

    const handleKeyDown = (e) => {
      if (e.key === "m" || e.key === "M") {
        if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      removeListeners();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isMuted) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      setIsMuted(false);
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="p3-music-container">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {src ? (
          <source src={src} />
        ) : (
          <>
            <source src="/bgm.flac" type="audio/flac" />
            <source src="/bgm.mp3" type="audio/mpeg" />
            <source src="/bgm.ogg" type="audio/ogg" />
            <source src="/bgm.wav" type="audio/wav" />
          </>
        )}
      </audio>

      {/* Render UI Widget ONLY on the main home page (/) */}
      {isHomePage && (
        <div className={`p3-p3-bar ${isMuted ? "muted" : "playing"}`} onClick={toggleMute}>
          {/* Left skewed section with dynamic Sun (playing) / Moon (muted) icon */}
          <div className="p3-bar-left-icon">
            {!isMuted && isPlaying ? (
              <svg className="p3-icon-sun" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="p3-icon-moon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </div>

          {/* Center / Right main content with carousel scrolling title marquee */}
          <div className="p3-bar-main">
            <div className="p3-bar-title-wrap">
              <div className="p3-bar-title-scroll">
                <em>It's Going Down Now</em>
                <span className="p3-title-gap">★</span>
                <em>It's Going Down Now</em>
                <span className="p3-title-gap">★</span>
              </div>
            </div>

            <div className="p3-bar-sub">
              <span className="p3-pill-badge">BGM</span>
              <span className="p3-sub-text">{isMuted ? "MUTED [M]" : isPlaying ? "PLAYING [M]" : "PAUSED [M]"}</span>
            </div>
          </div>

          {/* Equalizer sound bars */}
          <div className="p3-bar-controls" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            <div className="p3-music-bars">
              <span className={`bar ${isPlaying && !isMuted ? "animating" : ""}`}></span>
              <span className={`bar ${isPlaying && !isMuted ? "animating" : ""}`}></span>
              <span className={`bar ${isPlaying && !isMuted ? "animating" : ""}`}></span>
              <span className={`bar ${isPlaying && !isMuted ? "animating" : ""}`}></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
