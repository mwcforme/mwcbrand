// Vite raw-imports for static page bodies (cleaned HTML with asset URLs rewritten).
import index from "@/data/page-bodies/index.html?raw";
import logo from "@/data/page-bodies/logo.html?raw";
import logoLibrary from "@/data/page-bodies/logo-library.html?raw";
import color from "@/data/page-bodies/color.html?raw";
import typography from "@/data/page-bodies/typography.html?raw";
import voice from "@/data/page-bodies/voice.html?raw";
import applications from "@/data/page-bodies/applications.html?raw";
import accessibility from "@/data/page-bodies/accessibility.html?raw";
import prompts from "@/data/page-bodies/prompts.html?raw";
import emailSignature from "@/data/page-bodies/email-signature.html?raw";
import leadForms from "@/data/page-bodies/lead-forms.html?raw";
import downloads from "@/data/page-bodies/downloads.html?raw";
import manifest from "@/data/page-bodies/manifest.json";

export const pageBodies: Record<string, string> = {
  index,
  logo,
  "logo-library": logoLibrary,
  color,
  typography,
  voice,
  applications,
  accessibility,
  prompts,
  "email-signature": emailSignature,
  "lead-forms": leadForms,
  downloads,
};

export const pageMeta = manifest as Record<
  string,
  { title: string; description: string; file: string }
>;
