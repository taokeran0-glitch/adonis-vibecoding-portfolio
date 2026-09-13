import { useEffect, useRef } from "react";

const VALUE_PATTERN = /^(\d+(?:\.\d+)?)(.*)$/;

export function AnimatedMetric({ value }) {
  const valueRef = useRef(null);

  useEffect(() => {
    const element = valueRef.current;
    const match = value.match(VALUE_PATTERN);
    if (!element || !match) return undefined;

    const target = Number(match[1]);
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const staticPreview = new URLSearchParams(window.location.search).has("static");
    const reducedMotion = staticPreview || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      element.textContent = match[1];
      return undefined;
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 920;

        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - ((1 - progress) ** 3);
          element.textContent = (target * eased).toFixed(decimals);
          if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
        };

        animationFrame = window.requestAnimationFrame(tick);
      },
      { threshold: 0.55 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  const match = value.match(VALUE_PATTERN);
  if (!match) return value;
  const suffix = match[2].startsWith(" ") ? `\u00A0${match[2].trimStart()}` : match[2];

  return (
    <span className="animated-metric" aria-label={value}>
      <span ref={valueRef} aria-hidden="true">0</span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
