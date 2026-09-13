import { useMemo, useState } from "react";
import { SectionMeta } from "./SectionMeta.jsx";

const emptyForm = { pain: "", contrast: "", emotion: "" };
const sampleForms = [
  {
    pain: "玩家难以向圈外朋友解释一款游戏的魅力",
    contrast: "让非核心玩家先体验最日常的角色陪伴",
    emotion: "被理解的惊喜与愿意留下的理由",
  },
  {
    pain: "创作者总在免费帮助身边的人，却不敢为自己的能力定价",
    contrast: "最擅长的人第一次决定停止无偿修改",
    emotion: "边界感、遗憾与重新选择",
  },
];

function buildFormula(form) {
  const pain = form.pain.trim() || "一个真实但未被说出的用户痛点";
  const contrast = form.contrast.trim() || "一个打破预期的角色或情境反差";
  const emotion = form.emotion.trim() || "一个能被记住的情绪落点";
  return {
    title: `当「${pain}」遇到「${contrast}」`,
    hook: `先用具体场景让观众认出：${pain}。`,
    turn: `再用 ${contrast} 改变原本的判断。`,
    close: `最后落在 ${emotion}，把互动理由留给观众。`,
  };
}

export function VibeLab({ capabilities }) {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sampleIndex, setSampleIndex] = useState(0);
  const result = useMemo(() => buildFormula(form), [form]);
  const completedFields = Object.values(form).filter((value) => value.trim()).length;
  const activeStage = submitted ? 4 : Math.min(completedFields, 3);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  };

  const copyResult = async () => {
    const text = [result.title, result.hook, result.turn, result.close].join("\n");
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const loadSample = () => {
    const nextSample = sampleForms[sampleIndex % sampleForms.length];
    setForm(nextSample);
    setSubmitted(true);
    setSampleIndex((current) => current + 1);
  };

  return (
    <section className="lab-section page-section" id="lab">
      <div className="lab-heading" data-reveal="fade">
        <SectionMeta index={6} label="VIBE CODING LAB" />
        <h2>把方法论，做成<br />可以被操作的界面。</h2>
        <p>这个小工具把我在绘画内容运营中使用的“痛点 + 反差 + 情绪叙事”拆成可组合变量。</p>
      </div>

      <div className="lab-chain" aria-label="工作链路" data-reveal="row">
        {capabilities.map((item, index) => (
          <span key={item.id} className={index <= activeStage ? "is-active" : ""} aria-current={index === activeStage ? "step" : undefined}>
            <small>0{index + 1}</small>
            <strong>{item.subtitle}</strong>
            {index < capabilities.length - 1 ? <i aria-hidden="true">→</i> : null}
          </span>
        ))}
      </div>

      <div className="lab-console" data-reveal="fade">
        <form
          className="formula-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="console-title">CONTENT FORMULA / INPUT</div>
          <label>
            <span>社会痛点</span>
            <textarea
              value={form.pain}
              onChange={(event) => updateField("pain", event.target.value)}
              placeholder="例：创作者总在免费帮助身边的人……"
              maxLength={80}
            />
            <small>{form.pain.length}/80</small>
          </label>
          <label>
            <span>反差设置</span>
            <textarea
              value={form.contrast}
              onChange={(event) => updateField("contrast", event.target.value)}
              placeholder="例：最擅长的人决定不再继续……"
              maxLength={80}
            />
            <small>{form.contrast.length}/80</small>
          </label>
          <label>
            <span>情绪叙事</span>
            <textarea
              value={form.emotion}
              onChange={(event) => updateField("emotion", event.target.value)}
              placeholder="例：边界感、遗憾与重新选择……"
              maxLength={80}
            />
            <small>{form.emotion.length}/80</small>
          </label>
          <div className="form-actions">
            <button type="submit" className="primary-action">生成内容角度 →</button>
            <button type="button" className="quiet-action" onClick={loadSample}>TRY SAMPLE</button>
            <button type="button" className="quiet-action" onClick={() => { setForm(emptyForm); setSubmitted(false); }}>RESET</button>
          </div>
        </form>

        <div className={submitted ? "formula-result is-live" : "formula-result"} aria-live="polite">
          <div className="result-signal" aria-hidden="true"><span /></div>
          <div className="formula-result-content" key={submitted ? JSON.stringify(form) : "preview"}>
          <div className="console-title">LIVE RESULT / {submitted ? "READY" : "PREVIEW"}</div>
          <h3>{result.title}</h3>
          <ol>
            <li><span>HOOK</span>{result.hook}</li>
            <li><span>TURN</span>{result.turn}</li>
            <li><span>CLOSE</span>{result.close}</li>
          </ol>
          <button type="button" className="copy-action" onClick={copyResult}>{copied ? "COPIED ✓" : "COPY RESULT"}</button>
          </div>
        </div>
      </div>

      <div className="build-notes" data-reveal="row">
        <div>
          <span>BUILD NOTES / 01</span>
          <strong>Structured content</strong>
          <p>项目、指标与游戏经历由数据模块驱动，能够筛选与复用。</p>
        </div>
        <div>
          <span>BUILD NOTES / 02</span>
          <strong>Real local state</strong>
          <p>筛选、表单、弹层和选中态都更新真实界面状态。</p>
        </div>
        <div>
          <span>BUILD NOTES / 03</span>
          <strong>Accessible motion</strong>
          <p>支持键盘、响应式布局与 prefers-reduced-motion。</p>
        </div>
      </div>
    </section>
  );
}
