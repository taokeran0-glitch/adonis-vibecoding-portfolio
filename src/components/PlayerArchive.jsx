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

  return (
    <section className="player-section page-section" id="player">
      <div className="player-index">
        <span className="dark-meta">05 / PLAYER ARCHIVE</span>
        <h2>PLAYER<br />ARCHIVE</h2>
        <p>长期投入，让我理解角色、叙事、系统与情绪体验。</p>
        <div className="game-category-list" role="tablist" aria-label="游戏品类">
          {games.map((category, index) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={category.id === selectedId}
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

      <div className="game-detail" role="tabpanel">
        <div className="game-detail-head">
          <div>
            <span className="dark-meta">SELECTED CATEGORY</span>
            <h3>{selected?.label}</h3>
          </div>
          <span className="game-count">{String(selected?.games?.length ?? 0).padStart(2, "0")} GAMES</span>
        </div>
        <p className="game-insight">{selected?.insight}</p>
        <div className="game-list">
          {selected?.games?.map((game, index) => (
            <span key={game}>{String(index + 1).padStart(2, "0")} / {game}</span>
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
    </section>
  );
}
