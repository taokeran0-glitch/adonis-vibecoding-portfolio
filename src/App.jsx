import { useState } from "react";
import { SiteHeader } from "./components/SiteHeader.jsx";
import { ParticleTextIntro } from "./components/ParticleTextIntro.jsx";
import { Hero } from "./components/Hero.jsx";
import { ProfileSection } from "./components/ProfileSection.jsx";
import { SelectedWork } from "./components/SelectedWork.jsx";
import { VisualArchive } from "./components/VisualArchive.jsx";
import { PlayerArchive } from "./components/PlayerArchive.jsx";
import { VibeLab } from "./components/VibeLab.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useInteractionEffects } from "./hooks/useInteractionEffects.js";
import {
  capabilities,
  experience,
  gameCategories,
  navItems,
  proofMetrics,
  visualFilters,
} from "./data/portfolioData.js";

const SECTION_IDS = navItems.map((item) => item.id);

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const activeSection = useActiveSection(SECTION_IDS);
  useInteractionEffects();

  return (
    <>
      {introVisible && <ParticleTextIntro onComplete={() => setIntroVisible(false)} />}
      <div className="site-shell" inert={introVisible} aria-hidden={introVisible}>
        <a className="skip-link" href="#work">跳到主要内容</a>
        <SiteHeader navItems={navItems} activeSection={activeSection} />
        <main>
          <Hero metrics={proofMetrics} />
          <ProfileSection experience={experience} capabilities={capabilities} />
          <SelectedWork metrics={proofMetrics} />
          <VisualArchive filters={visualFilters} />
          <PlayerArchive games={gameCategories} />
          <VibeLab capabilities={capabilities} />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
