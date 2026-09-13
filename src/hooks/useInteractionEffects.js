import { useEffect } from "react";

export function useInteractionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const staticPreview = new URLSearchParams(window.location.search).has("static");
    const reducedMotion = staticPreview || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

    if (staticPreview) root.classList.add("is-static-preview");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    const revealObserver = reducedMotion || !("IntersectionObserver" in window)
      ? null
      : new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver?.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10%", threshold: 0.12 },
      );

    revealItems.forEach((item) => revealObserver?.observe(item));

    let pointerFrame = 0;
    const updatePointer = (event) => {
      if (reducedMotion || pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--pointer-x", `${event.clientX}px`);
        root.style.setProperty("--pointer-y", `${event.clientY}px`);
        pointerFrame = 0;
      });
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      revealObserver?.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.classList.remove("is-static-preview");
    };
  }, []);
}
