import { useEffect, useRef, useState } from "react";
import { gameCategories } from "../data/portfolioData.js";
import { ChapterHeading, NextPage } from "./Shared.jsx";

export default function Records() {
  const [track, setTrack] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [sound, setSound] = useState(false);
  const [soundPreference, setSoundPreference] = useState(() => {
    try { return localStorage.getItem("adonis-sound-v2") || "off"; } catch { return "off"; }
  });
  const [audioError, setAudioError] = useState("");
  const [inView, setInView] = useState(false);
  const stage = useRef(null);
  const engine = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) engine.current?.context.suspend();
      else if (sound && spinning && inView) engine.current?.context.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [sound, spinning, inView]);
  useEffect(() => {
    const a = engine.current;
    if (!a) return;
    if (sound && spinning && inView && !document.hidden)
      a.context.resume().catch(() => {});
    else a.context.suspend().catch(() => {});
  }, [sound, spinning, inView]);
  useEffect(
    () => () => {
      engine.current?.context.close();
    },
    [],
  );
  const toggleSound = async () => {
    if (sound) {
      setSound(false);
      setSoundPreference("off");
      try {
        localStorage.setItem("adonis-sound-v2", "off");
      } catch {}
      return;
    }
    try {
      if (!engine.current) {
        const Audio = window.AudioContext || window.webkitAudioContext;
        const context = new Audio();
        const buffer = context.createBuffer(
          1,
          context.sampleRate * 3,
          context.sampleRate,
        );
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++)
          data[i] = (Math.random() * 2 - 1) * 0.07;
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        const filter = context.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 900;
        const gain = context.createGain();
        gain.gain.value = 0.15;
        source.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);
        source.start();
        engine.current = { context, gain };
      }
      await engine.current.context.resume();
      setSound(true);
      setSoundPreference("on");
      setSpinning(true);
      setAudioError("");
      try {
        localStorage.setItem("adonis-sound-v2", "on");
      } catch {}
    } catch {
      setAudioError("此浏览器暂时无法播放声音，唱片仍可正常浏览。");
    }
  };
  const choose = (i) => {
    setTrack(i);
    setSpinning(true);
    if (!sound && soundPreference === "on") void toggleSound();
  };
  const toggleRotation = () => {
    if (!spinning && !sound && soundPreference === "on") void toggleSound();
    setSpinning(s => !s);
  };
  const current = gameCategories[track];
  return (
    <section
      ref={stage}
      id="records"
      className="edition-section record-edition"
    >
      <ChapterHeading index={4} title="游戏经历" english="Player archive." />
      <div className="record-spread">
        <div className="turntable">
          <span className="mono record-side">
            SIDE {String(track + 1).padStart(2, "0")} / PLAYER MEMORIES
          </span>
          <div className={`record ${spinning && inView ? "is-spinning" : ""}`}>
            <div className="record-label">
              <strong>ADONIS</strong>
              <span>{current.label.split(" / ")[0]}</span>
              <small>STORIES KEEP US CURIOUS.</small>
              <i />
            </div>
          </div>
          <button
            className={`tonearm ${spinning ? "on-record" : ""}`}
            onClick={toggleRotation}
            aria-label={spinning ? "抬起唱针，暂停旋转" : "落下唱针，旋转唱片"}
          >
            <span />
            <i />
          </button>
          <span className="editor-note record-note">
            同一张唱片，
            <br />
            也能听见不同的世界。
          </span>
        </div>
        <div className="record-content">
          <div className="track-list" aria-label="游戏分类">
            {gameCategories.map((category, i) => (
              <button
                key={category.id}
                aria-pressed={i === track}
                className={i === track ? "active" : ""}
                onClick={() => choose(i)}
              >
                <span className="track-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{category.label}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
          <div className="track-detail" key={current.id} aria-live="polite">
            <span className="mono">
              NOW EXPLORING / {String(track + 1).padStart(2, "0")}
            </span>
            <h3>{current.label.split(" / ")[0]}</h3>
            <p>{current.insight}</p>
            <div className="game-titles">
              {current.games.map((game) => (
                <span key={game}>{game}</span>
              ))}
            </div>
          </div>
          <div className="record-controls">
            <button
              className="edition-button primary"
              aria-pressed={spinning}
              onClick={toggleRotation}
            >
              {spinning ? "暂停旋转 Ⅱ" : "旋转唱片 ↻"}
            </button>
            <button
              className="edition-button"
              aria-pressed={sound}
              onClick={toggleSound}
            >
              {sound ? "SOUND OFF" : "SOUND ON"}
            </button>
          </div>
          <p className="fine-print">
            声音为轻微黑胶底噪，需主动开启；离开此场景即暂停。{audioError}
          </p>
        </div>
      </div>
      <NextPage index={4} />
    </section>
  );
}
