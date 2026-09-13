import { useEffect, useMemo, useRef, useState } from "react";

export function SiteHeader({ navItems, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef(null);
  const activeIndex = useMemo(
    () => Math.max(0, navItems.findIndex((item) => item.id === activeSection)),
    [activeSection, navItems],
  );

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${progress})`);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => goTo("index")}>
        ADONIS
      </button>

      <nav className={menuOpen ? "site-nav site-nav--open" : "site-nav"} aria-label="主导航">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeSection === item.id ? "nav-link is-active" : "nav-link"}
            aria-current={activeSection === item.id ? "page" : undefined}
            onClick={() => goTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-status" aria-hidden="true">
        <div className="header-progress">
          <span ref={progressRef} />
        </div>
        <span className="header-count">{String(activeIndex + 1).padStart(2, "0")} / {String(navItems.length).padStart(2, "0")}</span>
      </div>

      <button
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? "关闭导航" : "打开导航"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? "CLOSE" : "MENU"}
      </button>
    </header>
  );
}
