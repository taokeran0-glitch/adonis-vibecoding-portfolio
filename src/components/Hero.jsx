import { useRef } from "react";
import { AnimatedMetric } from "./AnimatedMetric.jsx";

export function Hero({ metrics }) {
  const posterRef = useRef(null);
  const heroMetrics = [
    metrics.find((item) => item.id === "total-exposure"),
    metrics.find((item) => item.id === "top-engagement"),
    { value: "9 YEARS", shortLabel: "FGO" },
  ].filter(Boolean);

  return (
    <section className="hero page-section" id="index">
      <div className="hero-copy">
        <div className="archive-meta" data-reveal="fade">ARCHIVE / 2027</div>
        <h1 data-reveal="clip">我在玩家文化、<br />视觉内容与增长之间工作。</h1>
        <p className="hero-line" data-reveal="fade">
          I turn player insight into content, campaigns<br className="desktop-only" /> and measurable growth.
        </p>
        <button
          type="button"
          className="text-action hero-action"
          data-reveal="fade"
          onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}
        >
          ENTER ARCHIVE <span aria-hidden="true">↓</span>
        </button>

        <div className="hero-proof" aria-label="关键成果" data-reveal="fade">
          {heroMetrics.map((metric) => (
            <span key={`${metric.value}-${metric.shortLabel}`}>
              <strong><AnimatedMetric value={metric.value} /></strong> {metric.shortLabel}
            </span>
          ))}
        </div>
      </div>

      <figure
        className="hero-poster"
        ref={posterRef}
        data-reveal="poster"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          posterRef.current?.style.setProperty("--poster-rx", `${y * -3.5}deg`);
          posterRef.current?.style.setProperty("--poster-ry", `${x * 4.5}deg`);
          posterRef.current?.style.setProperty("--poster-x", `${x * 8}px`);
          posterRef.current?.style.setProperty("--poster-y", `${y * 8}px`);
        }}
        onPointerLeave={() => {
          posterRef.current?.style.setProperty("--poster-rx", "0deg");
          posterRef.current?.style.setProperty("--poster-ry", "0deg");
          posterRef.current?.style.setProperty("--poster-x", "0px");
          posterRef.current?.style.setProperty("--poster-y", "0px");
        }}
      >
        <div className="poster-frame">
          <img src="/assets/zine-hero.png" alt="Signals into worlds 纸本档案海报" />
          <span className="poster-crosshair" aria-hidden="true" />
        </div>
        <figcaption>SIGNALS INTO WORLDS / PLAYER FIELD NOTE</figcaption>
      </figure>
    </section>
  );
}
