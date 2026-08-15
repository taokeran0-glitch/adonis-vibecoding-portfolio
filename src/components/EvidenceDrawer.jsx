import { useEffect } from "react";

const evidence = [
  { src: "/assets/evidence/xhs-profile.jpg", alt: "小红书主页数据截图", caption: "小红书主页 / 账号证据" },
  { src: "/assets/evidence/xhs-top-post.jpg", alt: "小红书最高表现内容截图", caption: "最高表现内容 / 2.4W+ 赞藏" },
  { src: "/assets/evidence/mihuashi-profile.jpg", alt: "米画师平台主页截图", caption: "米画师入驻 / 商业化路径" },
];

export function EvidenceDrawer({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("is-locked");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("is-locked");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="evidence-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="evidence-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="evidence-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="drawer-header">
          <div>
            <span className="mono-label">EVIDENCE / REAL SCREENSHOTS</span>
            <h2 id="evidence-title">主张，需要证据。</h2>
          </div>
          <button type="button" className="drawer-close" onClick={onClose}>CLOSE ×</button>
        </div>
        <div className="evidence-grid">
          {evidence.map((item) => (
            <figure key={item.src}>
              <img src={item.src} alt={item.alt} />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
