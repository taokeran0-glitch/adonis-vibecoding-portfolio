import { useState } from "react";
import { SectionMeta } from "./SectionMeta.jsx";

export function ProfileSection({ experience, capabilities }) {
  const [activeCapability, setActiveCapability] = useState(capabilities[0]?.id);
  const current = capabilities.find((item) => item.id === activeCapability) ?? capabilities[0];

  return (
    <section className="profile-section page-section" id="profile">
      <div className="profile-statement">
        <SectionMeta index={1} label="PROFILE / POSITIONING" />
        <h2>A visual creator<br />who thinks like<br />an operator.</h2>
        <p>
          阿联酋的海外学习经历让我理解文化差异；绘画、摄影与剪辑训练让我理解内容；
          出海游戏实习让我把这些能力放进真实的游戏增长、产品与 KOL 运营链路。
        </p>
      </div>

      <div className="experience-list" aria-label="经历路径">
        {experience.map((item, index) => (
          <article className="experience-row" key={item.title}>
            <span className="experience-index">0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="capability-system">
        <div className="capability-heading">
          <SectionMeta index={2} label="CAPABILITY SYSTEM" />
          <h2>能力不是清单，<br />而是一条业务链路。</h2>
        </div>
        <div className="capability-chain" role="tablist" aria-label="能力链路">
          {capabilities.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === activeCapability}
              className={item.id === activeCapability ? "capability-step is-active" : "capability-step"}
              onClick={() => setActiveCapability(item.id)}
            >
              <span>0{index + 1}</span>
              <strong>{item.subtitle}</strong>
            </button>
          ))}
        </div>
        <div className="capability-detail" role="tabpanel">
          <span>{current?.title}</span>
          <p>{current?.description}</p>
        </div>
      </div>
    </section>
  );
}
