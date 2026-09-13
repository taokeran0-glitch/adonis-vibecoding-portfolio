import { useEffect, useRef, useState } from "react";
import { ParticleTextIntro } from "../components/ParticleTextIntro.jsx";
import { VibeLab } from "../components/VibeLab.jsx";
import { capabilities } from "../data/portfolioData.js";
import { chapters, email, social } from "./content.js";
import { Arrow, Modal, NextPage } from "./Shared.jsx";
import Profile from "./Profile.jsx";
import { Overseas, Sketchbook } from "./Gallery.jsx";
import Records from "./Records.jsx";

function Cover({ onPortrait, onLab }) {
  return (
    <section id="cover" className="cover-edition edition-section">
      <div className="masthead">
        <span className="mono">
          A CREATIVE
          <br />
          LIFE
          <br />
          IN PROGRESS
        </span>
        <h1>ADONIS</h1>
        <span className="editor-note">
          Ideas on paper.
          <br />
          Life in motion.
        </span>
      </div>
      <div className="masthead-rule mono">
        <span>PERSONAL EDITION / VOL. 02</span>
        <span>热爱创造，富有想象力的营销人</span>
        <span>READ. EXPLORE. CONNECT.</span>
      </div>
      <div className="cover-columns">
        <div className="cover-story">
          <h2>
            热爱创造，
            <br />
            富有想象力的
            <br />
            <em>营销人。</em>
          </h2>
          <p>
            用创意连接人与内容。
            <br />
            在不同文化与场景中，
            <br />
            寻找值得被讲述的故事。
          </p>
          <div className="identity-tags">
            <a href="#profile">营销与运营</a>
            <a href="#overseas">UAE EXCHANGE</a>
            <a href="#sketchbook">米画师认证</a>
            <button onClick={onLab}>VIBE CODING ↗</button>
          </div>
          <a href="#profile" className="edition-button red-button">
            打开个人档案 <Arrow />
          </a>
          <span className="editor-note cover-note">
            先认识我，再翻开我的世界。
          </span>
        </div>
        <button
          className="portrait-card"
          onClick={onPortrait}
          aria-label="翻开 ADONIS 头像背面"
        >
          <span className="tape tape-one" />
          <img
            src="/assets/adonis-avatar.jpg"
            alt="ADONIS 选用的黑白插画头像，蓝色眼睛与蝴蝶发饰"
            fetchPriority="high"
          />
          <span className="portrait-caption">
            <em>Adonis</em>
            <small>点击翻到背面 ↗</small>
          </span>
          <span className="portrait-sticker">
            LIFE IS A<br />
            CREATIVE
            <br />
            PROJECT.
          </span>
        </button>
        <aside className="cover-index">
          <span className="mono">本期目录 / CONTENTS</span>
          {chapters.map((chapter, i) => (
            <a key={chapter.id} href={`#${chapter.id}`}>
              <strong>0{i + 1}</strong>
              <span>
                <b>{chapter.title}</b>
                <small>{chapter.en}</small>
              </span>
              <span className="index-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
          <a
            className="objects-link"
            href="#overseas"
            aria-label="探索旅行摄影"
          >
            <img
              src="/assets/identity-objects.webp"
              alt="手绘相机、护照与速写本"
            />
            <span className="editor-note">随身携带：好奇心。</span>
          </a>
        </aside>
      </div>
      <NextPage index={0} />
    </section>
  );
}

export default function Magazine() {
  const [intro, setIntro] = useState(() => {
    try {
      return sessionStorage.getItem("adonis-edition-intro") !== "seen";
    } catch {
      return true;
    }
  });
  const [active, setActive] = useState("cover");
  const [read, setRead] = useState(new Set(["cover"]));
  const [modal, setModal] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const shell = useRef(null);
  const complete = () => {
    try {
      sessionStorage.setItem("adonis-edition-intro", "seen");
    } catch {}
    setIntro(false);
    setTimeout(
      () =>
        document.getElementById("cover-start")?.focus({ preventScroll: true }),
      0,
    );
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            setRead((old) => new Set([...old, entry.target.id]));
            entry.target.classList.add("is-read");
          }
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    chapters.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  };
  return (
    <>
      <div className="magazine-shell" ref={shell} inert={intro || undefined}>
        <a className="skip-link" href="#profile">
          跳到个人经历
        </a>
        <nav className="edition-nav" aria-label="章节导航">
          <a id="cover-start" className="edition-logo" href="#cover">
            A.
          </a>
          <div>
            {chapters.map((chapter, i) => (
              <a
                href={`#${chapter.id}`}
                key={chapter.id}
                aria-current={active === chapter.id ? "location" : undefined}
              >
                <small>0{i + 1}</small>
                {chapter.title}
                {read.has(chapter.id) && (
                  <span className="read-dot" aria-label="已浏览" />
                )}
              </a>
            ))}
          </div>
          <a className="contact-nav" href="#contact">
            CONTACT ↗
          </a>
        </nav>
        <main>
          <Cover
            onPortrait={() => setModal("portrait")}
            onLab={() => setModal("lab")}
          />
          <Profile />
          <Overseas />
          <Sketchbook />
          <Records />
        </main>
        <footer id="contact" className="edition-contact">
          <div>
            <span className="mono">END NOTE / LET'S KEEP IN TOUCH</span>
            <h2>
              让下一个想法，
              <br />
              <em>从一次交谈开始。</em>
            </h2>
            <p>
              陶珂冉 / ADONIS
              <br />
              热爱创造，富有想象力的营销人
            </p>
          </div>
          <div className="contact-slips">
            <a href={`mailto:${email}`}>
              <small>01 / EMAIL</small>
              <strong>写一封信 ↗</strong>
              <span>{email}</span>
            </a>
            <a href={social} target="_blank" rel="noreferrer">
              <small>02 / XIAOHONGSHU</small>
              <strong>小红书 ↗</strong>
              <span>阿多尼斯二世</span>
            </a>
            <a href="/downloads/resume-game-ops.pdf" download>
              <small>03 / RESUME</small>
              <strong>带走简历 ↓</strong>
              <span>PDF / DOWNLOAD</span>
            </a>
          </div>
          <div className="contact-bottom">
            <button onClick={copy}>
              {copied ? "邮箱已复制 ✓" : "复制邮箱"}
            </button>
            <span role="status">
              {copyError
                ? `请手动复制：${email}`
                : copied
                  ? "期待你的来信。"
                  : "THANK YOU FOR READING."}
            </span>
            <button onClick={() => setIntro(true)}>重播开场 ↻</button>
            <a href="#cover">回到头版 ↑</a>
          </div>
        </footer>
      </div>
      {intro && <ParticleTextIntro onComplete={complete} />}{" "}
      {modal === "portrait" && (
        <Modal title="认识我" onClose={() => setModal(null)}>
          <div className="portrait-back">
            <span className="mono">COVER STORY / 01</span>
            <h2>
              陶珂冉
              <br />
              <em>Adonis.</em>
            </h2>
            <p>热爱创造，富有想象力的营销人。</p>
            <p>
              从绘画、游戏与旅行中积累观察，
              <br />
              用内容、运营与技术把想法变成真实体验。
            </p>
            <span className="editor-note">
              不用看见我的脸，也可以认识我的世界。
            </span>
            <a
              className="edition-button"
              href="#profile"
              onClick={() => setModal(null)}
            >
              打开个人档案 <Arrow />
            </a>
          </div>
        </Modal>
      )}{" "}
      {modal === "lab" && (
        <Modal title="VIBE CODING LAB" onClose={() => setModal(null)}>
          <VibeLab capabilities={capabilities} />
        </Modal>
      )}
    </>
  );
}
