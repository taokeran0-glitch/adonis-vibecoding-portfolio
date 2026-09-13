import { useEffect, useRef, useState } from "react";
import { chapters } from "./content.js";

export function Arrow() {
  return (
    <svg viewBox="0 0 48 24" fill="none" aria-hidden="true">
      <path
        d="M2 12h42M34 2l10 10-10 10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
export function NextPage({ index }) {
  const next = chapters[index + 1];
  return (
    <div className="edition-bottom">
      <span className="mono">
        0{index + 1} / {chapters[index].en}
      </span>
      <span className="editor-note">
        {next ? next.note : "下一次灵感，也许从一次交谈开始。"}
      </span>
      <a href={next ? `#${next.id}` : "#contact"}>
        {next ? `0${index + 2} ${next.title}` : "联系我"} <Arrow />
      </a>
    </div>
  );
}
export function ChapterHeading({ index, title, english }) {
  return (
    <header className="chapter-heading">
      <span className="chapter-number">0{index + 1}</span>
      <h2>{title}</h2>
      <span className="chapter-english">{english}</span>
    </header>
  );
}
export function Modal({ title, children, onClose, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const focused = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = old;
      focused?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      className={`edition-modal ${className}`}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="modal-paper">
        <header>
          <span className="mono">ADONIS / {title}</span>
          <button autoFocus onClick={onClose} aria-label="关闭详情">
            关闭 ×
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
export function Lightbox({ items, initial, onClose }) {
  const [index, setIndex] = useState(initial);
  const [back, setBack] = useState(false);
  const item = items[index];
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      setBack(false);
      setIndex(i => (i + (event.key === "ArrowRight" ? 1 : -1) + items.length) % items.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [items.length]);
  const move = (delta) => {
    setBack(false);
    setIndex((i) => (i + delta + items.length) % items.length);
  };
  return (
    <Modal
      title={`${index + 1} / ${items.length}`}
      onClose={onClose}
      className="image-modal"
    >
      <div>
        <div className={`lightbox-picture ${back ? "is-back" : ""}`}>
          {back ? (
            <div className="photo-back">
              <span className="mono">FIELD NOTES</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="editor-note">{item.place}</span>
            </div>
          ) : (
            <img src={item.src} alt={item.title} />
          )}
        </div>
        <div className="lightbox-controls">
          <button onClick={() => move(-1)} aria-label="上一张">
            ← 上一张
          </button>
          <button onClick={() => setBack(!back)}>
            {back ? "看正面" : "翻到背面"}
          </button>
          <button onClick={() => move(1)} aria-label="下一张">
            下一张 →
          </button>
        </div>
        <p className="image-caption">
          {item.title} <span className="mono">{item.place}</span>
        </p>
      </div>
    </Modal>
  );
}
