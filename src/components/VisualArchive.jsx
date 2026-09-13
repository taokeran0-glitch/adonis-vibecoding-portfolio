import { useEffect, useMemo, useRef, useState } from "react";
import { SectionMeta } from "./SectionMeta.jsx";

const archiveMedia = {
  illustration: Array.from({ length: 8 }, (_, index) => ({
    src: `/assets/illustrations/art-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `角色绘画作品 ${index + 1}`,
  })),
  photography: Array.from({ length: 6 }, (_, index) => ({
    src: `/assets/photos/photo-${String(index + 1).padStart(2, "0")}.jpg`,
    alt: `摄影作品 ${index + 1}`,
  })),
  editing: [
    { src: "/assets/posters/drawing-practice.png", alt: "绘画实践 zine 海报" },
    { src: "/assets/posters/game-long-stay.png", alt: "长期玩家记忆 zine 海报" },
    { src: "/assets/posters/game-system-range.png", alt: "游戏系统体验 zine 海报" },
  ],
};

export function VisualArchive({ filters }) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.id ?? "illustration");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const media = useMemo(() => archiveMedia[activeFilter] ?? [], [activeFilter]);
  const lightboxItem = lightboxIndex === null ? null : media[lightboxIndex];

  useEffect(() => {
    if (!lightboxItem) return undefined;
    const previouslyFocused = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => (current + 1) % media.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => (current - 1 + media.length) % media.length);
    };

    document.body.classList.add("is-locked");
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [lightboxItem, media.length]);

  const selectFilter = (id) => {
    setActiveFilter(id);
    setLightboxIndex(null);
  };

  const onTabKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = filters.findIndex((filter) => filter.id === activeFilter);
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + direction + filters.length) % filters.length;
    selectFilter(filters[nextIndex].id);
    event.currentTarget.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <section className="visual-section page-section" id="visual">
      <div className="visual-heading" data-reveal="fade">
        <SectionMeta index={4} label="VISUAL ARCHIVE" />
        <h2>角色绘画，是我的内容判断力<br />与视觉叙事底层。</h2>
      </div>

      <div className="archive-tabs" role="tablist" aria-label="视觉作品筛选" data-reveal="row" onKeyDown={onTabKeyDown}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={filter.id === activeFilter}
            aria-controls="visual-archive-panel"
            tabIndex={filter.id === activeFilter ? 0 : -1}
            className={filter.id === activeFilter ? "is-active" : ""}
            onClick={() => selectFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div
        className={`archive-grid archive-grid--${activeFilter}`}
        role="tabpanel"
        id="visual-archive-panel"
        key={activeFilter}
        data-reveal="fade"
      >
        {media.map((item, index) => (
          <button
            type="button"
            className="archive-item"
            key={item.src}
            style={{ "--item-index": index }}
            onClick={() => setLightboxIndex(index)}
            aria-label={`打开 ${item.alt}`}
          >
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")} / VIEW</span>
          </button>
        ))}
      </div>

      {lightboxItem ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="作品预览" onMouseDown={() => setLightboxIndex(null)}>
          <button ref={closeButtonRef} type="button" className="lightbox-close" onClick={() => setLightboxIndex(null)}>CLOSE ×</button>
          <button
            type="button"
            className="lightbox-nav lightbox-nav--prev"
            aria-label="上一张"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => setLightboxIndex((current) => (current - 1 + media.length) % media.length)}
          >
            ←
          </button>
          <figure key={lightboxItem.src} onMouseDown={(event) => event.stopPropagation()}>
            <img src={lightboxItem.src} alt={lightboxItem.alt} />
            <figcaption>{String(lightboxIndex + 1).padStart(2, "0")} / {String(media.length).padStart(2, "0")} — {lightboxItem.alt}</figcaption>
          </figure>
          <button
            type="button"
            className="lightbox-nav lightbox-nav--next"
            aria-label="下一张"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => setLightboxIndex((current) => (current + 1) % media.length)}
          >
            →
          </button>
        </div>
      ) : null}
    </section>
  );
}
