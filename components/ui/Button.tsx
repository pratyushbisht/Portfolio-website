import Link from "next/link";

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

/** Pill link-button. Hugs content on desktop, full width under 480px (see .btn in globals.css). */
export function Button({
  href,
  variant = "primary",
  icon,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`;
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );
  // External sites open in a new tab.
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }
  // In-page anchors and files don't need client-side routing.
  if (href.startsWith("#") || href.startsWith("mailto:") || /\.\w+$/.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
