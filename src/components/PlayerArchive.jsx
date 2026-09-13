import { useMemo, useState } from "react";

const systemCategoryIds = new Set([
  "action",
  "fighting",
  "open-world",
  "survival-crafting",
  "simulation-management",
  "strategy-4x",
  "co-op-party",
]);

export function PlayerArchive({ games }) {
  const [selectedId, setSelectedId] = useState(games[0]?.id);
  const selected = useMemo(
    () => games.find((category) => category.id === selectedId) ?? games[0],
    [games, selectedId],
  );
  const selectedIndex = games.findIndex((category) => category.id === selectedId);

  const onCategoryKeyDown = (event) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1;
    const nextIndex = (selectedIndex + direction + games.length) % games.length;
    setSelectedId(games[nextIndex].id);
    event.currentTarget.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
  };

  return (
    <section className="player-section page-section" id="player">
      <div className="player-index" data-reveal="fade">
        <span className="dark-meta">05 / PLAYER ARCHIVE</span>
        <h2>PLAYER<br />ARCHIVE</h2>
        <p>长期投入，让我理解角色、叙事、系统与情绪体验。</p>
        <div className="game-category-list" role="tablist" aria-label="游戏品类" onKeyDown={onCategoryKeyDown}>
          {games.map((category, index) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={category.id === selectedId}
              aria-controls="player-category-panel"
              tabIndex={category.id === selectedId ? 0 : -1}
              className={category.id === selectedId ? "is-active" : ""}
              onClick={() => setSelectedId(category.id)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{category.label}</strong>
              <span aria-hidden="true">{category.id === selectedId ? "→" : "·"}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="game-detail" role="tabpanel" id="player-category-panel" data-reveal="fade">
        <div className="game-detail-transition" key={selected?.id}>
        <div className="game-detail-head">
          <div>
            <span className="dark-meta">SELECTED CATEGORY</span>
            <h3>{selected?.label}</h3>
          </div>
          <span className="game-count">{String(selectedIndex + 1).padStart(2, "0")} / {String(games.length).padStart(2, "0")} · {String(selected?.games?.length ?? 0).padStart(2, "0")} GAMES</span>
        </div>
        <p className="game-insight">{selected?.insight}</p>
        <div className="game-list">
          {selected?.games?.map((game, index) => (
            <span key={game} style={{ "--item-index": index }}>{String(index + 1).padStart(2, "0")} / {game}</span>
          ))}
        </div>
        <figure className="game-poster">
          <img
            src={systemCategoryIds.has(selected?.id) ? "/assets/posters/game-system-range.png" : "/assets/posters/game-long-stay.png"}
            alt="游戏经历 zine 海报"
            loading="lazy"
          />
        </figure>
        </div>
      </div>
    </section>
  );
}
