export function SectionMeta({ index, label, tone = "blue" }) {
  return (
    <div className={`section-meta section-meta--${tone}`}>
      <span>{String(index).padStart(2, "0")}</span>
      <span>/</span>
      <span>{label}</span>
    </div>
  );
}
