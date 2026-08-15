export function Hero({ metrics }) {
  const heroMetrics = [
    metrics.find((item) => item.id === "total-exposure"),
    metrics.find((item) => item.id === "top-engagement"),
    { value: "9 YEARS", shortLabel: "FGO" },
  ].filter(Boolean);

  return (
    <section className="hero page-section" id="index">
      <div className="hero-copy">
        <div className="archive-meta">ARCHIVE / 2027</div>
        <h1>我在玩家文化、<br />视觉内容与增长之间工作。</h1>
        <p className="hero-line">
          I turn player insight into content, campaigns<br className="desktop-only" /> and measurable growth.
        </p>
        <button
          type="button"
          className="text-action hero-action"
          onClick={() => document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" })}
        >
          ENTER ARCHIVE <span aria-hidden="true">↓</span>
        </button>

        <div className="hero-proof" aria-label="关键成果">
          {heroMetrics.map((metric) => (
            <span key={`${metric.value}-${metric.shortLabel}`}>
              <strong>{metric.value}</strong> {metric.shortLabel}
            </span>
          ))}
        </div>
      </div>

      <figure className="hero-poster">
        <img src="/assets/zine-hero.png" alt="Signals into worlds 纸本档案海报" />
        <figcaption>SIGNALS INTO WORLDS / PLAYER FIELD NOTE</figcaption>
      </figure>
    </section>
  );
}
