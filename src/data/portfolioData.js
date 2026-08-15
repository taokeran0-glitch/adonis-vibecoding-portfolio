export const proofMetrics = [
  {
    id: "top-views",
    value: "10W+",
    label: "单篇浏览",
    shortLabel: "单篇浏览",
    tone: "red",
    context: "最高单篇内容",
  },
  {
    id: "top-engagement",
    value: "2.4W+",
    label: "单篇赞藏",
    shortLabel: "单篇赞藏",
    context: "最高表现内容",
  },
  {
    id: "total-exposure",
    value: "100W+",
    label: "累计曝光",
    shortLabel: "累计曝光",
    context: "个人 IP 内容",
  },
  {
    id: "target-followers",
    value: "3000+",
    label: "精准粉丝",
    shortLabel: "精准粉丝",
    context: "从 0 到 1 积累",
  },
];

export const capabilities = [
  {
    id: "insight",
    index: "01",
    title: "洞察",
    subtitle: "INSIGHT",
    description: "海外市场 / 玩家 / 竞品 / 社媒趋势",
  },
  {
    id: "strategy",
    index: "02",
    title: "策略",
    subtitle: "STRATEGY",
    description: "增长方案 / 内容规划 / 产品运营",
  },
  {
    id: "game",
    index: "03",
    title: "游戏理解",
    subtitle: "GAME",
    description: "游戏经历 / 跨品类体验 / 机制拆解",
  },
  {
    id: "validate",
    index: "04",
    title: "验证",
    subtitle: "VALIDATE",
    description: "数据分析 / 内容反馈 / 假设复盘",
  },
  {
    id: "build",
    index: "05",
    title: "构建",
    subtitle: "BUILD",
    description: "AI 工作流 / Vibe Coding / 自动化工具",
  },
];

export const experience = [
  {
    id: "overseas-study",
    title: "海外学习",
    detail: "跨文化沟通 / 本地文化观察 / 工作语言",
  },
  {
    id: "global-game-internship",
    title: "出海游戏公司实习",
    detail: "增长运营 / 产品运营 / KOL 运营",
  },
  {
    id: "visual-technical-experiments",
    title: "视觉创作与技术实验",
    detail: "米画师 / 摄影 / 剪辑 / Vibe Coding",
  },
];

export const gameCategories = [
  {
    id: "gacha-live-service",
    label: "二次元 / Live Service / Gacha",
    games: [
      "FGO（9年，主号126级，5个小号）",
      "原神（AR58）",
      "崩坏：星穹铁道",
      "明日方舟",
    ],
    insight: "长期投入、角色养成与版本型内容体验。",
  },
  {
    id: "otome-visual-novel",
    label: "女性向 / Otome / Visual Novel",
    games: ["蝶之毒 华之锁", "女王蜂的王房"],
    insight: "角色关系、情感叙事与女性向内容体验。",
  },
  {
    id: "puzzle-logic",
    label: "Puzzle / 解谜 / Logic",
    games: ["数独", "绣湖系列"],
    insight: "逻辑推演、谜题结构与信息逐步解锁。",
  },
  {
    id: "narrative-adventure",
    label: "Narrative Adventure / 叙事冒险",
    games: ["极乐迪斯科", "底特律：变人", "人狼村之谜", "三伏", "纸房子"],
    insight: "剧情驱动、互动选择与分支叙事。",
  },
  {
    id: "atmospheric-horror",
    label: "Horror / 恐怖 / Atmospheric Horror",
    games: [
      "恐怖的世界",
      "层层恐惧",
      "灾殃",
      "港诡实录",
      "面容",
      "生化危机",
      "颈椎病",
    ],
    insight: "心理压迫、环境叙事与氛围营造。",
  },
  {
    id: "action",
    label: "Action / 动作",
    games: ["鬼泣5", "渎神", "空洞骑士"],
    insight: "战斗系统、操作反馈与 Boss 战体验。",
  },
  {
    id: "fighting",
    label: "Fighting / 格斗",
    games: ["真人快打11", "拳皇"],
    insight: "对战博弈、连段学习与角色性能差异。",
  },
  {
    id: "open-world",
    label: "Open World / Exploration",
    games: ["塞尔达传说：王国之泪", "无人深空"],
    insight: "探索动机、系统交互与开放式路径。",
  },
  {
    id: "survival-crafting",
    label: "Survival / Crafting / Exploration",
    games: ["深海迷航1", "深海迷航2"],
    insight: "生存、资源管理、建造与未知环境探索。",
  },
  {
    id: "simulation-management",
    label: "Simulation / Management",
    games: ["缺氧", "星露谷物语"],
    insight: "经营循环、资源调度与系统管理。",
  },
  {
    id: "strategy-4x",
    label: "Strategy / 4X",
    games: ["文明6"],
    insight: "策略规划、资源分配、外交与扩张。",
  },
  {
    id: "co-op-party",
    label: "Co-op / Party Game",
    games: ["双人成行", "胡闹厨房", "双影奇境"],
    insight: "多人合作、沟通与协作机制。",
  },
  {
    id: "platformer-nintendo",
    label: "Platformer / Nintendo / Family-oriented",
    games: ["马里奥系列"],
    insight: "关卡设计、平台跳跃与低门槛高上限。",
  },
  {
    id: "indie-experimental",
    label: "Indie / Experimental",
    games: ["洞石火", "绣湖系列", "恐怖的世界", "极乐迪斯科"],
    insight: "独立审美、特殊叙事与实验机制。",
  },
];

export const contentFormula = {
  dimensions: [
    {
      id: "resonance",
      label: "共鸣入口",
      options: [
        {
          id: "social-pain",
          label: "社会痛点共鸣",
          description: "从能够被真实感知的社会痛点切入。",
        },
      ],
    },
    {
      id: "narrative",
      label: "叙事机制",
      options: [
        {
          id: "contrast",
          label: "反差叙事",
          description: "以预期与现实之间的反差建立记忆点。",
        },
      ],
    },
    {
      id: "outcome",
      label: "价值出口",
      options: [
        {
          id: "content-growth",
          label: "内容增长",
          description: "以内容传播积累精准受众。",
        },
        {
          id: "value-added-service",
          label: "增值服务",
          description: "将受众需求延伸为增值服务。",
        },
        {
          id: "ip-derivative",
          label: "IP 衍生品",
          description: "将内容资产延展为 IP 衍生品。",
        },
        {
          id: "mihuashi",
          label: "米画师平台",
          description: "通过专业创作平台承接后续需求。",
        },
      ],
    },
  ],
  resultRule: {
    template: "{resonance} × {narrative} → {outcome}",
    description: "先建立共鸣，再用反差形成记忆点，最后连接增长或商业化出口。",
  },
};

export const visualFilters = [
  { id: "illustration", label: "ILLUSTRATION" },
  { id: "photography", label: "PHOTOGRAPHY" },
  { id: "editing", label: "ZINE / EDITING" },
];

export const navItems = [
  { id: "index", label: "INDEX" },
  { id: "work", label: "WORK" },
  { id: "visual", label: "VISUAL ARCHIVE" },
  { id: "player", label: "PLAYER ARCHIVE" },
  { id: "lab", label: "LAB" },
  { id: "about", label: "ABOUT" },
];
