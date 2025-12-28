import { badgeKicker, h2Section, pSection } from "@/styles/ui";

type Props = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
  className = "",
}: Props) {
  return (
    <div
      className={[
        align === "center" ? "text-center" : "text-left",
        "mb-14 max-w-3xl mx-auto",
        className,
      ].join(" ")}
    >
      {kicker && <span className={badgeKicker}>{kicker}</span>}
      <h2 className={h2Section}>{title}</h2>
      {subtitle && <p className={pSection}>{subtitle}</p>}
    </div>
  );
}
