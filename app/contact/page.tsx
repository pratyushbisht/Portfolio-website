import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";
import { DotField } from "@/components/motion/DotField";

export const metadata: Metadata = {
  title: "Contact",
  description: "Open to UX and Product Design roles for Summer 2027. Always happy to talk shop.",
};

export default function ContactPage() {
  return (
    <main>
      {/* Same dot grid + cursor glow as About and Work. */}
      <DotField>
        <ContactContent />
      </DotField>
    </main>
  );
}
