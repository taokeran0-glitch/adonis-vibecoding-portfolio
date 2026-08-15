import { useMemo, useState } from "react";
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
  const [lightboxItem, setLightboxItem] = useState(null);
  const media = useMemo(() => archiveMedia[activeFilter] ?? [], [activeFilter]);

  return (
    <section className="visual-section page-section" id="visual">
      <div className="visual-heading">
        <SectionMeta index={4} label="VISUAL ARCHIVE" />
        <h2>角色绘画，是我的内容判断力<br />与视觉叙事底层。</h2>
      </div>

      <div className="archive-tabs" role="tablist" aria-label="视觉作品筛选">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={filter.id === activeFilter}
            className={filter.id === activeFilter ? "is-active" : ""}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className={`archive-grid archive-grid--${activeFilter}`} role="tabpanel">
        {media.map((item, index) => (
          <button type="button" className="archive-item" key={item.src} onClick={() => setLightboxItem(item)}>
            <img src={item.src} alt={item.alt} loading="lazy" />
            <span>{String(index + 1).padStart(2, "0")} / VIEW</span>
          </button>
        ))}
      </div>

      {lightboxItem ? (
        <div className="lightbox" role="presentation" onMouseDown={() => setLightboxItem(null)}>
          <button type="button" onClick={() => setLightboxItem(null)}>CLOSE ×</button>
          <img src={lightboxItem.src} alt={lightboxItem.alt} onMouseDown={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </section>
  );
}
