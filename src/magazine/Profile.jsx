import { useState } from "react";
import { ChapterHeading, NextPage, Modal, Arrow } from "./Shared.jsx";
import { jobs, skills, social } from "./content.js";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("经历");
  const [caseOpen, setCaseOpen] = useState(false);
  return (
    <section id="profile" className="edition-section profile-edition">
      <ChapterHeading index={1} title="个人经历" english="The profile files." />
      <div className="profile-spread">
        <div className={`file-folder ${open ? "folder-open" : ""}`}>
          <div className="folder-tabs">
            {["经历", "技能", "简历"].map((t) => (
              <button
                key={t}
                aria-pressed={open && tab === t}
                onClick={() => {
                  setOpen(true);
                  setTab(t);
                }}
              >
                {t}
                <small>
                  {t === "经历"
                    ? "EXPERIENCE"
                    : t === "技能"
                      ? "SKILLS"
                      : "RESUME"}
                </small>
              </button>
            ))}
          </div>
          {!open ? (
            <button className="folder-cover" onClick={() => setOpen(true)}>
              <span className="mono">PERSONNEL FILE / 02</span>
              <strong>
                一些经历，
                <br />
                构成了现在的我。
              </strong>
              <span className="folder-stamp">
                ADONIS
                <br />
                <small>CREATIVE MARKETER</small>
              </span>
              <span className="editor-note">打开档案袋，认识一下 →</span>
            </button>
          ) : (
            <div className="folder-sheet" key={tab}>
              <div className="sheet-header">
                <span className="mono">ADONIS / {tab}</span>
                <button onClick={() => setOpen(false)}>收起 −</button>
              </div>
              {tab === "经历" ? (
                <>
                  <h3>从观察到行动。</h3>
                  {jobs.map((job) => (
                    <details key={job.company} className="job">
                      <summary>
                        <small className="mono">{job.date}</small>
                        <strong>{job.role}</strong>
                        <span>{job.company}</span>
                      </summary>
                      <p>{job.body}</p>
                      <ul>
                        {job.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </details>
                  ))}
                  <div className="education">
                    <span className="mono">2023.09 — 2027.06</span>
                    <h4>对外经济贸易大学</h4>
                    <p>国际经济与贸易 — 阿拉伯语双学士</p>
                    <a href="#overseas">
                      阿布扎比大学交换经历 <Arrow />
                    </a>
                  </div>
                </>
              ) : tab === "技能" ? (
                <>
                  <h3>我的工具箱。</h3>
                  <div className="skill-slips">
                    {skills.map(([title, body], i) => (
                      <article key={title}>
                        <span className="mono">0{i + 1}</span>
                        <h4>{title}</h4>
                        <p>{body}</p>
                      </article>
                    ))}
                  </div>
                  <p className="editor-note">
                    好奇心，是工具箱里最常用的那个。
                  </p>
                </>
              ) : (
                <>
                  <h3>陶珂冉 / ADONIS</h3>
                  <p>热爱创造，富有想象力的营销人。</p>
                  <p>
                    完整简历包含教育背景、海外游戏与 AI
                    产品运营实习，以及专业技能。
                  </p>
                  <a
                    className="edition-button primary"
                    href="/downloads/resume-game-ops.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    阅读完整简历 <Arrow />
                  </a>
                  <a
                    className="text-link"
                    href="/downloads/resume-game-ops.pdf"
                    download
                  >
                    下载 PDF ↓
                  </a>
                  <p className="fine-print">
                    账号数据以本网站运营卡片的本次提供数据为准；简历 PDF
                    保留原始版本。
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <button className="case-clipping" onClick={() => setCaseOpen(true)}>
          <div className="clipping-top mono">
            CREATOR ECONOMY <span>CASE / 01</span>
          </div>
          <h3>
            我为什么决定
            <br />
            不再给身边的人
            <br />
            <em>画无偿</em>
          </h3>
          <p className="case-subtitle">将个人创作议题转化为 10 万+ 浏览内容</p>
          <div className="clipping-story">
            <p>
              绘画垂类账号
              <br />
              独立负责全流程运营
              <br />
              <span className="editor-note">
                让作品被看见，
                <br />
                也让创作被理解。
              </span>
            </p>
            <img
              src="/assets/illustrations/art-04.jpg"
              alt="绘画账号作品"
              loading="lazy"
            />
          </div>
          <div className="case-metrics">
            {[
              ["2,760", "粉丝"],
              ["34.9K", "累计赞藏"],
              ["100,403", "单篇浏览"],
              ["6", "个月运营"],
            ].map(([value, label]) => (
              <span key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
          <span className="clipping-open">
            展开这份运营剪报 <Arrow />
          </span>
        </button>
      </div>
      <NextPage index={1} />
      {caseOpen && (
        <Modal title="运营剪报" onClose={() => setCaseOpen(false)}>
          <h2>我为什么决定不再给身边的人画无偿</h2>
          <p className="case-subtitle">将个人创作议题转化为 10 万+ 浏览内容</p>
          <div className="case-detail">
            <img
              src="/assets/evidence/xhs-top-post.jpg"
              alt="代表笔记截图：100403 浏览，约 2.4 万点赞"
            />
            <div>
              <span className="mono">INDEPENDENT OPERATION / 6 MONTHS</span>
              <h3>用绘画表达，也用内容连接。</h3>
              <p>
                独立负责绘画垂类账号的全流程运营，将个人创作与内容表达相结合。
              </p>
              <dl>
                <dt>账号规模</dt>
                <dd>2,760 粉丝 · 34.9K 累计赞与收藏</dd>
                <dt>代表笔记</dt>
                <dd>100,403 浏览 · 约 2.4 万点赞（截图显示值）</dd>
                <dt>选题观察</dt>
                <dd>
                  从标题出发：创作劳动与人际边界，是这个选题的讨论入口。个人立场让内容有了清晰的表达。
                </dd>
              </dl>
              <a
                className="edition-button primary"
                href={social}
                target="_blank"
                rel="noreferrer"
              >
                访问小红书主页 ↗
              </a>
              <p className="fine-print">
                数据为阶段性记录：2,760 粉丝、34.9K 累计赞藏。历史截图与现阶段数据存在时间差。
              </p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
