export const chapters = [
  {
    id: "cover",
    title: "认识我",
    en: "COVER STORY",
    note: "从这里开始认识我。",
  },
  {
    id: "profile",
    title: "个人经历",
    en: "PROFILE FILES",
    note: "把经历，一张张展开。",
  },
  {
    id: "overseas",
    title: "阿联酋",
    en: "OVERSEAS DISPATCH",
    note: "换一个地方，观察世界。",
  },
  {
    id: "sketchbook",
    title: "绘画",
    en: "VISUAL SKETCHBOOK",
    note: "翻开我的想象力。",
  },
  {
    id: "records",
    title: "游戏",
    en: "PLAYER ARCHIVE",
    note: "灵感的另一张唱片。",
  },
];
export const email = "taokeran0@gmail.com";
export const social = "https://xhslink.cn/m/9Q8l3Q3hFGy";
export const jobs = [
  {
    date: "2026.05 — 2026.08",
    company: "北京乐信圣文科技有限责任公司",
    role: "海外游戏运营",
    body: "参与 Meowdoku 全球益智游戏运营与增长项目，覆盖 8 个地区市场，负责 UGC 内容、增长测试与创作者合作。",
    points: [
      "累计合作 100+ 位 KOL，策划 40 余份 Creative Brief。",
      "建立 Hook 语料与创意分析体系，支持内容迭代。",
      "通过竞品拆解、素材分析与 A/B 测试验证创意方向。",
    ],
  },
  {
    date: "2026.01 — 2026.04",
    company: "北京市元石科技有限公司",
    role: "海外 AI 产品运营",
    body: "围绕海外用户反馈、Creator 社区与社媒内容，参与产品运营及增长。",
    points: [
      "从 0 到 1 搭建 Discord 社区，规模达到 800+。",
      "建立反馈标签与用户分层体系，沉淀用户需求。",
      "输出 80+ 篇英文帖子及公告，迭代内容与审核 SOP。",
    ],
  },
];
export const skills = [
  ["营销与运营", "选题策划 · 内容增长 · KOL 合作 · 社区运营"],
  ["数据与分析", "SQL · Tableau · Excel · Python"],
  ["视觉表达", "Procreate · Photoshop · 剪映 · PPT"],
  ["语言与文化", "阿拉伯语 · 英语 CET-4 · 跨文化沟通"],
  ["AI 与构建", "Codex · Claude Code · Prompt Engineering · AI Workflow"],
];
export const photos = [
  [
    "卡帕多奇亚岩谷",
    "土耳其 / TÜRKIYE",
    "枯枝、岩谷和蓝天，构成画面的三个层次。",
  ],
  ["雪山与村落", "旅行摄影 / LANDSCAPE", "云层、山脊与房屋之间的尺度。"],
  ["银河与山脉", "旅行摄影 / NIGHT STUDY", "把夜色里的层次，留在照片里。"],
  ["蓝调时刻", "旅行摄影 / BLUE HOUR", "暖色灯光与深蓝天空的相遇。"],
  [
    "建筑与水面",
    "旅行摄影 / ARCHITECTURE",
    "白墙、水面和文字，构成安静的空间。",
  ],
  ["海滨日常", "博斯普鲁斯 / TÜRKIYE", "长椅、渡轮与行人，风景里也有生活。"],
].map(([title, place, description], i) => ({
  src: `/assets/photos/photo-0${i + 1}.jpg`,
  title,
  description,
  place,
}));
export const artworks = [
  ["心脏与月轮", "深蓝与酒红，角色与碎裂月轮之间的戏剧张力。"],
  ["黑白之间", "长发、几何遮挡与颗粒纹理的排版实验。"],
  ["红色标记", "以高留白和对称构图组织角色画面。"],
  ["花冠与香气", "细线稿、淡紫色与花卉意象。"],
  ["角色手记", "头像、手写设定与夜空组成情绪板。"],
  ["虎与光环", "东方意象与杂志拼贴语言的结合。"],
  ["编辑肖像", "蓝色领带、红色线条与报纸碎片。"],
  ["执扇", "以蓝黑线条和枝叶留白塑造人物。"],
].map(([title, description], i) => ({
  src: `/assets/illustrations/art-0${i + 1}.jpg`,
  title,
  description,
  place: `DRAWING / ${String(i + 1).padStart(2, "0")}`,
}));
