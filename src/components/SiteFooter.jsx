export function SiteFooter() {
  return (
    <footer className="site-footer page-section" id="about">
      <div className="footer-poster" data-reveal="poster">
        <img src="/assets/posters/game-long-stay.png" alt="Stay zine poster" loading="lazy" />
      </div>
      <div className="footer-copy" data-reveal="fade">
        <span className="dark-meta">PORTFOLIO / END NOTE / 2027</span>
        <h2>Let’s build a world<br />players want to stay in.</h2>
        <p>用玩家洞察、视觉内容与数据实验，帮助游戏在海外被看见、被理解、被留下。</p>
        <div className="footer-actions">
          <a href="/downloads/portfolio.pdf" download>DOWNLOAD PORTFOLIO PDF ↓</a>
          <a href="/downloads/resume-game-ops.pdf" download>DOWNLOAD RESUME ↓</a>
        </div>
      </div>
      <div className="footer-bottom">
        <strong>ADONIS</strong>
        <span>GLOBAL GAME GROWTH / CONTENT OPERATIONS / VISUAL STORY</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK TO TOP ↑</button>
      </div>
    </footer>
  );
}
