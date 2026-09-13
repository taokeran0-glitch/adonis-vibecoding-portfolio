import { useRef, useState } from "react";
import { artworks, photos } from "./content.js";
import { ChapterHeading, NextPage, Lightbox, Modal } from "./Shared.jsx";

export function Overseas() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="overseas" className="edition-section overseas-edition">
      <ChapterHeading
        index={2}
        title="阿联酋交换手记"
        english="Overseas dispatch."
      />
      <div className="dispatch-spread">
        <div className="arabic-poster">
          <span className="mono">ABU DHABI / 2025.08 — 12</span>
          <div lang="ar" dir="rtl" className="arabic-title">
            الإمارات
          </div>
          <h3>
            Same curiosity.
            <br />
            <em>Different horizons.</em>
          </h3>
          <div className="dispatch-note">
            <p>阿布扎比大学 · 国际项目交换生</p>
            <p>
              在当地学习与生活，从语言环境、文化差异和日常习惯中，积累对中东地区的直接体验。
            </p>
          </div>
          <span className="travel-stamp">
            UAE
            <br />
            <small>EXCHANGE NOTES</small>
          </span>
        </div>
        <div className="featured-photos">
          <div className="contact-sheet-heading">
            <span>旅行摄影</span>
            <span className="mono">CONTACT SHEETS / 01—06</span>
          </div>
          {photos.slice(0, 2).map((p, i) => (
            <button
              className="travel-photo"
              key={p.src}
              onClick={() => setSelected(i)}
            >
              <img src={p.src} alt={p.title} loading="lazy" />
              <span>
                0{i + 1} / {p.title}
                <small>{p.place}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="film-strip">
        {photos.slice(2).map((p, i) => (
          <button key={p.src} onClick={() => setSelected(i + 2)}>
            <img src={p.src} alt={p.title} loading="lazy" />
            <span className="mono">
              0{i + 3} / {p.title} +
            </span>
          </button>
        ))}
      </div>
      <p className="fine-print">
        本页照片为个人旅行摄影合集，含土耳其等地作品；阿联酋交换经历与摄影地点分别标注。
      </p>
      <NextPage index={2} />
      {selected !== null && (
        <Lightbox
          items={photos}
          initial={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

function LooseArt({ art, index, mode, page, onOpen }) {
  const ref = useRef(null);
  const drag = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const start = (e) => {
    if (mode !== "scatter" || e.pointerType === "touch") return;
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.current.x,
      oy: offset.current.y,
      moved: false,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const move = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x,
      dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 6) drag.current.moved = true;
    offset.current = {
      x: Math.max(-100, Math.min(100, drag.current.ox + dx)),
      y: Math.max(-100, Math.min(100, drag.current.oy + dy)),
    };
    ref.current.style.setProperty("--drag-x", `${offset.current.x}px`);
    ref.current.style.setProperty("--drag-y", `${offset.current.y}px`);
  };
  return (
    <button
      ref={ref}
      className="loose-art"
      style={{ "--i": index, "--angle": `${[-9, 4, -3, 9][index % 4]}deg` }}
      onPointerDown={start}
      onPointerMove={move}
      onPointerCancel={() => {
        drag.current = null;
      }}
      onPointerUp={() => {
        if (drag.current) drag.current.finished = true;
      }}
      onClick={() => {
        if (!drag.current?.moved) onOpen();
        drag.current = null;
      }}
      aria-label={`查看绘画：${art.title}`}
    >
      <span className="mono">
        {String(page * 4 + index + 1).padStart(2, "0")} / ADONIS
      </span>
      <img src={art.src} alt={art.title} loading="lazy" draggable="false" />
      <span>
        {art.title} <small>点击查看 +</small>
      </span>
    </button>
  );
}
export function Sketchbook() {
  const [mode, setMode] = useState("closed");
  const [page, setPage] = useState(0);
  const [reset, setReset] = useState(0);
  const [selected, setSelected] = useState(null);
  const [cert, setCert] = useState(false);
  return (
    <section id="sketchbook" className="edition-section sketch-edition">
      <ChapterHeading index={3} title="绘画作品" english="Sketchbook." />
      <div className="sketch-meta">
        <button className="certification" onClick={() => setCert(true)}>
          米画师资格认证 ↗
        </button>
        <span className="editor-note">把看到的、想到的，都画下来。</span>
      </div>
      <div className={`sketch-stage sketch-${mode}`}>
        <div className="book-ground">
          <span>
            ADONIS
            <br />
            <em>Private sketchbook</em>
            <small>DRAWINGS / 01—08</small>
          </span>
        </div>
        {mode === "closed" ? (
          <button
            className="book-open-hit"
            onClick={() => setMode("open")}
            aria-label="翻开画册"
          >
            翻开画册 <span>↗</span>
          </button>
        ) : (
          <div className="art-spread">
            {artworks.slice(page * 4, page * 4 + 4).map((art, i) => (
              <LooseArt
                key={`${art.src}-${reset}-${mode}`}
                art={art}
                index={i}
                mode={mode}
                page={page}
                onOpen={() => setSelected(page * 4 + i)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="sketch-controls">
        <button
          className={mode === "open" ? "selected" : ""}
          onClick={() => setMode("open")}
        >
          翻开画册
        </button>
        <button
          className={mode === "scatter" ? "selected" : ""}
          onClick={() => setMode("scatter")}
        >
          让画稿散落 ↗
        </button>
        <button
          onClick={() => {
            setReset((r) => r + 1);
            setMode("open");
          }}
        >
          归位 ↺
        </button>
        <button
          onClick={() => {
            setPage((p) => 1 - p);
            setMode("open");
            setReset((r) => r + 1);
          }}
        >
          翻页 {page + 1} / 2 →
        </button>
        <button onClick={() => setMode("closed")}>合上</button>
      </div>
      <p className="fine-print">
        桌面端散落后可拖动画稿，点击逐张查看；手机端轻点查看，并可用翻页按钮浏览全部作品。
      </p>
      <NextPage index={3} />
      {selected !== null && (
        <Lightbox
          items={artworks}
          initial={selected}
          onClose={() => setSelected(null)}
        />
      )}{" "}
      {cert && (
        <Modal title="米画师" onClose={() => setCert(false)}>
          <h2>米画师资格认证</h2>
          <p>已取得米画师资格认证（本人提供）。以下为个人主页与作品陈列。</p>
          <img
            className="evidence-image"
            src="/assets/evidence/mihuashi-profile.jpg"
            alt="米画师个人主页及作品陈列"
          />
        </Modal>
      )}
    </section>
  );
}
