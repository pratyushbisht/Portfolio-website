type SectionHeadingProps = {
  tag: string;
  title: React.ReactNode;
  id?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  tag,
  title,
  id,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      <p className="t-tag text-accent">{tag}</p>
      <h2 id={id} className="t-h2 mt-[clamp(8px,1vw,12px)]">
        {title}
      </h2>
    </div>
  );
}
