import { useEffect, useState } from "react";

export function SiteHeader({ navItems, activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

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
            onClick={() => goTo(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
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
