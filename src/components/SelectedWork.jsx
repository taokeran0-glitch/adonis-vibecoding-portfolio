import { useState } from "react";
import { SectionMeta } from "./SectionMeta.jsx";
import { EvidenceDrawer } from "./EvidenceDrawer.jsx";
import { AnimatedMetric } from "./AnimatedMetric.jsx";

export function SelectedWork({ metrics }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section className="work-section page-section" id="work">
      <SectionMeta index={3} label="CONTENT GROWTH / 2025.01—07" />
      <div className="work-heading-row" data-reveal="fade">
        <div>
          <h2>SELECTED WORK</h2>
          <h3>小红书个人账号运营 /<br />绘画类内容增长与商业化</h3>
          <p className="formula-line">社会痛点共鸣 <b>＋</b> 反差叙事</p>
        </div>
        <button type="button" className="text-action" onClick={() => setDrawerOpen(true)}>
          VIEW EVIDENCE →
        </button>
      </div>

      <div className="metric-rail" data-reveal="row">
        {metrics.map((metric) => (
          <button type="button" key={metric.value + metric.label} onClick={() => setDrawerOpen(true)}>
            <strong className={metric.tone === "red" ? "metric-red" : ""}><AnimatedMetric value={metric.value} /></strong>
            <span>{metric.label}</span>
          </button>
        ))}
      </div>

      <div className="case-evidence" data-reveal="fade">
        <figure className="evidence-main">
          <img src="/assets/evidence/xhs-profile.jpg" alt="小红书账号主页数据" loading="lazy" />
          <figcaption>主页数据 / 真实账号截图</figcaption>
        </figure>
        <figure className="evidence-post">
          <img src="/assets/evidence/xhs-top-post.jpg" alt="最高表现内容" loading="lazy" />
          <figcaption>最高表现内容 / 2.4W+ 赞藏</figcaption>
        </figure>
        <figure className="evidence-platform">
          <img src="/assets/evidence/mihuashi-profile.jpg" alt="米画师主页" loading="lazy" />
          <figcaption>从内容增长进入商业化平台</figcaption>
        </figure>
      </div>

      <div className="case-method" data-reveal="row">
        <div><span>01</span><strong>定位</strong><p>从 0 到 1 建立个人 IP 与内容边界。</p></div>
        <div><span>02</span><strong>公式</strong><p>用社会痛点与反差叙事提高共鸣。</p></div>
        <div><span>03</span><strong>验证</strong><p>以真实浏览、互动与粉丝沉淀检验判断。</p></div>
        <div><span>04</span><strong>转化</strong><p>通过增值服务与平台入驻探索商业化。</p></div>
      </div>

      <EvidenceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </section>
  );
}
