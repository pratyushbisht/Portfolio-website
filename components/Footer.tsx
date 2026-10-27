import { FooterNav } from "./FooterNav";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col items-center gap-6 py-[clamp(32px,5vw,56px)] text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="min-w-0">
          <p className="t-body font-medium text-text">Pratyush Bisht</p>
          <p className="t-caption text-text-meta">© {new Date().getFullYear()} Currently @Purdue</p>
        </div>
        <FooterNav />
      </div>
    </footer>
  );
}
